import { UIX } from "uix/uix.ts";
import { Game } from "backend/Map.ts";
import { GamePage } from "common/components/GamePage.tsx";

export default {
	'/': <GamePage game={await Game.get(Math.random().toString(36).slice(2, 6))}/>,
	'/:id': async (ctx) =>
		<GamePage game={await Game.get(ctx.urlMatch.get("id")!)}/>,
} satisfies UIX.Entrypoint;
