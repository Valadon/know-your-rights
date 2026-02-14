export interface StateVariation {
  state: string;
  note: string;
}

export interface Right {
  title: string;
  description: string;
  source: string;
  stateVariations: StateVariation[];
}

export interface Scenario {
  id: string;
  title: string;
  icon: string;
  category: string;
  description: string;
  phrases?: string[];
  rights: Right[];
}

export interface RightsData {
  disclaimer: string;
  lastUpdated: string;
  scenarios: Scenario[];
}
