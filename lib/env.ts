export type SupabasePublicEnv = {
  supabaseUrl: string;
  supabasePublishableKey: string;
};

type EnvSource = Record<string, string | undefined>;

function requireValue(source: EnvSource, key: string): string {
  const value = source[key]?.trim();

  if (!value) {
    throw new Error(`${key} is required`);
  }

  return value;
}

export function parseSupabasePublicEnv(source: EnvSource): SupabasePublicEnv {
  const supabaseUrl = requireValue(source, "NEXT_PUBLIC_SUPABASE_URL");
  const supabasePublishableKey = requireValue(source, "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(supabaseUrl);
  } catch {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL must be a valid https URL");
  }

  if (parsedUrl.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL must be a valid https URL");
  }

  return {
    supabaseUrl: parsedUrl.toString().replace(/\/$/, ""),
    supabasePublishableKey,
  };
}
