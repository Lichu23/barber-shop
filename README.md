🌟 Sistema de Reservas Online - Multi-Tenant

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

Frontend: React + Shadcn UI

Backend / DB: Next.js + Supabase (PostgreSQL + RLS)

Email: Resend

Calendario: Google Calendar API

Tipado: TypeScript

🔄 Flujo Multi-Tenant

Conexión Google Calendar
Cada propietario autoriza su calendar con OAuth, guardando tokens por tenant.

Reserva de Cliente

Datos guardados en Supabase por tenant.

Evento creado en Google Calendar del propietario.

Email de confirmación con enlace de cancelación.

Cancelación

Uso de cancellation_token.

Supabase y Google Calendar actualizados automáticamente.

Email de confirmación enviado.

Recordatorios Automáticos
Cron job envía recordatorios a clientes según proximidad de la reserva.

Dashboard del Tenant

Visualiza reservas mensuales y ganancias.

Gráfico de barras con ingresos por mes.

Todo segmentado y seguro por tenant.

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
