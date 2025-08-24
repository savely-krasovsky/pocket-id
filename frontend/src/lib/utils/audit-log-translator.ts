import { m } from '$lib/paraglide/messages';

/**
 * Translates an audit log event type using paraglide messages.
 * Falls back to a formatted string if no specific translation is found.
 * @param event The event type string from the backend (e.g., "CLIENT_AUTHORIZATION").
 * @returns The translated string.
 */
export function translateAuditLogEvent(event: string): string {
	// Convert the event string from the backend (e.g., "CLIENT_AUTHORIZATION")
	// to the corresponding paraglide message key format (e.g., "client_authorization").
	const messageKey = event.toLowerCase();

	// Check if a function with that key exists on the `m` object.
	// We cast `m` to `any` to allow for dynamic access with a string key.
	if (messageKey in m && typeof (m as any)[messageKey] === 'function') {
		// If it exists, call it to get the translated string.
		return (m as any)[messageKey]();
	}

	// If no specific translation is found, provide a readable fallback.
	// This converts "SOME_EVENT" to "Some Event".
	const words = event.split('_');
	const capitalizedWords = words.map((word) => {
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	});
	return capitalizedWords.join(' ');
}
