import { type UIX } from "uix/uix.ts";
import { Game } from "backend/Map.ts";
import { GamePage } from "common/components/GamePage.tsx";
import { Datex } from "unyt_core/datex.ts";

export default {
	'/': async () => {
		const id = Math.random().toString(36).slice(2, 6);
		await Datex.Supranet.connectAnonymous();
		return <GamePage game={await Game.get(id)}/>;
	},
	'/:id': async (ctx) => {
		const id = ctx.urlMatch.get("id")!;
		await Datex.Supranet.connectAnonymous();
		return <GamePage game={await Game.get(id)}/>;
	}
} satisfies UIX.Entrypoint;
