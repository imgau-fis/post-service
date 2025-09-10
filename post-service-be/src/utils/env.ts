export const ENV = {
  PORT: Number(process.env.PORT ?? 8081),
  ALLOW_ORIGINS: (process.env.ALLOW_ORIGINS ?? 'http://localhost:8081').split(',').map(s=>s.trim())
};