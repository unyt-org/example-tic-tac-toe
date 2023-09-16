import { UIX } from "uix/uix.ts";
import { Game } from "backend/Map.ts";
import { GamePage } from "common/components/GamePage.tsx";

export default {
	'/:id': async (ctx) => <GamePage game={await Game.get(ctx.urlMatch.get("id"))}/>,
} satisfies UIX.Entrypoint;
