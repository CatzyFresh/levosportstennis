# Levo Sports Academy Manager

Production-oriented Next.js application for managing tennis academy attendance, inventory, player performance, tournaments, and role-specific portals.

## Setup

```bash
npm install
npm run dev
```

## Included modules

- Authentication-ready role model (Super Admin/Admin/Head Coach/Coach/Store Manager/Player/Parent)
- Attendance management + quick marking + WhatsApp text generator
- Player and coach management
- Inventory + transaction + low-stock pages
- Performance review tracking + progress screen
- Tournament list/create/detail and player history support
- Admin settings and reset tooling
- Player and parent portal views

## Architecture decisions

- **UI:** Next.js App Router + Tailwind
- **State:** Centralized Zustand store with persist middleware
- **Validation pattern:** Form-level required checks + typed entities in `types/models.ts`
- **Reporting:** Reusable report utility in `lib/report.ts`
- **RBAC foundation:** Role-permission policy map in `store/useAppStore.ts`
- **Production DB target:** Prisma + PostgreSQL blueprint in `prisma/schema.prisma`

## Environment

Copy `.env.example` to `.env.local` and update secrets.

## Seed data

Seeded tennis-academy-like data is in `data/seed.ts` and loaded automatically in first run.

## Deployment (Vercel)

1. Push repository to GitHub.
2. Import project in Vercel.
3. Set environment variables from `.env.example`.
4. Build command: `npm run build`.
5. Output: Next.js default.

## Migration steps for production DB

1. Expand `prisma/schema.prisma` with complete relations.
2. Run `npx prisma migrate dev` locally.
3. Run `npx prisma db seed`.
4. Deploy migrations in CI before promoting release.

## Next-phase enhancements

- Payments/fees
- Court booking
- Equipment issue tracking
- Announcements center
- Coach payroll
- Notification system (email/WhatsApp)
- Mobile app (React Native)

## Admin authentication

- Middleware now protects all app routes except `/login` and `/forgot-password`.
- Only Admin / Super Admin credentials can create an authenticated session.
- Demo credentials:
  - `admin@levo.app` / `Admin@123`
  - `superadmin@levo.app` / `Admin@123`

## Admin management controls

Admins can now:
- Edit coach names and coach roles
- Delete coaches
- Edit player names and player levels
- Delete players
