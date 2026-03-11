import ClientCard from "./ClientCard";

export default function ClientsSection() {
  const tenantsSites = [
    {
      title: "Lichubarber",
      description:
        "Barbería que eliminó las colas y optimizó su agenda. Los clientes reservan su corte favorito con su barbero preferido desde cualquier dispositivo.",
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
    <section className="py-24 px-4 bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
            Clientes
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mt-3">
            Negocios que ya confían en nosotros
          </h2>
          <p className="text-zinc-400 mt-4 text-lg">
            Gestionamos las reservas de{" "}
            <span className="text-white font-bold">+5 peluquerías</span> en España.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-center lg:items-stretch">
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
    </section>
  );
}
