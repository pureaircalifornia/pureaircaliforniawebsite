export const productionReleaseConfig: Readonly<{
  VITE_API_BASE_URL: string;
  VITE_GOOGLE_ADS_ID: string;
  VITE_GOOGLE_ADS_LEAD_LABEL: string;
}>;
export function assertProductionReleaseConfig(
  context: { command: string; mode: string },
  env: Record<string, unknown> | null | undefined,
): void;
