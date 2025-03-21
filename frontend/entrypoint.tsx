import { type Entrypoint } from "uix/providers/entrypoints.ts";
import { Game } from "backend/Map.ts";
import { GamePage } from "common/components/GamePage.tsx";
import { Datex } from "datex-core-legacy/datex.ts";
import { UIX } from "uix";
import { Path } from "uix/utils/path.ts";

UIX.Theme.useThemes("uix-dark-plain");
UIX.Theme.setMode("dark");

await Datex.Supranet.connectAnonymous();
export default {
  // redirect to random route
  "/": () => Path.Route(`/${Math.random().toString(36).slice(2, 6)}`),

  // handle game route
  "/:id": async (_, { id }) => <GamePage game={await Game.get(id)} />,
} satisfies Entrypoint;
