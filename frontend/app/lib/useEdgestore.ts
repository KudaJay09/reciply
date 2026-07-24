// You can import it from the other project if it's just the type
import type { EdgeStoreRouter } from "../../../backend/src/lib/edgestore";
import { createEdgeStoreProvider } from "@edgestore/react";

const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>();

export { EdgeStoreProvider, useEdgeStore };
