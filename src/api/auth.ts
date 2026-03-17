import type { IncomingHttpHeaders } from "http";

/**
 * Read an API key from common header shapes.
 * - Accepts either headers.authorization or headers.Authorization
 * - Handles string or string[] header values
 * - Strips a leading "Bearer " if present
 * - Returns null when nothing usable is found
 */
export function getAPIKey(headers?: IncomingHttpHeaders | null): string | null {
  if (!headers) return null;

  // try common header keys
  const raw = (headers['authorization'] ?? headers['Authorization']) as
    | string
    | string[]
    | undefined;

  if (!raw) return null;

  // handle array case
  const first = Array.isArray(raw) ? raw[0] : raw;
  if (first == null) return null;

  const str = String(first).trim();
  if (str.length === 0) return null;

  // strip "Bearer " if present
  if (str.toLowerCase().startsWith('bearer ')) {
    return str.slice(7);
  }

  return str;
}
