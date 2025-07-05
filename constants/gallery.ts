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
]

export type HaircutType = (typeof haircuts)[0]
