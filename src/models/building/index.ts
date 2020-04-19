import i from 'Models/axios.interface';
import { BuildingTableAPI, BuildingInfo } from './interface';

class BuildingAPI {
  async getBuildingInfo(id: string): Promise<BuildingInfo> {
    try {
      const data = (await i.instance.get('/building/' + id)).data;
      return data;
    } catch (err) {
      throw err;
    }
  }

  async getBuildingTable(): Promise<BuildingTableAPI[]> {
    try {
      const data = (await i.instance.get('/building/table')).data;
      return data;
    } catch (err) {
      throw err;
    }
  }
}

export const buildingAPI = new BuildingAPI();
