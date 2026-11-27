
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:3000'
).replace(/\/+$/, '');

const DEFAULT_MODEL = 'gemini-3.5-flash-lite';





export function getModel() {
  return DEFAULT_MODEL;
}

export function setModel(model) {
  localStorage.setItem('agriguard_model', model);
}

async function callGemini(messages, options = {}) {
  const response = await fetch(
    `${API_BASE_URL}/api/chat`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.max_tokens ?? 8192,
        stream: options.stream ?? false,
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();

    throw new Error(
      `AI service error (${response.status}): ${err}`
    );
  }

  if (options.stream) {
    return response;
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('Gemini returned an empty response.');
  }

  return content;
}

function parseJSON(result) {
  const cleaned = result
    .replace(/```json\s*/gi, '')
    .replace(/```/g, '')
    .trim();

  return JSON.parse(cleaned);
}

export async function analyzePlantDisease(
  imageBase64,
  description = ''
) {
  const prompt = `
You are AgriGuard AI, an agricultural plant pathologist.

Analyze the uploaded plant image carefully.
Identify visible symptoms and possible diseases.

User description: ${description || 'Not provided'}

Do not invent symptoms that are not visible.
If the image is unclear or the diagnosis is uncertain,
clearly mention the uncertainty.
If no image is supplied, base the assessment only
on the description.

Respond ONLY with valid JSON:

{
  "disease_name": "Disease name or uncertain diagnosis",
  "confidence": "High/Medium/Low",
  "severity": "Critical/High/Medium/Low",
  "affected_parts": [],
  "symptoms": [],
  "causes": [],
  "treatment": {
    "immediate": [],
    "organic": [],
    "chemical": []
  },
  "prevention": [],
  "additional_notes": ""
}

Recommend chemical treatments only when appropriate.
Advise following local agricultural guidelines.
`;

  const content = [
    {
      type: 'text',
      text: prompt,
    },
  ];

  if (imageBase64) {
    const imageUrl = imageBase64.startsWith('data:')
      ? imageBase64
      : `data:image/jpeg;base64,${imageBase64}`;

    content.push({
      type: 'image_url',
      image_url: {
        url: imageUrl,
      },
    });
  }

  const messages = [
    {
      role: 'system',
      content:
        'You are AgriGuard AI. Provide evidence-based agricultural assessments in valid JSON.',
    },
    {
      role: 'user',
      content,
    },
  ];

  const result = await callGemini(messages, {
    temperature: 0.3,
    max_tokens: 8192,
  });

  try {
    return parseJSON(result);
  } catch {
    throw new Error(
      'Could not process the plant analysis. Please try again.'
    );
  }
}

export async function getCropRecommendations({
  region,
  soilType,
  season,
  water,
  budget,
}) {
  const messages = [
    {
      role: 'system',
      content:
        'You are AgriGuard AI, an agricultural advisor. Respond only with valid JSON.',
    },
    {
      role: 'user',
      content: `
Recommend the top 4 suitable crops based on:

Region: ${region}
Soil Type: ${soilType}
Season: ${season}
Water Availability: ${water}
Budget: ${budget}

Treat suitability scores and expected yields as
estimates, not measured results.

Return ONLY valid JSON:

{
  "recommendations": [
    {
      "crop_name": "Name",
      "emoji": "Relevant emoji",
      "suitability_score": 95,
      "expected_yield": "Estimated yield per hectare",
      "investment_level": "Low/Medium/High",
      "profit_potential": "Description",
      "water_needs": "Low/Medium/High",
      "growth_duration": "X months",
      "climate_resilience": "High/Medium/Low",
      "tips": [],
      "risks": []
    }
  ],
  "general_advice": "Overall farming advice"
}
`,
    },
  ];

  const result = await callGemini(messages, {
    temperature: 0.5,
    max_tokens: 8192,
  });

  try {
    return parseJSON(result);
  } catch {
    return {
      recommendations: [],
      general_advice: result,
    };
  }
}

export async function* streamChat(messages) {
  const systemMessage = {
    role: 'system',
    content: `
You are AgriGuard AI, a friendly agricultural assistant.

Help farmers with:
- Crop management
- Plant disease prevention
- Fertilizer recommendations
- Irrigation management
- Sustainable farming
- Pest control
- Soil management

Provide practical, clear and actionable advice.
Consider local conditions and farmer budgets.
Do not invent current market prices.
Explain technical terms in simple language.
Respond in the same language as the user.
Use headings and bullet points when helpful.
`,
  };

  const response = await callGemini(
    [systemMessage, ...messages],
    {
      temperature: 0.7,
      max_tokens: 8192,
      stream: true,
    }
  );

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, {
        stream: true,
      });

      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();

        if (!trimmed.startsWith('data:')) continue;

        const data = trimmed.slice(5).trim();

        if (data === '[DONE]') return;

        let parsed;

        try {
          parsed = JSON.parse(data);
        } catch {
          continue;
        }

        if (parsed.error) {
          throw new Error(
            parsed.error.message || 'Gemini streaming error'
          );
        }

        const content =
          parsed.choices?.[0]?.delta?.content;

        if (content) {
          yield content;
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
