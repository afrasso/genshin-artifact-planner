import {
  ArtifactSet,
  ArtifactSetCriteria,
  ArtifactSlotCriteria,
  ArtifactSlotKey,
  ArtifactStatKey,
  Build,
} from "genshin-artifact-simulator";

export interface ArtifactSetCriteriaEntryData extends ArtifactSetCriteria {
  id: string;
  bonusSelectionDisabled: boolean;
}

export interface ArtifactSlot {
  key: ArtifactSlotKey;
  name: string;
}

export interface ArtifactSlotCriteriaEntryData extends ArtifactSlotCriteria {
  id: string;
  slot?: ArtifactSlot;
}

export interface ArtifactStat {
  key: ArtifactStatKey;
  name: string;
}

export interface ArtifactStatsForSlot {
  key: ArtifactSlotKey;
  mainStatKeys: ArtifactStatKey[];
}

export interface ArtifactSubstatMaxValue {
  key: ArtifactStatKey;
  maxValue: number;
}

export interface BuildEntryData extends Build {
  setsCriteria: ArtifactSetCriteriaEntryData[];
  slotsCriteria: ArtifactSlotCriteriaEntryData[];
}

export interface Character {
  key: string;
  name: string;
  rarity: number;
  element: ElementKey;
}

export enum ElementKey {
  anemo = "anemo",
  cryo = "cryo",
  electro = "electro",
  geo = "geo",
  hydro = "hydro",
  pyro = "pyro",
}

export interface StaticData {
  artifactSets: ArtifactSet[];
  artifactSlots: ArtifactSlot[];
  artifactStats: ArtifactStat[];
  artifactStatsBySlot: ArtifactStatsForSlot[];
  artifactSubstatMaxValues: ArtifactSubstatMaxValue[];
  characters: Character[];
}
