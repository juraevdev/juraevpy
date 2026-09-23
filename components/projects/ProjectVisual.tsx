"use client";

import type { ProjectVisualKey } from "@/data/projects";
import { TgaiVisual } from "./visuals/TgaiVisual";
import { CaravanVisual } from "./visuals/CaravanVisual";
import { EmakonVisual } from "./visuals/EmakonVisual";
import { SuperAppVisual } from "./visuals/SuperAppVisual";
import type { VisualRatio } from "./visuals/VisualFrame";

type ProjectVisualProps = {
  kind: ProjectVisualKey;
  ratio?: VisualRatio;
};

/** Maps a project to its abstract interface mockup. */
export function ProjectVisual({ kind, ratio }: ProjectVisualProps) {
  switch (kind) {
    case "tgai":
      return <TgaiVisual ratio={ratio} />;
    case "caravan":
      return <CaravanVisual ratio={ratio} />;
    case "emakon":
      return <EmakonVisual ratio={ratio} />;
    case "superapp":
      return <SuperAppVisual ratio={ratio} />;
  }
}
