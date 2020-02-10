import Reserve, { ReserveType } from './interface';
import i from '../axios.interface';
import { TaskAPI } from './api.interface';
import stateDesc from '../task/helpers/state.desc';
import moment from 'moment';

class ReservedClass {
  //   data: Reserve[] | undefined;
  //   constructor() {
  //     this.data = undefined;
  //   }

  private parser(data: TaskAPI[]): ReserveType {
    const output = data.map(e => {
      const curState = e.state[e.state.length - 1];
      console.log('cur state', curState);
      return {
        name: e.area.label,
        reserve: {
          date: moment(e.reserve[0].start),
          start: moment(e.reserve[0].start),
          stop: moment(e.reserve[0].stop),
          state: {
            type: curState,
            desc: stateDesc(curState),
          },
        },
      };
    });
    return output;
  }

  query = async (type: 'history' | 'wait' | 'requested'): Promise<Reserve[]> => {
    if (type === 'history') {
      const res: TaskAPI[] = (await i.instance.get('/task/history')).data;
      const parsed = this.parser(res);
      console.log('res', res);
      console.log('after pased', parsed);
      return parsed;
    }
    return [];
  };
}

export const r = new ReservedClass();