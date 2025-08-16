import Link from 'next/link';

interface SuccessPageProps {
  searchParams: {
    session_id?: string;
  };
}

export default function SuccessPage({ searchParams }: SuccessPageProps) {
      const sessionId = searchParams.session_id;


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 text-center">
      <div className="bg-white p-10 rounded-xl shadow-lg">
        <span className="text-6xl">🎉</span>
        <h1 className="text-3xl font-bold text-green-600 mt-4 mb-2">¡Pago Exitoso!</h1>
        <p className="text-gray-700 mb-6">
          Gracias por tu suscripción. Hemos recibido tu pago correctamente.
        </p>
        {sessionId && (
          <p className="text-sm text-gray-500 mb-6">
            ID de Sesión: {sessionId.substring(0, 15)}...
          </p>
        )}
        <Link
          href="https://lichu.org" 
          className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors"
        >
          Volver a la pagina
        </Link>
      </div>
    </div>
  );
}