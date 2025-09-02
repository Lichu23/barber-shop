<h1>🌟 Sistema de Reservas Online - Multi-Tenant</h1>
Un sistema moderno de reservas para peluquerías y barberías, construido con Next.js, ahora con multi-tenant, donde cada negocio tiene su dashboard privado con estadísticas y gráficos de reservas y ganancias mensuales.

🚀 Características Destacadas
Funcionalidad	Descripción
Reservas de Citas	Clientes reservan sin registrarse.
Gestión de Agenda	Sincronización automática con Google Calendar del propietario.
Notificaciones Email	Confirmaciones y recordatorios automáticos.
Cancelación Segura	Enlace seguro de cancelación vía email.
Dashboard del Tenant	📊 Reservas por mes, ganancias, gráficos de barras.
Configuración Propietario	Conexión segura a Google Calendar mediante OAuth.
Cumplimiento GDPR	Cookies esenciales, privacidad y políticas legales.
🛠️ Tecnologías Clave

<ul>
 <li>Frontend: React + Shadcn UI </li>

<li>Backend / DB: Next.js + Supabase (PostgreSQL + RLS) </li>

<li>Email: Resend</li>

<li>Calendario: Google Calendar API</li>

<li>Tipado: TypeScript</li>
</ul>

🔄 Flujo Multi-Tenant

Conexión Google Calendar
Cada propietario autoriza su calendar con OAuth, guardando tokens por tenant.

| Funcionalidad                 | Descripción                                                    |
| ----------------------------- | -------------------------------------------------------------- |
| **Reservas de Citas**         | Clientes reservan sin registrarse.                             |
| **Gestión de Agenda**         | Sincronización automática con Google Calendar del propietario. |
| **Notificaciones Email**      | Confirmaciones y recordatorios automáticos.                    |
| **Cancelación Segura**        | Enlace seguro de cancelación vía email.                        |
| **Dashboard del Tenant**      | 📊 Reservas por mes, ganancias, gráficos de barras.            |
| **Configuración Propietario** | Conexión segura a Google Calendar mediante OAuth.              |
| **Cumplimiento GDPR**         | Cookies esenciales, privacidad y políticas legales.            |
🌐 Despliegue en Vercel

Dominio principal y subdominios con HTTPS.

Configuración de emails (noreply@lichu.org
) con autenticación DNS.

Variables de entorno para todas las API y URLs.

Cron jobs para recordatorios y sincronización.

⚖️ Cumplimiento RGPD

Banner de cookies (solo esenciales).

Contenido visible tras aceptación ("Cookie Wall").

Sin recopilación de datos para marketing o analíticas.

✅ Checklist Post-Despliegue

 Reservas completas y sincronizadas con Supabase y Google Calendar

 Cancelaciones correctas con emails de confirmación

 Recordatorios funcionando vía Cron Jobs

 Dashboard multi-tenant mostrando reservas, ganancias y gráficos

 Banner de cookies y cumplimiento GDPR
