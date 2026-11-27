# 🌾 AgriGuard AI

**AI-Powered Precision Agriculture & Food Security Platform**

> Built for the [2030 AI Challenge](https://www.2030aichallenge.com/) — Powered by [Featherless.ai](https://featherless.ai)

AgriGuard AI empowers smallholder farmers worldwide with intelligent tools for crop disease detection, smart crop recommendations, and expert farming guidance — tackling global hunger one harvest at a time.

---

## 🎯 Problem Statement

- **828 million** people face hunger globally (UN FAO, 2024)
- **500 million** smallholder farmers produce 80% of the world's food yet lack access to expert agricultural advice
- **40%** of global crop yield is lost to pests and diseases every year
- Climate change is making farming increasingly unpredictable

**Which UN SDGs does it address?**

| SDG | Goal | How AgriGuard AI Helps |
|-----|------|----------------------|
| 🏷️ SDG 1 | No Poverty | Increases farmer income through optimized crop selection |
| 🍽️ SDG 2 | Zero Hunger | Prevents crop losses via early AI disease detection |
| 🌍 SDG 13 | Climate Action | Recommends climate-resilient crops and practices |
| 🌿 SDG 15 | Life on Land | Promotes sustainable farming, reduces chemical overuse |

---

## 💡 Solution

AgriGuard AI is an interactive web application with **5 AI-powered features**, all driven by the [Featherless.ai](https://featherless.ai) inference API:

### 🩺 AI Crop Doctor
Upload a photo of a diseased plant → AI identifies the disease, severity, and provides treatment plans (organic + chemical) and prevention tips.

### 🌱 Smart Crop Advisor
Input your region, soil type, season, water availability, and budget → AI recommends optimal crops with suitability scores, yield predictions, and pro tips.

### 💬 AI Farm Assistant
Full conversational chat interface with streaming responses. Ask any farming question — pest control, irrigation, sustainable practices — and get expert AI guidance in real time.

### 📊 Global Crisis Dashboard
Interactive data visualizations (Chart.js) showing real UN/FAO statistics on global food insecurity, crop losses by disease, and SDG progress tracking.

### ⚙️ Settings
Configure your Featherless.ai API key and choose from multiple LLM models (Qwen, Llama, Mistral, DeepSeek).

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 (Vite) |
| Styling | Vanilla CSS — custom design system with glassmorphism, gradients, animations |
| AI Inference | [Featherless.ai](https://featherless.ai) API (OpenAI-compatible) |
| Charts | Chart.js via react-chartjs-2 |
| Icons | Lucide React |
| Routing | React Router v6 |
| Fonts | Google Fonts (Inter + Outfit) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A [Featherless.ai](https://featherless.ai) API key (free for hackathon participants)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/agriguard-ai.git
cd agriguard-ai

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at **http://localhost:5173/**

### Configuration

1. Open the app and navigate to **Settings** (⚙️ icon)
2. Paste your Featherless.ai API key
3. Select your preferred AI model (default: `Qwen/Qwen2.5-72B-Instruct`)
4. Click **Save Settings**

---

## 📁 Project Structure

```
agriguard-ai/
├── index.html                  # Entry HTML with SEO meta tags
├── public/
│   └── favicon.svg             # App favicon
├── src/
│   ├── main.jsx                # React entry point
│   ├── App.jsx                 # Router + layout
│   ├── index.css               # Design system (tokens, glassmorphism, animations)
│   ├── components/
│   │   ├── Navbar.jsx/.css     # Glassmorphic navigation bar
│   │   ├── Footer.jsx/.css     # Footer with SDG badges
│   │   ├── AnimatedCounter.jsx/.css  # Scroll-triggered count-up animation
│   │   └── SDGBadge.jsx/.css   # Reusable SDG badge component
│   ├── pages/
│   │   ├── Home.jsx/.css       # Landing page (hero, features, SDGs, CTA)
│   │   ├── CropDoctor.jsx/.css # AI plant disease diagnosis
│   │   ├── CropAdvisor.jsx/.css# AI crop recommendations
│   │   ├── FarmChat.jsx/.css   # Streaming AI chat assistant
│   │   ├── Dashboard.jsx/.css  # Data visualizations & SDG tracker
│   │   └── Settings.jsx/.css   # API key & model configuration
│   ├── services/
│   │   └── ai.js               # Featherless.ai API integration layer
│   └── data/
│       └── sdgData.js          # UN SDG data, real statistics, form options
├── package.json
└── vite.config.js
```

---

## 🤖 How AI Is Used

AgriGuard AI integrates AI deeply across the platform via the Featherless.ai OpenAI-compatible API:

1. **Plant Disease Analysis** — AI receives image context + user description and returns structured JSON with disease name, severity, symptoms, multi-type treatment plans, and prevention tips
2. **Crop Recommendation Engine** — AI processes location, soil, climate, and economic inputs to generate ranked crop suggestions with yield predictions and risk analysis
3. **Conversational Assistant** — Real-time streaming chat using Server-Sent Events (SSE) for natural, responsive AI conversations about any farming topic
4. **Structured Data Extraction** — All AI responses use prompted JSON schemas for reliable frontend rendering

---

## 🌍 Impact

AgriGuard AI makes expert agricultural knowledge accessible to anyone with a smartphone — breaking down barriers that leave 500 million smallholder farmers without the guidance they need. By 2030, tools like this could:

- **Reduce crop losses** by enabling early disease detection
- **Increase farmer income** through data-driven crop selection
- **Promote sustainability** by recommending climate-resilient practices
- **Democratize expertise** — AI makes agricultural advice free and instant

---

## 📚 References

- [UN Sustainable Development Goals](https://sdgs.un.org/)
- [FAO — The State of Food Security and Nutrition in the World 2024](https://www.fao.org/publications/sofi)
- [World Bank — Agriculture and Food](https://www.worldbank.org/en/topic/agriculture)
- [Featherless.ai Documentation](https://featherless.ai/docs)
- [Vite](https://vitejs.dev/) | [React](https://react.dev/) | [Chart.js](https://www.chartjs.org/)

---

## 📄 License

This project was built for the **2030 AI Challenge Hackathon**.

---

<p align="center">
  Built with ❤️ for a hunger-free 2030
</p>
