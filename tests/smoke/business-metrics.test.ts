import { describe, expect, it } from "vitest";
import { calculateOpenPipelineValue } from "../../lib/crm/metrics";

describe("calculateOpenPipelineValue", () => {
  it("excludes both Won and Lost leads from open pipeline value", () => {
    const value = calculateOpenPipelineValue([
      { stage: "New", budget: 1_000_000 },
      { stage: "Negotiation", budget: 2_000_000 },
      { stage: "Won", budget: 5_000_000 },
      { stage: "Lost", budget: 7_000_000 },
    ]);

    expect(value).toBe(3_000_000);
  });
});
