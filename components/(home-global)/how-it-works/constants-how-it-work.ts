import {
  CheckCircle,
  FileText,
  Palette,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";

export const tenantStepsHome = [
  {
    id: "tenant-step-1",
    step: "Consentimiento de Google Calendar",
    icon: UserCheck,
    list: [
      {
        text: "Se te otorga un link único donde debes dar los permisos de la cuenta de google calendar.",
        id: 13,
      },
      {
        text: "Una vez dado los permisos ya los clientes pueden reservar una cita.",
        id: 14,
      },
    ],
  },
  {
    id: "tenant-step-2",
    step: "Reservas",
    icon: Users,
    list: [
      {
        text: "Las reservas se guardan automáticamente en tu google calendar.",
        id: 16,
      },
      {
        text: "En google calendar se guardará el evento con los datos del cliente y un link para poder cancelar la reserva.",
        id: 17,
      },
      {
        text: "Una vez el cliente cancela el turno se te elimina el evento de google calendar automáticamente y pasa a estar disponible en la página para que otro cliente pueda reservar.",
        id: 18,
      },
    ],
  },
  {
    id: "tenant-step-3",
    step: "Soporte",
    icon: Wrench,
    list: [
      { text: "Soporte disponible los 7 días de la semana.", id: 54 },
      { text: "Soporte prioritario con el plan anual.", id: 55 },
      { text: "Soporte incluido en el primer mes gratuito.", id: 56 },
    ],
  },
];

export const clientStepsHome = [
  {
    id: "homes-step-1",
    step: "Página de Inicio",
    icon: FileText,
    list: [
      {
        text: "Tienes sección principal con 2 botones donde puedes ir a ver todos los servicios o reservar",
        id: 1,
      },
      { text: "Segunda sección con la galería de trabajos realizados", id: 2 },
      { text: "Por último la sección de servicios destacados", id: 3 },
    ],
  },
  {
    icon: FileText,
    id: "homes-step-2",
    step: "Página de Servicios",
    list: [
      {
        text: "Tienes una sección completa con todos los servicios disponibles",
        id: 5,
      },
      {
        text: "Puedes ver cada nombre del servicio con su respectivo precio",
        id: 6,
      },
    ],
  },
  {
    icon: FileText,
    id: "homes-step-3",
    step: "Página de Reservas",
    list: [
      { text: "Primero debes preseleccionar el servicio que deseas.", id: 10 },
      {
        text: "Lo segundo es completar un formulario con tus datos y también puedes editar los servicios preseleccionados",
        id: 11,
      },
      {
        text: "Una vez reservado se te enviará un email con los datos de la cita donde también podrás cancelar la cita",
        id: 12,
      },
    ],
  },
];

export const creationPageStepsHome = [
  {
    id: "creation-step-1",
    step: "Entrega de Datos",
    week: "1ra semana",
    icon: FileText,
    list: [
      {
        text: "Completas un formulario con la información de tu negocio",
        id: 19,
      },
      { text: "Revisamos y confirmamos los datos contigo", id: 20 },
    ],
  },
  {
    id: "creation-step-2",
    step: "Desarrollo",
    week: "2da-3ra semana",
    icon: Palette,
    list: [
      { text: "Creamos tu página web personalizada", id: 21 },
      { text: "Integramos el sistema de reservas con Google Calendar", id: 22 },
      { text: "Realizamos pruebas completas del sistema", id: 23 },
    ],
  },
  {
    id: "creation-step-3",
    step: "Entrega",
    week: "4ta semana",
    icon: CheckCircle,
    list: [
      { text: "Te mostramos tu página web funcionando", id: 28 },
      { text: "Conectamos tu Google Calendar", id: 29 },
      { text: "Recibes tu página con el primer mes gratis", id: 30 },
    ],
  },
];
