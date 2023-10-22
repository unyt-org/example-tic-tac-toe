import { provideValueDebugView } from "uix/html/entrypoint-providers.tsx";
import { Entrypoint } from "uix/html/entrypoints.ts";
import { Path } from "uix/utils/path.ts";

// The backend routes definition
export default {
	// redirect to new game URL
	'/': () => Path.Route(`/${Math.random().toString(36).slice(2, 6)}`),
	'/test': async ctx => {
		const data = await ctx.getSharedData()
		return provideValueDebugView(data)
	},
	// pass through to frontend entrypoint
	'*': null
} satisfies Entrypoint;