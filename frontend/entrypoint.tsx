import { type UIX } from "uix/uix.ts";
import { Game } from "backend/Map.ts";
import { GamePage } from "common/components/GamePage.tsx";
import { Datex } from "unyt_core/datex.ts";
await Datex.Supranet.connectAnonymous();
export default {
	'/:id': async (ctx) => <GamePage game={await Game.get(ctx.urlMatch.get("id"))}/>,
} satisfies UIX.Entrypoint;
