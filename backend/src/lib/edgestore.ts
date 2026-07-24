import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreExpressHandler } from "@edgestore/server/adapters/express";

// EdgeStore Router config
const es = initEdgeStore.create();
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket(),
});
export type EdgeStoreRouter = typeof edgeStoreRouter;
const handler = createEdgeStoreExpressHandler({
  router: edgeStoreRouter,
});

export { handler as edgeStoreHandler };
