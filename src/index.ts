import type { Context, Next } from "hono";

export const createDepsMiddleware = <T extends object>(deps: T) => {
  return async (c: Context, next: Next) => {
    for (const [key, value] of Object.entries(deps)) {
      c.set(key, value);
    }

    await next();
  };
};
