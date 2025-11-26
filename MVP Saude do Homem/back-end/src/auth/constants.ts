export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'VIDA_PLUS_SECRET',
  expiresIn: 3600, // seconds
};