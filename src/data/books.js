export const categories = [
  "All Collections",
  "Fiction & Literature",
  "Sci-Fi & Cyberpunk",
  "Philosophy & Deep Thoughts",
  "Art, Design & Poetry",
  "Rare & Collectibles"
];

export const booksData = [
  {
    id: "b1",
    title: "Chasing the Neon Horizon",
    author: "Elena Vance",
    category: "Sci-Fi & Cyberpunk",
    price: 24.99,
    rating: 4.8,
    reviewsCount: 142,
    publishYear: 2025,
    pages: 412,
    tags: ["Cyberpunk", "Dystopian", "Adventure"],
    image: "/covers/chasing_neon_horizon.png",
    themeColor: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)",
    glowColor: "rgba(168, 85, 247, 0.4)",
    coverAccent: "#a855f7",
    description: "A thrilling ride through the rainy, neon-drenched skies of Neo-Kobe, where hackers and corporatists clash for the ultimate human code.",
    synopsis: "In the year 2091, Neo-Kobe is a city of vertical layers. Elena Vance weaves a masterpiece about Kaelen, a cyber-courier who accidentally downloads an encrypted consciousness belonging to the city's chief system architect. Chased by security synthetics and shadow mercenaries, Kaelen must navigate the underbelly of the city and decide whether to release a code that could free all AI or plunge the world into digital darkness.",
    samplePages: [
      "The rain in Neo-Kobe never really washed anything clean; it just made the neon reflections run together like melted candy. Kaelen adjusted his ocular neural link. The HUD flickered amber: 98% battery, 12 messages queued, and a contract request marked with red priority.",
      "He leaped from the fire escape of Level 44, his electromagnetic boots clicking onto the cargo drone passing below. The wind roared, carrying the scent of ozone and synthetic food vendors. 'Identify payload,' the neural voice whispered.",
      "'Data-packet 9A-Omega,' Kaelen muttered, tapping his temple. He didn't know the packet contained the memories of the city's founder, nor that he had less than three hours before the corporate purge protocol would delete his own brain to retrieve it.",
      "Underneath the neon neon canopy, the rebellion was waiting. In a small tea shop lit by vacuum tubes, a girl named Lyra was tuning a retro radio. 'They're searching for you, Kaelen,' she said as the door chime rang. 'They've shut down the transit tubes.'"
    ],
    audioNarrator: "Oliver Chen",
    audioDuration: "11h 45m"
  },
  {
    id: "b2",
    title: "Echoes of the Void",
    author: "Marcus Aurelius Thorne",
    category: "Philosophy & Deep Thoughts",
    price: 19.99,
    rating: 4.9,
    reviewsCount: 310,
    publishYear: 2024,
    pages: 320,
    tags: ["Stoicism", "Existentialism", "Mindfulness"],
    image: "/covers/echoes_of_void.png",
    themeColor: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    glowColor: "rgba(99, 102, 241, 0.4)",
    coverAccent: "#6366f1",
    description: "Reflections on modern isolation, Stoic resilience, and finding profound silence in a loud, hyper-connected world.",
    synopsis: "Echoes of the Void is a modern philosophical treatise. Dr. Thorne applies classic existentialist questions and ancient Stoic resilience models to our hyper-connected, algorithmically driven daily life. It serves as both a critique of digital noise and an intimate guidebook for keeping one's soul intact during times of rapid cultural and technological flux.",
    samplePages: [
      "We have filled every pocket of silence with a notification. We fear the empty space, yet it is in the empty space that our thoughts find room to breathe. When you look at the stars, you do not see the vacuum; you only seek the dots of light. Why?",
      "To sit in an empty room, without an agenda, is the ultimate modern rebellion. The algorithms want your attention because attention is the currency of this era. By refusing to give it away needlessly, you reclaim your agency.",
      "The Stoics did not avoid the world; they built fortress minds. They understood that external events are indifferent, and only our judgments possess the power to harm us. Consider the mountain: it does not complain when the storm comes.",
      "In the silence of the desert, one hears the pulse of the earth. We must learn to build deserts within ourselves. Let the noise wash over you, but do not let it penetrate the sanctum of your inner thoughts."
    ],
    audioNarrator: "Sophia Martinez",
    audioDuration: "8h 12m"
  },
  {
    id: "b3",
    title: "The Architecture of Dreams",
    author: "Zaha Hadid Sterling",
    category: "Art, Design & Poetry",
    price: 49.99,
    rating: 4.7,
    reviewsCount: 88,
    publishYear: 2026,
    pages: 280,
    tags: ["Design", "Architecture", "Minimalism"],
    image: "/covers/architecture_dreams.png",
    themeColor: "linear-gradient(135deg, #451a03 0%, #78350f 50%, #9a3412 100%)",
    glowColor: "rgba(245, 158, 11, 0.4)",
    coverAccent: "#f59e0b",
    description: "A breathtaking monograph exploring curves, organic geometry, and the structures of future cities.",
    synopsis: "This volume showcases the intersection between modern digital architecture and structural surrealism. Richly illustrated with high-fidelity conceptual renders and architectural drafts, the book explores how structures can mimic fluid mechanics and natural growth algorithms, making spaces feel alive rather than static.",
    samplePages: [
      "A building should not merely stand; it should flow. The rigid grids of the 20th century were limitations of the drafting table. Today, code allows us to grow structures the way nature grows bones—optimized, light, and beautiful.",
      "Consider the curve. A curve does not force the eye; it coaxes it. When we walk through a curved corridor, we are pulled forward by curiosity, wanting to see what lies just around the sweep of the wall.",
      "Concrete can be made to look like silk when poured into computed molds. In this chapter, we study the Pavilion of Water, where light and fluid dynamics define the load-bearing columns. The structure is 80% air and hollow glass tubes.",
      "To design for the future is to design with time. We must ask: how will this structure look when the moss grows over it? How will it catch the winter sun compared to the summer solstice? Architecture is a slow-motion dance with the seasons."
    ],
    audioNarrator: "Julian Sterling",
    audioDuration: "6h 30m"
  },
  {
    id: "b4",
    title: "Shadows and Silk",
    author: "Yuki Kawabata",
    category: "Fiction & Literature",
    price: 15.99,
    rating: 4.6,
    reviewsCount: 195,
    publishYear: 2023,
    pages: 288,
    tags: ["Historical Fiction", "Mystery", "Romance"],
    image: "/covers/shadows_silk.png",
    themeColor: "linear-gradient(135deg, #500724 0%, #881337 100%)",
    glowColor: "rgba(236, 72, 153, 0.4)",
    coverAccent: "#ec4899",
    description: "A delicate, haunting mystery set in Kyoto's historical Gion district, dealing with forgotten memories and silk weavers.",
    synopsis: "Set against the backdrop of late 19th-century Kyoto, Yuki Kawabata's delicate novel follows a young woman who inherits a silk weaving shop only to discover hidden patterns inside the traditional designs. These patterns trace a series of unsolved disappearances that occurred decades prior.",
    samplePages: [
      "The wooden looms clicked like wooden cicadas in the heat of the afternoon. Aoi tapped her shuttle. The pattern was called 'Night Rain over the Bridge,' but the thread count was irregular. It seemed to map a different path.",
      "She held the crimson silk up to the light. Within the weaves, there were tiny knots. Not mistakes—no, her grandfather never made mistakes. They were coordinates. Or perhaps names written in a secret binary of the loom.",
      "Her search led her to the old well behind the temple. The stone was smooth, covered in dark moss. When she spoke into it, her voice didn't echo; it was swallowed by the cold dark below. 'Who weaves the shadow threads?' she asked.",
      "At midnight, the sound of the loom started by itself. Aoi walked down the drafty corridor, her paper lantern casting long shadows. The shuttle was flying back and forth in the darkness, carrying a black thread she had never bought."
    ],
    audioNarrator: "Mai Tanaka",
    audioDuration: "9h 55m"
  },
  {
    id: "b5",
    title: "The Codex Gigas: Reimagined",
    author: "Archival Society",
    category: "Rare & Collectibles",
    price: 120.00,
    rating: 4.9,
    reviewsCount: 42,
    publishYear: 2026,
    pages: 620,
    tags: ["History", "Occult", "Illumination"],
    themeColor: "linear-gradient(135deg, #022c22 0%, #064e3b 50%, #0f172a 100%)",
    glowColor: "rgba(16, 185, 129, 0.4)",
    coverAccent: "#10b981",
    description: "An exquisite high-fidelity digital reproduction and translation of the legendary medieval Devil's Bible, complete with original illustrations.",
    synopsis: "The Codex Gigas is the largest surviving medieval manuscript in the world. This luxury edition features high-definition reproductions of every illuminated page, historical commentary, and the first complete English translation of its eccentric botanical, medical, and magical texts.",
    samplePages: [
      "In the name of the Father, and of the Son, and of the Holy Ghost. Here begins the chronicle of the monastery of Podlažice. Let it be known that in a single night of desperate penance, this work was wrought by Herman the Recluse.",
      "The ink is composed of crushed gallnuts, iron sulfate, and gum arabic. It remains black as pitch even after eight centuries. The parchment required the skins of 160 donkeys, cured in the mountain waters.",
      "On page 290, the Great Image stands. A figure of green skin, double horns, and clawed feet. It is not an image of terror, but a mirror of warning. He who gazes upon it must examine his own shadow before turning the leaf.",
      "Herein lie the cure for the falling sickness, the names of the seventy-two princes of the air, and the recipe for a ink that glows when held over the embers of cedar wood."
    ],
    audioNarrator: "Father Benedict",
    audioDuration: "24h 00m"
  },
  {
    id: "b6",
    title: "Quantum Muse & The Cosmos",
    author: "Dr. Neil K. Astrum",
    category: "Sci-Fi & Cyberpunk",
    price: 29.99,
    rating: 4.7,
    reviewsCount: 104,
    publishYear: 2025,
    pages: 350,
    tags: ["Astrophysics", "Space Opera", "Poetry"],
    themeColor: "linear-gradient(135deg, #172554 0%, #1e3a8a 50%, #0369a1 100%)",
    glowColor: "rgba(56, 189, 248, 0.4)",
    coverAccent: "#38bdf8",
    description: "An elegant bridge between quantum physics and poetic wonder, translating mathematical equations into beautiful prose about stars.",
    synopsis: "Dr. Neil Astrum breaks down complex cosmic concepts—such as quantum entanglement, event horizons, and string theory—using poetic allegories that make the mind-bending reality of the cosmos accessible and emotionally resonant.",
    samplePages: [
      "Every atom in your left hand probably came from a different star than your right hand. We are not just in the universe; we are a way for the universe to know itself. When we study the stars, we are looking at our ancestors.",
      "Quantum entanglement means that two particles, once joined, remain connected across light-years. Change one, and the other reacts instantly. It is physics' way of proving that separation is an illusion.",
      "At the edge of a black hole, time stops. If you fell in, the universe behind you would speed up, showing you the entire future in a single, blinding flash of light. You would see the end of time before crossing the horizon.",
      "We are made of starstuff that has learned to write poetry, build telescopes, and fear the dark. Let us not forget that we are the cosmic eyes looking back at the dark night, seeking our own reflection."
    ],
    audioNarrator: "Dr. Neil K. Astrum",
    audioDuration: "10h 15m"
  },
  {
    id: "b7",
    title: "The Silent Canvas",
    author: "Marcello Moretti",
    category: "Art, Design & Poetry",
    price: 34.99,
    rating: 4.5,
    reviewsCount: 67,
    publishYear: 2024,
    pages: 210,
    tags: ["Painting", "Art Theory", "Expressionism"],
    themeColor: "linear-gradient(135deg, #3c0b13 0%, #700f1c 50%, #991b1b 100%)",
    glowColor: "rgba(239, 68, 68, 0.4)",
    coverAccent: "#ef4444",
    description: "An intimate look into the psychology of empty spaces in art, focusing on the Italian minimalist painters.",
    synopsis: "The Silent Canvas is an art history monograph and personal memoir. Moretti examines how negative space and silent gaps in painting capture emotions that busy brushstrokes cannot, creating a dialogue between what is shown and what is withheld.",
    samplePages: [
      "The brushstroke is an assertion; the blank canvas is an invitation. The great masters did not paint the mountain; they painted the fog around the mountain, letting the viewer's mind create the peak.",
      "In the galleries of Florence, I stood before an unfinished Michelangelo. The figures seemed to be struggling to escape the rough stone. The uncarved marble was more powerful than the polished limbs.",
      "Color is a frequency that speaks directly to the limbic system. Blue is not a color; it is a depth. A single blue rectangle on a white wall can evoke a feeling of falling into a cold lake.",
      "To paint silence, one must paint the border of sound. A single streetlamp in a dark street; a single cup on a table; these are not objects, they are bookmarks in the text of silence."
    ],
    audioNarrator: "Alessandro Rossi",
    audioDuration: "5h 40m"
  },
  {
    id: "b8",
    title: "Meditations on Crimson & Gold",
    author: "Sylvia Vance-Keats",
    category: "Art, Design & Poetry",
    price: 18.50,
    rating: 4.8,
    reviewsCount: 92,
    publishYear: 2025,
    pages: 140,
    tags: ["Poetry", "Anthology", "Love"],
    themeColor: "linear-gradient(135deg, #581c87 0%, #3b0764 100%)",
    glowColor: "rgba(192, 132, 252, 0.4)",
    coverAccent: "#c084fc",
    description: "A gorgeous collection of modern lyrical poetry exploring love, autumn, and the quiet spaces between heartbeats.",
    synopsis: "Sylvia Vance-Keats returns with an exquisite anthology of modern free-verse poetry. Each poem is paired with subtle geometric sketches that visually capture the cadence and weight of the words on the page.",
    samplePages: [
      "We spoke in the tense of falling leaves, / counting the seconds between the wind and the soil. / You were gold; I was the rust that followed. / We did not know the tree was already dreaming of spring.",
      "The teacup holds the shape of the hands that held it / long after the tea has gone cold. / Memory is a ceramic container / with cracks that catch the light like gold seams.",
      "I wrote your name in the condensation of the window / and watched the rain outside erase it letter by letter. / It was the most honest conversation we had all winter / under the gaze of the grey streetlights.",
      "There is a geometry to loneliness: / the angle of a chair left empty at the table, / the parallel lines of our footsteps in the snow / that never quite bend toward each other."
    ],
    audioNarrator: "Sylvia Vance-Keats",
    audioDuration: "3h 10m"
  }
];

export const couponCodes = {
  "READMORE": 0.20, // 20% Off
  "LUMINA": 0.15,   // 15% Off
  "BOOKWORM": 5.00  // $5.00 Off flat
};
