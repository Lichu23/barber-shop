import ClientCard from "./ClientCard";

export default function ClientsSection() {
  const tenantsSites = [
    {
      title: "Lichubarber",
      description:
        "Barbería que eliminó las colas y optimizó su agenda. Los clientes reservan su corte favorito con su barbero preferido desde cualquier dispositivo",
      imageUrl:
        "https://bitepoelegzdcmuezstw.supabase.co/storage/v1/object/public/salon-assets/chiky-peluqueria/lichubarber-image.webp",

      rating: "5.0",
    },
    {
      title: "Chikypeluqueria",
      description:
        "Peluquería que dijo adiós a las esperas y optimizó su agenda. Sus clientes ahora reservan su servicio favorito con su estilista de confianza desde cualquier dispositivo.",
      imageUrl:
        "https://bitepoelegzdcmuezstw.supabase.co/storage/v1/object/public/salon-assets/chiky-peluqueria/hero/hero-chiky-compressed.webp",
      rating: "4.5",
    },

    {
      title: "Barberia El Leon",
      description:
        "La barbería que le puso fin a las colas y modernizó su organización. Ahora sus clientes agendan el corte que desean con su barbero preferido de forma rápida y desde cualquier lugar.",
      imageUrl:
        "https://bitepoelegzdcmuezstw.supabase.co/storage/v1/object/public/salon-assets/chiky-peluqueria/barberia-el-leon.webp",
      rating: "4.4",
    },
  ];
  return (
    <div className="flex flex-col lg:justify-center items-center mx-auto h-full lg:h-dvh px-8  gap-8 py-10 bg-gradient-to-b from-sky-100 to-white">
      <h2 className="text-2xl lg:text-4xl font-semibold text-blue-900">
        Nuestros Clientes
      </h2>
      <p className="text-blue-900">Gestionamos las reservas de <span className="font-bold">+5</span> peluquerias</p>
      <div className="flex flex-col gap-5 lg:flex-row">
        {tenantsSites.map((tenant) => (
          <ClientCard
            key={tenant.title}
            title={tenant.title}
            description={tenant.description}
            imageUrl={tenant.imageUrl}
            rating={tenant.rating}
          />
        ))}
      </div>
    </div>
  );
}
