import { describe, expect, it } from "vitest";
import { parseSupabasePublicEnv } from "../lib/env";

describe("parseSupabasePublicEnv", () => {
  it("rejects missing Supabase public configuration", () => {
    expect(() => parseSupabasePublicEnv({})).toThrow(/NEXT_PUBLIC_SUPABASE_URL/);
  });

  it("rejects an invalid Supabase project URL", () => {
    expect(() =>
      parseSupabasePublicEnv({
        NEXT_PUBLIC_SUPABASE_URL: "not-a-url",
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_example",
      }),
    ).toThrow(/valid https URL/i);
  });

  it("accepts a valid public Supabase configuration", () => {
    expect(
      parseSupabasePublicEnv({
        NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_example",
      }),
    ).toEqual({
      supabaseUrl: "https://example.supabase.co",
      supabasePublishableKey: "sb_publishable_example",
    });
  });
});
