import { useState, useRef, useEffect } from 'react';
import { Send, AlertTriangle } from 'lucide-react';
import { streamChat } from '../services/ai';
import { quickPrompts } from '../data/sdgData';
import './FarmChat.css';

export default function FarmChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState('');
  const messagesRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim() || streaming) return;

    const userMsg = { role: 'user', content: text.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setError('');
    setStreaming(true);

    try {
      const assistantMsg = { role: 'assistant', content: '' };
      setMessages([...updatedMessages, assistantMsg]);

      const chatMessages = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      let fullContent = '';
      for await (const chunk of streamChat(chatMessages)) {
        fullContent += chunk;
        setMessages([...updatedMessages, { role: 'assistant', content: fullContent }]);
      }
    } catch (err) {
      setError(err.message);
      setMessages(updatedMessages);
    } finally {
      setStreaming(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handlePrompt = (prompt) => sendMessage(prompt);

  return (
    <div className="farm-chat">
      <div className="fc-container">
        <div className="fc-header">
          <h1>
            💬 <span className="gradient-text">AI Farm Assistant</span>
          </h1>
          <p>Ask anything about farming, crops, pest control, and sustainable agriculture</p>
        </div>

        <div className="fc-messages" ref={messagesRef}>
          {messages.length === 0 ? (
            <div className="fc-welcome">
              <div className="fc-welcome-icon">🌾</div>
              <div className="fc-welcome-title">How can I help your farm today?</div>
              <div className="fc-welcome-sub">
                I'm your AI farming assistant. Ask me about crop management, disease control,
                sustainable practices, or anything agriculture-related.
              </div>
              <div className="fc-prompts">
                {quickPrompts.map((qp) => (
                  <button
                    key={qp.label}
                    className="fc-prompt-btn"
                    onClick={() => handlePrompt(qp.prompt)}
                  >
                    {qp.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`fc-msg ${msg.role}`}>
                <div className="fc-msg-avatar">
                  {msg.role === 'user' ? '👤' : '🌾'}
                </div>
                <div className="fc-msg-bubble">
                  {msg.role === 'assistant' && msg.content === '' ? (
                    <div className="fc-typing">
                      <div className="fc-typing-dot" />
                      <div className="fc-typing-dot" />
                      <div className="fc-typing-dot" />
                    </div>
                  ) : (
                    msg.content.split('\n').map((line, j) => (
                      <span key={j}>
                        {line.startsWith('**') && line.endsWith('**') ? (
                          <strong>{line.slice(2, -2)}</strong>
                        ) : line.startsWith('- ') ? (
                          <span>• {line.slice(2)}</span>
                        ) : (
                          line
                        )}
                        {j < msg.content.split('\n').length - 1 && <br />}
                      </span>
                    ))
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {error && (
          <div className="fc-error">
            <AlertTriangle size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />{' '}
            {error}
          </div>
        )}

        <div className="fc-input-area">
          <div className="fc-input-wrapper">
            <textarea
              ref={inputRef}
              className="fc-input"
              placeholder="Ask about farming, crops, pest control..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={streaming}
            />
            <button
              className="fc-send-btn"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || streaming}
              title="Send message"
            >
              {streaming ? (
                <div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
