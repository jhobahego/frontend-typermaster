export interface FallbackTextsByLength {
  short: string[];
  medium: string[];
  long: string[];
}

export interface FallbackTextsByLanguage {
  [language: string]: FallbackTextsByLength;
}

export const FALLBACK_TEXTS: FallbackTextsByLanguage = {
  en: {
    short: [
      'The morning light filtered through the blinds, casting gentle shadows across the wooden desk.',
      'Technology connects people across oceans, turning distant thoughts into shared moments in seconds.',
      'Practice makes progress when patience and consistency guide every single keystroke forward.',
      'Clear mountain air and quiet streams offer a peaceful escape from the busy routines of modern life.'
    ],
    medium: [
      'The old library was quiet except for the subtle rustle of turning pages and the distant sound of rain. Sunlight streamed through high arched windows, illuminating floating specks of dust that danced above rows of ancient books. Sitting in a corner, an apprentice scholar discovered a passage that would change how historians viewed the forgotten kingdom forever.',
      'Every journey begins with a small decision to step outside of your familiar comfort zone. When challenges arise along the road, resilience turns obstacles into valuable stepping stones toward mastery. The greatest accomplishments are rarely built overnight, but through steady dedication practiced every single day.',
      'In the heart of the bustling city, a small community garden thrived between two modern skyscrapers. Neighbors gathered every weekend to tend to fresh vegetables, share homemade recipes, and exchange stories from their diverse backgrounds. It stood as a living reminder that nature and human warmth can flourish anywhere.'
    ],
    long: [
      "High above the quiet valley, the observatory telescope slowly rotated toward the clear night sky. Astronomers monitored glowing screens that displayed data gathered from distant galaxies millions of light-years away. Every faint signal told a story of cosmic evolution, ancient stars collapsing, and new planets forming in uncharted corners of the universe. Generations of scientific curiosity had culminated in this single moment of discovery, opening new frontiers for humankind's understanding of our place among the stars. The quiet hum of machinery seemed almost musical in the still midnight air.",
      'Software engineering is more than writing instructions for computers; it is the art of solving human problems with clarity and foresight. Designing resilient architectures requires understanding not only the happy path where everything succeeds, but also preparing gracefully for unexpected failures and transient network hiccups. When an external service becomes unavailable, a well-crafted system adapts seamlessly, ensuring users continue their work without interruption. True craftsmanship reveals itself in how gracefully software behaves when things do not go as planned.',
      'The mountain trail wound sharply through dense pine forests before opening onto a breathtaking panoramic ridge. Cool mountain breezes carried the crisp scent of cedar and wild earth, invigorating the hikers who had climbed since dawn. Below them, a pristine glacial lake mirrored the snow-capped peaks in startling detail. Reaching the summit rewarded hours of strenuous effort, proving once again that the most rewarding views are earned one steady step at a time.'
    ]
  },
  es: {
    short: [
      'La luz de la mañana entraba suavemente por la ventana, iluminando el cuaderno de notas sobre la mesa de trabajo.',
      'La práctica diaria y la constancia transforman cualquier dificultad inicial en una habilidad fluida y natural.',
      'El café recién preparado llenaba la habitación con un aroma reconfortante mientras comenzaba una nueva jornada.',
      'Caminar al aire libre bajo los árboles ayuda a despejar la mente y recuperar la concentración necesaria.'
    ],
    medium: [
      'La vieja biblioteca municipal guardaba un silencio sereno, interrumpido únicamente por el leve susurro de las hojas al pasar. A través de los grandes ventanales, los rayos del sol iluminaban estanterías repletas de historias esperando ser descubiertas. En un rincón tranquilo, un joven lector encontró un antiguo manuscrito que despertó su curiosidad por los misterios de la historia.',
      'El desarrollo de software exige tanto creatividad como disciplina para resolver problemas complejos de manera elegante. Cuando construimos aplicaciones pensando en las personas, cada detalle importa, desde la velocidad de respuesta hasta cómo manejamos las situaciones imprevistas. La verdadera calidad de un sistema se demuestra cuando las cosas fallan y la aplicación sigue siendo útil.',
      'Al caer la tarde, las calles adoquinadas del centro histórico cobraban vida con la música de artistas locales y el bullicio de la gente. Los faroles coloniales se encendían uno a uno, proyectando sombras cálidas sobre las fachadas de colores. Pasear por allí era como hacer una pausa en el tiempo, disfrutando del encanto único de la ciudad.'
    ],
    long: [
      'En lo alto de la colina, el antiguo observatorio astronómico abría su cúpula hacia un cielo nocturno completamente despejado. Los científicos observaban fascinados los monitores que procesaban imágenes de galaxias lejanas situadas a millones de años luz. Cada destello de luz capturado por los sensores guardaba secretos sobre el origen del universo y la evolución de estrellas extintas. Horas de minuciosa investigación culminaban en hallazgos que permitirían comprender mejor el cosmos y nuestro lugar dentro de él. El silencio de la montaña acompañaba una noche inolvidable de ciencia y descubrimiento.',
      'Aprender a mecanografiar con rapidez y precisión requiere paciencia, buena postura y una práctica deliberada y constante. Al principio, cada tecla parece exigir una decisión consciente, pero con el tiempo los dedos encuentran su camino de forma casi automática sobre el teclado. Desarrollar esta destreza no solo ahorra incontables horas frente a la pantalla, sino que permite plasmar pensamientos e ideas al mismo ritmo en que fluyen en la mente. La clave está en priorizar la exactitud antes de buscar la máxima velocidad.',
      'El sendero ascendía serpenteando entre frondosos bosques de montaña hasta alcanzar un mirador con vistas espectaculares. El aire fresco traía aromas a pino y tierra húmeda, renovando las energías de los senderistas tras varias horas de caminata. A lo lejos, las cumbres nevadas contrastaban con el verde intenso de los valles que se extendían hasta el horizonte. Cada paso dado con esfuerzo encontraba su recompensa en la inmensidad del paisaje y la profunda tranquilidad del entorno.'
    ]
  }
};

/**
 * Returns a random fallback text matching requested language and length.
 * Defaults safely to English and medium length if requested combination is missing.
 */
export function getRandomFallbackText(language: string = 'en', length: string = 'medium'): string {
  const langKey = language in FALLBACK_TEXTS ? language : 'en';
  const textsByLength = FALLBACK_TEXTS[langKey] ?? FALLBACK_TEXTS.en;
  const lengthKey = (length in textsByLength ? length : 'medium') as keyof FallbackTextsByLength;
  const pool = textsByLength[lengthKey] ?? textsByLength.medium;

  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}
