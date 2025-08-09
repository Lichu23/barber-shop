export const tenantStepsHome = [
  {
    id: "tenant-step-1",
    step: "Consentimiento de Google Calendar.",
    list: [
      {
        text: "Se te otorga un link unico donde debes dar los permisos de la cuenta de google calendar.",
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
    list: [
      {
        text: "Las reservas se guardan automaticamente en tu google calendar.",
        id: 16,
      },
      {
        text: "En google calendar se guardara el evento con los datos del cliente y un link para poder cancelar la reserva.",
        id: 17,
      },
      {
        text: "Una vez el cliente cancela el turno se te elimina el evento de google calendar automaticamente y pasa a estar disponible en la pagina para que otro cliente pueda reservar.",
        id: 18,
      },
    ],
  },
  {
    id: "tenant-step-3",
    step: "Soporte",
    list: [
      {
        text: "Soporte disponible los 7 dias de la semana.",
        id: 54,
      },
      {
        text: "Soporte prioritario con el plan anual.",
        id: 55,
      },
      {
        text: "Soporte incluido en el primer mes gratuito.",
        id: 56,
      },
    ],
  },
];

export const clientStepsHome = [
  {
    id: "homes-step-1",
    step: "Pagina de Inicio",
    list: [
      {
        text: "Tienes seccion principal con 2 botones donde puedes ir a ver todos los servicios o reservar",
        id: 1,
      },
      {
        text: "Segundo seccion con la galeria de trabajos realizados",
        id: 2,
      },
      {
        text: "Por ultimo la seccion de servicios destacados",
        id: 3,
      },
    ],
  },
  {
    id: "homes-step-2",
    step: "Pagina de Servicios",
    list: [
      {
        text: "Tienes una seccion completa con todos los servicios disponibles",
        id: 5,
      },
      {
        text: "Puedes ver cada nombre del servicio con su respectivo precio",
        id: 6,
      },
    ],
  },

  {
    id: "homes-step-3",
    step: "Pagina de Reservas",
    list: [
      {
        text: "Primero debes preseleccionar el servicio que deseas.",
        id: 10,
      },
      {
        text: "Lo segundo es completar un formulario con tus datos y tambien puedes editar los servicios preseleccionados",
        id: 11,
      },
      {
        text: "Una vez reservado se te enviara un email con los datos de la cita donde tambien podras cancelar la cita",
        id: 12,
      },
    ],
  },
];

export const creationPageStepsHome = [
  {
    id: "creation-step-1",
    step: "Entrega de datos",
    week: "1ra semana",

    list: [
      {
        text: "Se te pedira la informacion necesaria para la creacion de tu pagina personalizada",
        id: 19,
      },
      {
        text: "La duracion de la entrega es de 1 semana como maximo pero se puede negociar mas tiempo",
        id: 40,
      },
      {
        text: "Una vez terminada la semana se le enviaran los datos que obtuvimos por si quiere realizar algun cambio",
        id: 20,
      },
    ],
  },
  {
    id: "creation-step-2",
    step: "Comienzo de creacion",
    week: "2da semana",

    list: [
      {
        text: "Se comenzara con la creacion visual de la pagina",
        id: 21,
      },
      {
        text: "Al terminar la segunda semana se enviara un video del proceso realizado.",
        id: 22,
      },
      {
        text: "Si desea modificar algo despues de ver el video se podra negociar el cambio.",
        id: 23,
      },
    ],
  },
  {
    id: "creation-step-3",
    step: "Testing",
    week: "3ra semana",

    list: [
      {
        text: "Se testeara toda la aplicacion y validaciones necesaria en base a la informacion obtenida.",
        id: 25,
      },
      {
        text: "Al terminar las validaciones se volvera a preguntar si hay alguna validacion mas que se le haya olvidado y podras negociar agregar esa validacion.",
        id: 26,
      },
      {
        text: "Una vez terminada la tercera semana se le recordara todas las validaciones realizadas.",
        id: 27,
      },
    ],
  },
  {
    id: "creation-step-4",
    step: "Entrega del producto",
    week: "4ta semana",

    list: [
      {
        text: "La entrega del producto puede entregarse a la 4ta semana o a la 5ta semana como maximo",
        id: 28,
      },
      {
        text: "Antes de la entrega haremos una llamada para mostrar la aplicacion y pasarle el link para poder conectar su google calendar a su pagina web y probar que funcione",
        id: 29,
      },
      {
        text: "Una vez terminado los pasos correspondientes se entregara la aplicacion con el primer mes gratis.",
        id: 30,
      },
    ],
  },
];
