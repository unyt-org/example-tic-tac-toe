import { always, map } from 'datex-core-legacy/functions.ts';
import { GameType } from "../../backend/Map.ts";
import { Datex } from "unyt_core/datex.ts";
import { Component } from "uix/components/Component.ts";

@template(function(this) {
	const game = this.options.game;
	return <div>
		<a href={`/${game.id}`} target="_blank">Open new tab</a>
		<span>
			{always(()=> game.turn === Datex.Runtime.endpoint ?
				"Your turn" :
				"Other's turn"
			)}!
		</span>
		<div class="game" data-symbol={game.host === Datex.Runtime.endpoint ?? false}>
			{map(game.map, ([key]) => 
				<div 
					data-val={$$(game.map, key)}
					onclick={() => this.set(key)}
				/>
			)}
		</div>
		<div onclick={() => this.reset()} class="reset">Reset</div>
	</div>
})
export class GamePage extends Component<{game: GameType}> {
	
	// Method to reset the game state
	private reset() {
		const game = this.options.game;
		game.map.forEach((tile, key, map) => tile !== '' && map.set(key, ''));
		game.turn = game.host;
	}

	// Gets called on click in cell
	private set(index: number) {
		const game = this.options.game;
		if (game.turn === Datex.Runtime.endpoint) {
			const symbol = game.host === Datex.Runtime.endpoint ? 'X' : 'O';
			if (game.map.get(index) === '') {
				game.map.set(index, symbol);
				const other = [...game.players].find(p => p != Datex.Runtime.endpoint);
				game.turn = other;
			}
		} else
			alert("Oups, it is not your turn!")
	}

	// Check winner X or O, T if tie or null if there is no winner
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

	private isRunning = false;
	protected override onDisplay() {
		const map = this.options.$.game.$.map;
		this.isRunning = true;

		// Observer gets called every time the game
		// state changed (you or the other player made a move)
		map.observe(()=>{
			if (this.isRunning) {
				const host = this.options.game.host === Datex.Runtime.endpoint;
				const symbol = host ? 'X' : 'O';
				const winner = this.checkWinner([...map.val!.values()]);
				if (winner) {
					this.isRunning = false;
					this.reset();
					setTimeout(()=>{
						if (winner === "T")
							alert("Tie!");
						else alert(symbol === winner ? "You won!" : "You lose!");
						this.isRunning = true;
					}, 300);
				}
			}
		});
		console.log("Game pointer", this.options.game);
	}
}
