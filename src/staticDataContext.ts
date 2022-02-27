import { createContext } from "react";

import { StaticData } from "./types";

const staticData: StaticData = {
  artifactSets: [],
  artifactSlots: [],
  artifactStats: [],
  artifactStatsBySlot: [],
  artifactSubstatMaxValues: [],
  characters: [],
};
export const StaticDataContext = createContext<StaticData>(staticData);
export const StaticDataProvider = StaticDataContext.Provider;
