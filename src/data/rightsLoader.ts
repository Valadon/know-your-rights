import { RightsData, Scenario } from '@/types';
import rightsData from './rights-data.json';

export const getAllScenarios = (): Scenario[] => {
  return (rightsData as RightsData).scenarios;
};

export const getScenarioById = (id: string): Scenario | undefined => {
  return (rightsData as RightsData).scenarios.find((s) => s.id === id);
};

export const getDisclaimer = (): string => {
  return (rightsData as RightsData).disclaimer;
};

export const getLastUpdated = (): string => {
  return (rightsData as RightsData).lastUpdated;
};

export const getAllStates = (): string[] => {
  const statesSet = new Set<string>();
  (rightsData as RightsData).scenarios.forEach((scenario) => {
    scenario.rights.forEach((right) => {
      right.stateVariations.forEach((variation) => {
        statesSet.add(variation.state);
      });
    });
  });
  return Array.from(statesSet).sort();
};
