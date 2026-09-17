export type PipelineStage = "New" | "Contacted" | "Qualified" | "Visit Scheduled" | "Negotiation" | "Won" | "Lost";

export type PipelineValueLead = {
  stage: PipelineStage;
  budget: number;
};

const CLOSED_STAGES: ReadonlySet<PipelineStage> = new Set(["Won", "Lost"]);

export function calculateOpenPipelineValue(leads: readonly PipelineValueLead[]): number {
  return leads
    .filter((lead) => !CLOSED_STAGES.has(lead.stage))
    .reduce((sum, lead) => sum + lead.budget, 0);
}
