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

	@property static async get(id: string): Promise<GameType> {
		const me = datex.meta?.sender!;

		if (this.list.has(id)) {
			const game = this.list.get(id)!;
			if (game.players.has(me) || (
				!game.players.has(me) &&
				game.players.size === 1
			)) {
				game.players.add(me);
				if (!game.turn)
					game.turn = me;
				return game;
			}
			throw new Error("Can not join game!");
		}

		const map: MapType = $$(new Map());
		for (let i=0; i<9; i++)
			map.set(i, '');
		const game = $$({
			players: $$(new Set([me])),
			turn: me,
			host: me,
			map,
			id
		});
		this.list.set(id, game);
		return game;
	}
}