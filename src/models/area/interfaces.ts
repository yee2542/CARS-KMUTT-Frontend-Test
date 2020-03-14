export type AreaBuildingType = 'sport' | 'area' | 'meeting';

export interface AreaTableAPI {
  _id: string;
  key: string;
  name: string;
  label: string;
  building: {
    name: string;
    label: string;
  };
  type: AreaBuildingType;
}