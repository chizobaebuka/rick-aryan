export interface Chemical {
  id: string;
  name: string;
  casNumber: string;
  formula: string;
  category: string;
  grade: string;
  description?: string | null;
  viscosity?: string | null;
  purity?: string | null;
  freezingPoint?: string | null;
}
