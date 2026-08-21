export interface Designation {
  id: number;
  name: string;
  description: string | null;
  isActive: boolean;
  createdOn: string;
  modifiedOn: string | null;
}