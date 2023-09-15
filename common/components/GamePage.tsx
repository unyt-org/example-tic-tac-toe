import { UIX } from "uix";
import { always } from 'unyt_core/functions.ts';
import { GameType } from "../../backend/Map.ts";
declare const DatexRuntime: any;

@UIX.template(function(this: GamePage) {
	const game = this.options.game;
	return <div>
		<a onclick={UIX.inDisplayContext(()=>{
			window.open(new URL(`/${game.id}`, location.origin), game.id,"menubar=1,resizable=1,width=500,height=500");
		})}>{new URL(`/${game.id}`, location.origin).toString()}</a>
		
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
	protected override onDisplay(): void | Promise<void> {
		console.log("Game pointer", this.options.game)
	}
}