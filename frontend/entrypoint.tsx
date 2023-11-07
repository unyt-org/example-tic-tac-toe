
import type { Entrypoint } from "uix/html/entrypoints.ts"
import { Game } from "../backend/Map.ts";
import { GamePage } from "common/components/GamePage.tsx";
import { Datex } from "unyt_core/datex.ts";
import { UIX } from "uix";

UIX.Theme.useThemes("uix-dark-plain");
UIX.Theme.setMode("dark");

// TODO: import backend/Map.ts does not load backend exports (must be relative with ../)?
await Datex.Supranet.connectAnonymous();
export default {
	'/:id': async (_, {id}) => <GamePage game={await Game.get(id)}/>,
} satisfies Entrypoint;
