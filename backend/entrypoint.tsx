import { Path } from "uix/utils/path.ts";
import { UIX } from "uix/uix.ts";

// The backend routes definition
export default {
	// redirect to new game URL
	'/': () => Path.Route(`/${Math.random().toString(36).slice(2, 6)}`),
	// pass through to frontend entrypoint
	'*': null
} satisfies UIX.Entrypoint;