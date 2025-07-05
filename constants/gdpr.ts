export const gdprTexts = {
  title: "Protección de Datos",
  description:
    "Utilizamos cookies y tecnologías similares para mejorar tu experiencia, personalizar contenido y analizar nuestro tráfico. Al hacer clic en 'Aceptar todas', consientes el uso de todas las cookies.",
  acceptAll: "Aceptar todas",
  rejectAll: "Rechazar todas",
  customize: "Personalizar",
  save: "Guardar preferencias",
  necessary: "Cookies necesarias",
  necessaryDescription: "Estas cookies son esenciales para el funcionamiento del sitio web.",
  analytics: "Cookies analíticas",
  analyticsDescription: "Nos ayudan a entender cómo interactúas con nuestro sitio web.",
  marketing: "Cookies de marketing",
  marketingDescription: "Se utilizan para mostrarte anuncios relevantes en otros sitios web.",
  privacyPolicy: "Política de Privacidad",
  termsOfService: "Términos de Servicio",
  learnMore: "Más información",
}

export const cookieCategories = [
  {
    id: "necessary",
    name: gdprTexts.necessary,
    description: gdprTexts.necessaryDescription,
    required: true,
  },
  {
    id: "analytics",
    name: gdprTexts.analytics,
    description: gdprTexts.analyticsDescription,
    required: false,
  },
  {
    id: "marketing",
    name: gdprTexts.marketing,
    description: gdprTexts.marketingDescription,
    required: false,
  },
]

export type CookieCategory = (typeof cookieCategories)[0]
export type CookiePreferences = Record<string, boolean>
