import { NextMiddleware, NextResponse } from 'next/server';

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

export const runMiddlewares = (
  middlewares: Array<MiddlewareFactory> = [],
  index = 0,
): NextMiddleware | undefined => {
  const current = middlewares[index];

  if (current) {
    const next = runMiddlewares(middlewares, index + 1);
    return next && current(next);
  }

  return () => NextResponse.next();
};
