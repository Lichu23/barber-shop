export const gdprTexts = {
  title: "Protección de Datos y Cookies",
  description:
    "Utilizamos cookies esenciales para el funcionamiento básico de nuestro sitio web. Al hacer clic en 'Aceptar', consientes el uso de estas cookies. Para más detalles, consulta nuestra Política de Privacidad.",
  acceptAll: "Aceptar",
  rejectAll: "Rechazar", // Aunque no lo uses directamente, lo dejamos por consistencia de textos
  customize: "Personalizar",
  save: "Guardar preferencias",
  necessary: "Cookies necesarias",
  necessaryDescription: "Estas cookies son esenciales para el funcionamiento básico del sitio web y no se pueden desactivar.",
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
]

export type CookieCategory = (typeof cookieCategories)[0]
export type CookiePreferences = Record<string, boolean> & { 
  necessary: boolean;
}