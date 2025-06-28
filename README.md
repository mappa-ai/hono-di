# hono-di

Simple dependency injection for Hono.

## Usage

List your dependencies:

```ts
export interface MyRouterDependencies {
  myService: IService;
}
```

Call them in your router:

```ts
import { Hono } from "hono";

import type { MyRouterDeps } from "./myrouter.dependencies";

const myRouter = new Hono<{ Variables: MyRouterDeps }>();

pageRouter.get("/", (c) => {
  const myService = c.get("myService");

  // Do stuff...
});
```

Create a middleware to inject them:

```ts
import { createDepsMiddleware } from "@mappa/hono-di";
import type { MyRouterDependencies } from "./myrouter.dependencies";

const myService = new MyService();

// Type safe!
export const insertMyRouterDependencies =
  createDepsMiddleware<MyRouterDependencies>({
    myService,
  });
```

Use the middleware in your app:

```ts
import { Hono } from "hono";
import { insertMyRouterDependencies } from "./myrouter.middleware";
const app = new Hono();
app.use("/myrouter/*", insertMyRouterDependencies);
app.route("/myrouter", myRouter);
```
