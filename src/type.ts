export interface AlgoliaResult {
  content?: any;
  hierarchy: Hierarchy;
  type: keyof Hierarchy | "content";
  url: string;
  tags: string[];
}

interface HighlightResult {
  hierarchy: Hierarchy3;
  hierarchy_camel: Hierarchy3[];
}

interface Hierarchy3 {
  lvl0: Lvl0;
  lvl1: Lvl12;
}

interface Lvl12 {
  value: string;
  matchLevel: string;
  fullyHighlighted: boolean;
  matchedWords: string[];
}

interface Lvl0 {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

interface SnippetResult {
  hierarchy: Hierarchy2;
}

interface Hierarchy2 {
  lvl1: Lvl1;
}

interface Lvl1 {
  value: string;
  matchLevel: string;
}

interface Hierarchy {
  lvl0: string;
  lvl1: string;
  lvl2?: string;
  lvl3?: string;
  lvl4?: string;
  lvl5?: string;
  lvl6?: string;
}
