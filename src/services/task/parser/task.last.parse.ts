import moment from 'moment';
import stateDesc from '../helpers/state.desc';
import { TaskLastCard, TaskLastCardAPI } from '../task.interface';

export default (data: TaskLastCardAPI): TaskLastCard => ({
  ...data,
  reserve:
    data.reserve &&
    data.reserve.map((e: any) => ({
      ...e,
      start: moment(e.start),
      stop: moment(e.stop),
    })),
  createAt: moment(data.createAt),
  updateAt: moment(data.updateAt),
  desc: stateDesc(data.state[data.state.length - 1]),
});
