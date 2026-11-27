export const sdgGoals = [
  {
    id: 1,
    name: 'No Poverty',
    color: '#E5243B',
    icon: '💰',
    description:
      'End poverty in all its forms everywhere by empowering smallholder farmers with AI-driven insights to increase income and productivity.',
    impact:
      'AgriGuard AI helps farmers optimize crop selection and reduce losses, directly increasing household income for the world\'s poorest communities.',
    target: '1.4',
    targetText: 'Equal rights to economic resources and basic services',
    stats: { value: '700M+', label: 'People in extreme poverty' },
  },
  {
    id: 2,
    name: 'Zero Hunger',
    color: '#DDA63A',
    icon: '🍽️',
    description:
      'End hunger, achieve food security and improved nutrition, and promote sustainable agriculture through AI-powered precision farming.',
    impact:
      'By detecting crop diseases early and recommending optimal crops, AgriGuard AI prevents massive food losses and increases global food production.',
    target: '2.3',
    targetText:
      'Double the agricultural productivity and incomes of small-scale food producers',
    stats: { value: '828M', label: 'People facing hunger globally' },
  },
  {
    id: 13,
    name: 'Climate Action',
    color: '#3F7E44',
    icon: '🌍',
    description:
      'Take urgent action to combat climate change and its impacts on agriculture through data-driven, climate-resilient farming.',
    impact:
      'AgriGuard AI recommends climate-resilient crops and sustainable farming practices, helping agriculture adapt to changing weather patterns.',
    target: '13.1',
    targetText:
      'Strengthen resilience and adaptive capacity to climate-related hazards',
    stats: { value: '23%', label: 'Of global GHG emissions from agriculture' },
  },
  {
    id: 15,
    name: 'Life on Land',
    color: '#56C02B',
    icon: '🌿',
    description:
      'Protect, restore, and promote sustainable use of terrestrial ecosystems and halt land degradation.',
    impact:
      'By promoting precision agriculture, AgriGuard AI reduces overuse of pesticides and fertilizers, protecting biodiversity and soil health.',
    target: '15.3',
    targetText:
      'Combat desertification, restore degraded land, and strive for a land degradation-neutral world',
    stats: { value: '40%', label: 'Of land is degraded globally' },
  },
];

// Real statistics from UN FAO & World Bank — the global crisis we're solving
export const impactStats = [
  { label: 'People Facing Hunger (UN 2024)', value: 828, suffix: 'M', icon: '🍽️' },
  { label: 'Smallholder Farmers Worldwide', value: 500, suffix: 'M', icon: '👨‍🌾' },
  { label: 'Crop Losses to Disease Yearly', value: 40, suffix: '%', icon: '🦠' },
  { label: 'Countries Affected by Food Crisis', value: 48, suffix: '+', icon: '🌏' },
];

export const cropDiseases = [
  { name: 'Leaf Blight', severity: 'High', crop: 'Rice', icon: '🍂' },
  { name: 'Powdery Mildew', severity: 'Medium', crop: 'Wheat', icon: '🌫️' },
  { name: 'Root Rot', severity: 'High', crop: 'Tomato', icon: '🍅' },
  { name: 'Rust Disease', severity: 'Medium', crop: 'Corn', icon: '🌽' },
  { name: 'Bacterial Wilt', severity: 'Critical', crop: 'Potato', icon: '🥔' },
  { name: 'Anthracnose', severity: 'Low', crop: 'Mango', icon: '🥭' },
];

export const regions = [
  'South Asia',
  'Southeast Asia',
  'Sub-Saharan Africa',
  'East Africa',
  'Latin America',
  'Middle East & North Africa',
  'Central Asia',
  'East Asia',
  'Pacific Islands',
  'Caribbean',
];

export const soilTypes = [
  'Clay',
  'Sandy',
  'Loamy',
  'Silt',
  'Peat',
  'Chalky',
  'Saline',
  'Red Soil',
  'Black Soil',
  'Laterite',
];

export const seasons = ['Kharif (Monsoon)', 'Rabi (Winter)', 'Zaid (Summer)', 'Year-round'];

export const waterAvailability = ['Rain-fed only', 'Limited irrigation', 'Full irrigation', 'Drought-prone'];

export const quickPrompts = [
  { label: '🩺 Treat leaf blight', prompt: 'How do I treat leaf blight disease in my rice crops? Give me organic and chemical treatment options.' },
  { label: '🌱 Best dry season crops', prompt: 'What are the best crops to grow during the dry season with limited water availability?' },
  { label: '🐛 Natural pest control', prompt: 'What are effective natural pest control methods for small-scale vegetable farming?' },
  { label: '🌤️ Climate-resilient farming', prompt: 'How can I make my farm more resilient to climate change? What practices should I adopt?' },
  { label: '💧 Water conservation', prompt: 'What are the best water conservation techniques for farming in arid regions?' },
  { label: '🧪 Improve soil health', prompt: 'How can I improve my soil health naturally without expensive fertilizers?' },
];
