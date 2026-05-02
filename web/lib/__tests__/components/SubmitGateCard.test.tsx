import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import SubmitGateCard from "../../../components/submit/submit-gate-card";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("SubmitGateCard", () => {
  it("navigates to the target section when a step is clicked", () => {
    const onNavigateStep = vi.fn();

    render(
      <SubmitGateCard
        t={(key, values) => values ? `${key}(${JSON.stringify(values)})` : key}
        basicInfoDone={false}
        abilitiesSelected={true}
        skillSaved={true}
        diagramDone={true}
        name="Demo"
        summary="Demo summary"
        repoUrl="https://github.com/example/demo"
        iconEmoji="🦐"
        skillMdContent="---\nname: Demo\ndescription: Demo\n---\n# Demo"
        diagramMermaid="flowchart LR\nA-->B"
        validationResult={{ ok: true, errors: [], warnings: [] }}
        onNavigateStep={onNavigateStep}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /workflow_step0/ }));

    expect(onNavigateStep).toHaveBeenCalledWith("submit-basic-info");
  });
});
