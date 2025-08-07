import { getTenantProfileById } from "@/lib/services/tenantServices";

export default async function TermsOfServicePage({ params }: { params: { tenantId: string } }) {
    const { tenantId } = params;
    const { data: tenantProfile, error } = await getTenantProfileById(tenantId);
  
  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Términos de Servicio</h1>
      <p className="mb-4">
        Bienvenido a **{tenantProfile?.salon_name}**. Al utilizar nuestro servicio de
        reservas online, aceptas los siguientes términos y condiciones.
      </p>

      <h2 className="text-2xl font-semibold mb-4">1. Definiciones</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>
          <strong>"Servicio":</strong> Se refiere a la plataforma de reservas
          online proporcionada por {tenantProfile?.salon_name}.
        </li>
        <li>
          <strong>"Usuario Final":</strong> La persona que realiza una reserva
          de cita a través del Servicio.
        </li>
        <li>
          <strong>"Propietario":</strong> El administrador del salón de
          peluquería que utiliza nuestra plataforma para gestionar sus citas.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        2. Aceptación de los Términos
      </h2>
      <p className="mb-4">
        Al acceder y utilizar nuestro Servicio, confirmas que aceptas y estás
        sujeto a estos Términos de Servicio y a nuestra Política de Privacidad.
        Si no estás de acuerdo, no debes utilizar el Servicio.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        3. Uso del Servicio por el Usuario Final
      </h2>
      <p className="mb-4">
        Como Usuario Final, te comprometes a proporcionar información precisa y
        completa al realizar una reserva. Puedes cancelar tu cita a través del
        enlace proporcionado en el email de confirmación.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        4. Funcionalidades para el Propietario (Integración con Google)
      </h2>
      <p className="mb-4">
        El Servicio ofrece al Propietario la opción de integrar su cuenta de
        Google Calendar para sincronizar las citas. Esta es una funcionalidad
        opcional para la gestión interna del Propietario y su uso se rige por
        los términos de Google y nuestra Política de Privacidad. El Usuario
        Final no interactúa directamente con esta integración.
      </p>

      <h2 className="text-2xl font-semibold mb-4">5. Propiedad Intelectual</h2>
      <p className="mb-4">
        Todo el contenido y los materiales disponibles en el Servicio son
        propiedad de **{tenantProfile?.salon_name}** y están protegidos por leyes de
        derechos de autor.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        6. Limitación de Responsabilidad
      </h2>
      <p className="mb-4">
        El Servicio se proporciona "tal cual". **{tenantProfile?.salon_name}** no será
        responsable de ningún daño directo o indirecto que surja de tu acceso o
        uso del Servicio.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        7. Cambios en los Términos
      </h2>
      <p className="mb-4">
        Nos reservamos el derecho de modificar estos Términos en cualquier
        momento. Te notificaremos publicando los nuevos Términos en esta página.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        8. Ley Aplicable y Jurisdicción
      </h2>
      <p className="mb-4">
        Estos Términos se regirán por las leyes de España. Cualquier disputa se
        someterá a la jurisdicción de los tribunales de Barcelona.
      </p>

      <h2 className="text-2xl font-semibold mb-4">9. Contacto</h2>
      <p className="mb-4">
        Si tienes alguna pregunta sobre estos Términos, contáctanos en{" "}
        <strong>lisandroxarenax@gmail.com</strong>.
      </p>

      <p className="text-sm text-gray-500 mt-8">
        Última actualización: 8 de agosto de 2025
      </p>
    </div>
  );
}
