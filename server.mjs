import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { Readable } from 'node:stream';

const app = express();

app.set('trust proxy', 1);

app.use(cors({
  origin: [
    'https://agri-guard-ai-k41d.onrender.com',
    'http://localhost:5173',
    'http://localhost:5174'
  ]
}));

app.use(express.json({ limit: '10mb' }));

app.use('/api', rateLimit({
  windowMs: 60 * 1000,
  limit: 10
}));

app.get('/', (req, res) => {
  res.send('AgriGuard AI Backend is running');
});

app.post('/api/chat', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'Server API key is not configured'
      });
    }

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gemini-3.5-flash-lite',
          messages: req.body.messages,
          temperature: req.body.temperature ?? 0.7,
          max_tokens: 8192,
          stream: req.body.stream === true
        })
      }
    );

    if (!response.ok) {
      return res.status(response.status).send(
        await response.text()
      );
    }

    if (req.body.stream === true) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      Readable.fromWeb(response.body).pipe(res);
    } else {
      res.json(await response.json());
    }

  } catch (error) {
    res.status(500).json({
      error: 'AI service temporarily unavailable'
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});