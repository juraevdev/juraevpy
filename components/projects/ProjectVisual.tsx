import type { ProjectVisualKey } from "@/data/projects";
import { CaravanVisual } from "./visuals/CaravanVisual";
import { EmakonVisual } from "./visuals/EmakonVisual";
import { SuperAppVisual } from "./visuals/SuperAppVisual";
import type { VisualRatio } from "./visuals/VisualFrame";

type ProjectVisualProps = {
  kind: ProjectVisualKey;
  ratio?: VisualRatio;
};

/**
 * Case-study plates. Homepage entries use dedicated *Entry components.
 * Compact plates use `auto` height so content is not lost in empty aspect boxes.
 */
export function ProjectVisual({ kind }: ProjectVisualProps) {
  switch (kind) {
    case "tgai":
      return null;
    case "caravan":
      return <CaravanVisual ratio="auto" />;
    case "emakon":
      return <EmakonVisual ratio="auto" />;
    case "superapp":
      return <SuperAppVisual ratio="auto" />;
    default:
      return null;
  }
}
