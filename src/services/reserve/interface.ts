import { Moment } from 'moment';
import { TaskStateType } from 'Services/task/task.interface';

export type ReserveState = TaskStateType;
export type ReserveStateHistory = Array<ReserveState>;
export type ReserveStateDesc =
  | 'ได้รับการอนุมัติ'
  | 'ไม่ได้รับการอนุมัติ'
  | 'รอการยืนยันจากเพื่อน'
  | string;

export default interface Reserve {
  _id: string;
  name?: string;
  desc?: string;
  reserve?: {
    date?: Moment;
    start?: Moment;
    stop?: Moment;
    detail?: string;
    state?: {
      type?: ReserveState;
      desc?: ReserveStateDesc;
    };
  };
  createAt: Moment;
}

export type ReserveType = Reserve[];
