// Global Jest env defaults for local unit/integration runs.
// Values can still be overridden by real shell/.env env vars.
process.env.DATABASE_URL ??=
  'postgresql://postgres:postgres@localhost:5433/skill_trainer?schema=public';
process.env.JWT_ACCESS_SECRET ??= 'test-jwt-secret-change-me';
process.env.NODE_ENV ??= 'test';
