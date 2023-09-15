import { UIX } from "uix/uix.ts";

// The frontend routes definition
export default {
	'/': null,
	'*': null // Letting the frontend handle all other routes
} satisfies UIX.Entrypoint;