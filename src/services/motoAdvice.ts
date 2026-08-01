export async function getMotoAdvice(prompt: string, history: { role: 'user' | 'model', text: string }[]) {
  const staticResponses: Record<string, string> = {
    'cafe racer': 'Cafe Racers are all about speed and style. Focus on clip-on handlebars, rear-set footpegs, and a single seat cowl. The bone line should be horizontal and aggressive.',
    'bobber': 'Bobbers embody minimalist American muscle. Strip the fenders, go solo seat, and keep it low. Think 1930s aesthetics with modern reliability.',
    'scrambler': 'Scramblers are built for dual-purpose action. High exhaust, knobby tires, and long-travel suspension let you go from street to dirt effortlessly.',
    'jetski': 'For peak Jetski performance, focus on hull dynamics and impeller pitch. Sponsons control the ride attitude - adjust for sharp carving or stable cruising.',
    'tuktuk': 'Custom Tuktuks need three-wheel stability first. Reinforce that chassis, optimize the canopy airflow, and consider urban agility in every modification.',
    'default': "The shop is focused on Cafe Racers, Bobbers, Scramblers, Jetskis, and Tuktuks. What custom build are you planning? Need technical specs, parts advice, or styling tips?"
  };

  const lowerPrompt = prompt.toLowerCase();
  for (const key of Object.keys(staticResponses)) {
    if (lowerPrompt.includes(key)) {
      return staticResponses[key];
    }
  }
  return staticResponses.default;
}
