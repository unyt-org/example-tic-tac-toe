
import type { Entrypoint } from "uix/html/entrypoints.ts"
import { Game } from "../backend/Map.ts";
import { GamePage } from "common/components/GamePage.tsx";
import { Datex } from "unyt_core/datex.ts";
// TODO: import backend/Map.ts does not load backend exports (must be relative with ../)?
await Datex.Supranet.connectAnonymous();
export default {
	'/:id': async (_, {id}) => <GamePage game={await Game.get(id)}/>,
} satisfies Entrypoint;
