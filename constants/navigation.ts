export const navigationLinks = [
  {
    href: "/#inicio",
    label: "Inicio",
  },
  {
    href: "/#galeria",
    label: "Galería",
  },
  {
    href: "/#servicios",
    label: "Servicios",
  },
  {
    href: "/reservation",
    label: "Reservar",
  },
  {
    href: "/#contacto",
    label: "Contacto",
  },
]

export type NavigationLink = (typeof navigationLinks)[0]
