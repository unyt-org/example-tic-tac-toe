// deno-lint-ignore-file require-await
import { Datex } from "unyt_core/datex.ts";

export type MapType = Map<number, 'X' | 'O' | ''>;
export type GameType = {
	id: string,
	host: Datex.Endpoint,
	turn?: Datex.Endpoint,
	map: MapType,
	players: Set<Datex.Endpoint>
}

// Expose this class as public endpoint property
@endpoint export class Game {
	static list = new Map<string, GameType>();

	@property static async get(id: string) {
		// get the endpoint that called this method
		const newPlayer = datex.meta?.sender!;

		// join existing game
		if (this.list.has(id)) {
			const game = this.list.get(id)!;
			// for (const player of game.players) {
			// 	if (!await player.isOnline())
			// 		game.players.delete(player);
			// }
			if (game.players.has(newPlayer) || (
				!game.players.has(newPlayer) &&
				game.players.size === 1
			)) {
				game.players.add(newPlayer);
				if (!game.turn)
					game.turn = newPlayer;
				return game;
			}
			throw new Error("Cannot join game!");
		}

		// create new game
		else {
			const map: MapType = $$(new Map());
			for (let i=0; i<9; i++)
				map.set(i, '');
			const game:GameType = $$({
				players: $$(new Set([newPlayer])),
				turn: newPlayer,
				host: newPlayer,
				map,
				id
			});
			this.list.set(id, game);
			return game;
		}
		
	}
}