export const haircuts = [
  {
    id: 1,
    name: "Cabello Liso Castaño",
    image: "/images/cabello-liso-castano.webp",
    description: "Alisado Perfecto - Cabello largo y sedoso con brillo espejo y acabado profesional",
  },
  {
    id: 2,
    name: "Cabello Rubio Ondulado",
    image: "/images/cabello-rubio-ondulado.webp",
    description: "Balayage Dorado - Ondas naturales con técnica de coloración multitonal perfecta",
  },
  {
    id: 3,
    name: "Cabello Largo Oscuro",
    image: "/images/cabello-largo-oscuro.webp",
    description: "Melena Sedosa - Cabello largo con tratamiento alisador y brillo intenso",
  },
  {
    id: 4,
    name: "Pelo Liso Marrón con Reflejos",
    image: "/images/pelo-lasio-marron.webp",
    description: "Cabello liso y brillante con sutiles reflejos marrones y rojizos para dar profundidad.",
  },
  {
    id: 5,
    name: "Peinado de Novia Recogido",
    image: "/images/peinado-de-novia.webp",
    description: "Elegante recogido para novias con detalles florales en el cabello, ideal para tu gran día.",
  },
  {
    id: 6,
    name: "Pelo Castaño Liso",
    image: "/images/pelo-castaño.webp",
    description: "Melena lisa y uniforme en tono castaño natural, con un acabado suave y brillante.",
  },

]

export type HaircutType = (typeof haircuts)[0]
