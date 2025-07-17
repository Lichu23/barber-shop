'use client'; 

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import GoogleConnectButton from '@/components/GoogleConnectButton'

export default function SetupCalendarPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status'); 
  const details = searchParams.get('details'); 
  const ownerSecretKey = searchParams.get('key'); // <--- ¡AQUÍ RECUPERAMOS LA CLAVE DE LA URL!

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // ... tu lógica existente para los mensajes basada en 'status'
    if (status === 'google_connected_success') {
      setMessage('¡Conexión con Google Calendar exitosa! Tu calendario principal ha sido vinculado.');
      setIsError(false);
    } else if (status === 'auth_failed') {
      setMessage(`Fallo en la conexión de Google Calendar: ${decodeURIComponent(details || 'Error desconocido.')}. Por favor, inténtalo de nuevo.`);
      setIsError(true);
    } else if (status === 'no_refresh_token') {
      setMessage(`Fallo en la conexión: ${decodeURIComponent(details || 'No se pudo obtener el token de refresco.').replace('Error: ', '')}. Asegúrate de otorgar todos los permisos solicitados y que tu configuración de OAuth en Google Cloud Console sea correcta.`);
      setIsError(true);
    } else if (status === 'db_save_failed') {
      setMessage(`Fallo en la conexión: ${decodeURIComponent(details || 'Error al guardar la configuración en la base de datos.').replace('Error: ', '')}. Por favor, contacta al soporte técnico.`);
      setIsError(true);
    } else {
      setMessage('Haz clic en el botón para iniciar la conexión con Google Calendar.'); // Mensaje más claro
      setIsError(false);
    }
  }, [status, details]);

  // ... tu lógica existente para determinar el título, clases CSS e ícono (no necesita cambios aquí)
  let title = 'Estado de Conexión de Google Calendar';
  let textColorClass = 'text-gray-700';
  let bgColorClass = 'bg-white';
  let icon = null;

  switch (status) {
    case 'google_connected_success':
      title = '¡Conexión Exitosa!';
      textColorClass = 'text-green-700';
      bgColorClass = 'bg-green-50';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      break;
    case 'auth_failed':
      title = 'Error de Conexión';
      textColorClass = 'text-red-700';
      bgColorClass = 'bg-red-50';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      break;
    case 'no_refresh_token':
      title = 'Fallo al Obtener el Token';
      textColorClass = 'text-yellow-700';
      bgColorClass = 'bg-yellow-50';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
      break;
    case 'db_save_failed':
      title = 'Error de Base de Datos';
      textColorClass = 'text-red-700';
      bgColorClass = 'bg-red-50';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      break;
    default: // Caso cuando NO hay 'status' en la URL (primera carga)
      title = 'Conectar Google Calendar';
      textColorClass = 'text-gray-700';
      bgColorClass = 'bg-white';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
      break;
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${bgColorClass}`}>
      <div className={`max-w-md w-full p-8 rounded-lg shadow-lg text-center ${textColorClass} border border-gray-200`}>
        {icon}
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-lg mb-6">{message}</p>

        {(status === null || isError) && ownerSecretKey && ( 
          <GoogleConnectButton ownerSecretKey={ownerSecretKey} />
        )}
        
        {status === 'google_connected_success' && (
          <p className="mt-6 text-gray-600">
            Puedes cerrar esta ventana o ir a la configuración de tu panel de administración.
          </p>
        )}

        {status === null && !ownerSecretKey && (
          <p className="mt-6 text-red-500">
            Error: La URL no contiene la clave de configuración del propietario. Asegúrate de usar la URL completa proporcionada.
          </p>
        )}
      </div>
    </div>
  );
}