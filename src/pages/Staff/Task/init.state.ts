import moment from 'moment';
import { TaskDetail } from 'Services/task/task.interface';

export const initTask: TaskDetail = {
  _id: '',
  staff: [],
  requestor: [],
  reserve: [],
  state: [],
  area: {
    _id: '',
    name: '',
    label: '',
    type: '',
  },
  building: {
    _id: '',
    name: '',
    label: '',
    type: '',
  },
  cancle: false,
  desc: [],
  createAt: moment(),
  updateAt: moment(),
};
