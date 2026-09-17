export type PipelineStage = "New" | "Contacted" | "Qualified" | "Visit Scheduled" | "Negotiation" | "Won" | "Lost";

export type PipelineValueLead = {
  stage: PipelineStage;
  budget: number;
};

export function calculateOpenPipelineValue(leads: readonly PipelineValueLead[]): number {
  return leads
    .filter((lead) => lead.stage !== "Lost")
    .reduce((sum, lead) => sum + lead.budget, 0);
}
