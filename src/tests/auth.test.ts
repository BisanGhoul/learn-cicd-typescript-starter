import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth";
import type { IncomingHttpHeaders } from "http";

describe("getAPIKey function", () => {
  test("returns the authorization string when provided", () => {
    const headers: IncomingHttpHeaders = { authorization: "my-secret-key" };
    const key = getAPIKey(headers);
    expect(key).toBe("my-secret-key");
  });

  test("returns null when headers has no authorization", () => {
    const headers: IncomingHttpHeaders = {};
    const key = getAPIKey(headers);
    expect(key).toBeNull();
  });
});
