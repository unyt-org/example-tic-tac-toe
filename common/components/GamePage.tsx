import { UIX } from "uix";
import { always } from 'unyt_core/functions.ts';
import { GameType } from "../../backend/Map.ts";
declare const DatexRuntime: any;

@UIX.template(function(this: GamePage) {
	const game = this.options.game;
	return <div>
		<b>Open in private tab</b>
		<i onclick={UIX.inDisplayContext(()=>{
			const url = new URL(`/${game.id}`, location.origin);
			navigator.clipboard.writeText(url.toString());
		})}>{new URL(`/${game.id}`, location.origin).toString()}</i>
		
		<span>
			{always(()=> game.turn === DatexRuntime.endpoint ?
				"Your turn" :
				"Other's turn"
			)}!
		</span>
		<div class="game" data-symbol={game.host === DatexRuntime.endpoint ?? false}>
			{
				always(() => {
					return Array.from(game.map.entries()).map(([key, val]) => <div 
						data-val={val}
						onclick={()=> this.set(key)}
						/>)
				})
				// map(game.map, ([key, val]) => (
				// 	<div 
				// 		data-val={val}
				// 		onclick={()=> this.set(key)}
				// 		/>
				// ))
			}
		</div>
		<div onclick={() => this.reset()} class="reset">Reset</div>
	</div>
})
export class GamePage extends UIX.BaseComponent<{game: GameType}> {

	@standalone
	private reset() {
		const game = this.options.game;
		game.map.forEach((tile, key, map) => tile !== '' && map.set(key, ''));
		game.turn = game.host;
	}

	@standalone
	private set(index: number) {
		const game = this.options.game;
		if (game.turn === DatexRuntime.endpoint) {
			const symbol = game.host === DatexRuntime.endpoint ? 'X' : 'O';
			if (game.map.get(index) === '') {
				game.map.set(index, symbol);
				const other = [...game.players].find(p => p != DatexRuntime.endpoint);
				game.turn = other;
			}
		} else
			alert("Oups, it is not your turn!")
	}

	@standalone
	private checkWinner(map: ('X' | 'O' | '')[]) {
		const combinations = [
			[0, 1, 2], [3, 4, 5], [6, 7, 8],	// Rows
			[0, 3, 6], [1, 4, 7], [2, 5, 8],	// Columns
			[0, 4, 8], [2, 4, 6]				// Diagonals
		];
		for (const combo of combinations) {
			const [a, b, c] = combo;
			if (map[a] !== '' && map[a] === map[b] && map[a] === map[c])
				return map[a] as 'X' | 'O'; 
		}
		return map.filter(e => e === '').length === 0 ? 'T' : null;
	}

	@standalone
	protected override onDisplay(): void | Promise<void> {
		const map = this.options.$.game.$.map;
		map.observe(()=>{
			const host = this.options.game.host === DatexRuntime.endpoint;
			const symbol = host ? 'X' : 'O';
			const winner = this.checkWinner([...map.val!.values()]);
			if (winner) {
				this.reset();
				if (winner === "T")
					alert("Tie!");
				else alert(symbol === winner ? "You won!" : "You loose!");
			}
		});
		console.log("Game pointer", this.options.game);
	}
}