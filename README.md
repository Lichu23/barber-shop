Sistema de Reservas Online - Chiky Peluquería

Un sistema moderno de reservas online para peluquerías y barberías, construido con Next.js, que ofrece una experiencia fluida para el cliente y una gestión eficiente para el propietario, incluyendo integración automática con Google Calendar y notificaciones por email.

🚀 Características Principales

Reservas de Citas: Clientes pueden reservar sin necesidad de iniciar sesión.

Gestión de Agenda Automatizada: Sincronización de citas con el Google Calendar del propietario.

Notificaciones por Email: Confirmaciones de reserva y recordatorios automáticos.

Cancelación de Citas: Clientes pueden cancelar reservas a través de un enlace seguro.

Configuración del Propietario: El propietario conecta su Google Calendar mediante una URL única y segura.

Cumplimiento GDPR: Banner de consentimiento de cookies y políticas legales (solo esenciales, sin marketing/analíticas).

🛠️ Tecnologías Utilizadas

Framework: Next.js (App Router, Server Actions)

Base de Datos: Supabase (PostgreSQL, RLS)

Frontend UI: React, Shadcn UI

Tipado: TypeScript

API de Calendario: Google Calendar API

Envío de Emails: Resend

🚀 Flujo de Funcionalidades (Visión General)

Este sistema orquesta la interacción entre el cliente, el propietario y los servicios externos para una gestión de reservas eficiente:



Conexión de Google Calendar (Propietario):

El propietario accede a una URL única para autorizar la aplicación con Google OAuth 2.0.

La aplicación guarda el refresh_token y el calendar_id del propietario en Supabase.

Creación de Reserva:

Un cliente completa el formulario de reserva.

Los datos se guardan en la tabla bookings de Supabase.

Se crea automáticamente un evento en el Google Calendar del propietario (usando sus credenciales guardadas).

Se envía un email de confirmación al cliente (con un enlace de cancelación).

Cancelación de Reserva:

El cliente utiliza un enlace seguro (con un cancellation_token) de su email de confirmación.

La aplicación elimina la reserva de Supabase y el evento correspondiente de Google Calendar.

Se envía un email de confirmación de cancelación.

Recordatorios:

Un sistema de cron job invoca una API interna que busca reservas próximas.

Por cada reserva encontrada, se envía un email de recordatorio al cliente.

🚀 Despliegue a Producción (Vercel)

El despliegue de la aplicación se realiza en Vercel, con una configuración robusta para asegurar la funcionalidad y el cumplimiento.



Hosting: Aplicación alojada en Vercel.

Dominio Personalizado: Configuración del dominio principal (ej., www.lichu.org) para apuntar a la aplicación en Vercel.

Emails: Configuración de un dominio/subdominio de envío de emails (ej., noreply@lichu.org) con Resend, incluyendo la autenticación DNS (MX, SPF, DKIM, DMARC).

Variables de Entorno: Todas las claves API y URLs de servicio se configuran de forma segura como variables de entorno en Vercel.

Cron Jobs: El sistema de recordatorios se programa mediante Vercel Cron Jobs.

⚖️ Cumplimiento RGPD (Esencial)

La aplicación cumple con el Reglamento General de Protección de Datos (RGPD) de la UE, centrándose en la privacidad del usuario sin recolección de datos para marketing o analíticas.



Políticas Legales: Dispone de una Política de Privacidad y unos Términos de Servicio públicos y accesibles (requeridos para la verificación de Google).

Consentimiento de Cookies:

Implementa un banner de consentimiento de cookies que gestiona el uso de solo cookies necesarias para el funcionamiento básico del sitio.

El contenido principal de la aplicación solo se muestra después de que el usuario ha aceptado el uso de estas cookies esenciales ("Cookie Wall").

No se recolectan datos de analíticas ni se usan cookies de marketing.



✅ Pruebas Post-Despliegue Finales en Producción

Realiza pruebas exhaustivas en tu dominio final para asegurar que todo funcione como se espera.

Dominio y SSL: Acceso HTTPS al dominio principal y subdominios.

Consentimiento de Cookies: Verifica que el banner aparezca al inicio (en incógnito) y que el contenido solo se muestre tras aceptar.

Proceso de Reserva: Completa una reserva, verifica Supabase, Google Calendar y email de confirmación.

Cancelación: Prueba la cancelación desde el email, verifica eliminación en Supabase y Google Calendar, y el email de cancelación.

Recordatorios: Si tienes un Cron Job configurado en Vercel para api/email/send-reminder, verifica que los recordatorios lleguen y se marquen en Supabase.
