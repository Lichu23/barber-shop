export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
      <p className="mb-4">
        En Chiky Peluquería, valoramos tu privacidad y nos comprometemos a
        proteger tus datos personales. Esta Política de Privacidad explica cómo
        recopilamos, usamos y protegemos la información que nos proporcionas, de
        acuerdo con el Reglamento General de Protección de Datos (RGPD) y la
        legislación española.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        Información del Responsable del Tratamiento
      </h2>
      <p className="mb-4">
        El responsable del tratamiento de tus datos personales es:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>
          <strong>Nombre/Razón Social:</strong> [Tu Nombre Completo o Razón Social]
        </li>
        <li>
          <strong>Email de contacto:</strong> lisandroxarenax@gmail.com
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">1. ¿Qué datos recopilamos?</h2>
      <p className="mb-4">
        Recopilamos los datos que nos proporcionas directamente al realizar una
        reserva:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>Nombre completo</li>
        <li>Dirección de correo electrónico</li>
        <li>Número de teléfono</li>
        <li>Detalles de la cita (servicio, fecha, hora, precio)</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">2. ¿Con qué finalidad usamos tus datos?</h2>
      <p className="mb-4">
        Usamos tus datos para las siguientes finalidades, basadas en la
        ejecución del servicio que nos solicitas (Art. 6.1.b RGPD):
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>
          <strong>Gestión de reservas:</strong> Para procesar, confirmar y
          gestionar tu cita.
        </li>
        <li>
          <strong>Comunicaciones del servicio:</strong> Para enviarte
          confirmaciones, recordatorios y notificaciones de cancelación por email.
        </li>
        <li>
          <strong>Sincronización con el calendario del propietario:</strong> Para
          añadir y gestionar tu cita en el calendario de Google del
          propietario/administrador del salón.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">3. ¿Con quién compartimos tus datos?</h2>
      <p className="mb-4">
        Para prestar el servicio, compartimos datos con los siguientes
        proveedores (Encargados del Tratamiento), que garantizan la protección
        de tu información:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>
          <strong>Supabase:</strong> Proveedor de base de datos en la nube para
          almacenar de forma segura los datos de las reservas.
        </li>
        <li>
          <strong>Resend:</strong> Proveedor para el envío de correos
          electrónicos transaccionales.
        </li>
        <li>
          <strong>Google LLC:</strong> Para la integración con el servicio de
          Google Calendar.
        </li>
      </ul>
      <p className="mb-4">
        Algunos de estos proveedores están ubicados fuera del Espacio Económico
        Europeo, por lo que se realizan transferencias internacionales de datos
        bajo garantías adecuadas, como las Cláusulas Contractuales Tipo.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        4. Integración con la API de Google Calendar
      </h2>
      <p className="mb-4">
        Nuestra aplicación ofrece al **propietario/administrador del salón** la
        posibilidad de conectar su cuenta de Google para sincronizar las citas
        con su Google Calendar. Esta sección detalla el uso de dichos datos:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>
          <strong>Acceso a Datos:</strong> La aplicación solicita permiso para
          "ver y editar eventos" en el calendario del propietario.
        </li>
        <li>
          <strong>Finalidad del Acceso:</strong> El acceso se utiliza
          exclusivamente para crear un evento por cada nueva reserva, y para
          modificar o eliminar dicho evento si la cita se reprograma o cancela.
          Este acceso permite la gestión técnica de los eventos creados por
          nuestra propia aplicación.
        </li>
        <li>
          <strong>Datos No Utilizados:</strong> No leemos, almacenamos ni
          utilizamos ningún otro dato del calendario del propietario. No
          accedemos a calendarios de clientes finales ni a datos de su perfil de
          Google.
        </li>
      </ul>
      <p className="font-semibold mb-4">
        El uso y la transferencia de información recibida de las APIs de Google
        a cualquier otra aplicación se adherirá a la Política de Datos de
        Usuario de los Servicios API de Google, incluyendo los requisitos de Uso
        Limitado.
      </p>

      <h2 className="text-2xl font-semibold mb-4">5. Conservación y Seguridad de Datos</h2>
      <p className="mb-4">
        Conservaremos tus datos el tiempo necesario para cumplir con la
        finalidad para la que fueron recogidos y con las obligaciones legales.
        Aplicamos medidas de seguridad técnicas y organizativas para proteger
        tus datos.
      </p>

      <h2 className="text-2xl font-semibold mb-4">6. Tus Derechos</h2>
      <p className="mb-4">
        Puedes ejercer tus derechos de acceso, rectificación, supresión,
        limitación, portabilidad y oposición enviando un email a{" "}
        <strong>lisandroxarenax@gmail.com</strong>. También tienes derecho a
        presentar una reclamación ante la Agencia Española de Protección de
        Datos (AEPD).
      </p>

      <p className="text-sm text-gray-500 mt-8">
        Última actualización: 17 de julio de 2025
      </p>
    </div>
  );
}
