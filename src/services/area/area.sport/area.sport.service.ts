import Menu from 'Models/kanbanCard/interface';
import moment, { Moment } from 'moment';
import adapter from '../../adapter';
import { AreaSportResponseAPI } from '../@interfaces/area.sport.api.interface';
import { FetchMenu } from '../@interfaces/fetch.menu.interface';
import areaSportCategory from './constant';

class SportAreaService {
  async getAreas(): Promise<Menu[]> {
    const fetch: FetchMenu[] = (
      await adapter.instance.get('/area/sport/building/all')
    ).data;
    const mainMenu = areaSportCategory
      .map(e => {
        const fetchIndex = fetch.findIndex(d => d.name === e.query?.name);
        if (fetchIndex < 0) return e;
        const typeId = fetch[fetchIndex]._id;
        return {
          ...e,
          link: `/reserve/sport/${typeId}/1`,
          query: {
            ...e.query,
            _id: typeId,
          },
        };
      })
      .filter(e => e.query?._id);
    return mainMenu;
  }

  async getFields(id: string, date: Moment) {
    try {
      const fetch: AreaSportResponseAPI[] = (
        await adapter.instance.get(
          `/area/sport/fields/${id}/${date.toISOString()}`,
        )
      ).data;

      const newMapped: Array<{
        area: {
          id: string;
          label: string;
          required: number;
        };
        time: {
          start: Moment;
          stop: Moment;
          disabled: Array<{ value: Moment }>;
          interval: number;
          week: string;
          forward: number;
        };
      }> = [];
      fetch.forEach(area => {
        area.reserve?.forEach(reserve => {
          newMapped.push({
            area: {
              id: area._id || '',
              label: area.label || '',
              required: (area.required && area.required.requestor) || 0,
            },
            time: {
              start: moment(reserve && reserve.start),
              stop: moment(reserve && reserve.stop),
              disabled: area.disabled
                ? area.disabled.map((e: string) => ({ value: moment(e) }))
                : [],
              interval: reserve && reserve.interval,
              week: reserve && reserve.week,
              forward: area.forward || 0,
            },
          });
        });
      });

      return newMapped;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}
const areaSportService = new SportAreaService();

export { areaSportCategory, areaSportService };
