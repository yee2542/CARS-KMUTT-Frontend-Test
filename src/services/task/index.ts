import moment, { Moment } from 'moment';
import adapter from '../adapter';
import taskDetailParse from './parser/task.detail.parse';
import taskLastParse from './parser/task.last.parse';
import { CreateTaskByStaff } from './task.create.interface';
import { Task, TaskDetail, TaskLastCard } from './task.interface';
import { QuickTask, QuickTaskAPI } from './task.quick.interface';

class TaskClass {
  async createSportTaskByStaff(data: CreateTaskByStaff): Promise<Task> {
    try {
      const res = (
        await adapter.instance.post('/task/sport/byStaff', { ...data })
      ).data;
      return res;
    } catch (err) {
      throw err;
    }
  }

  async getTaskById(id: string): Promise<TaskDetail | undefined> {
    try {
      const data = (await adapter.instance.get('/task/' + id)).data;
      console.log('get Task by Id', data);
      return taskDetailParse(data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async confirmTaskSportById(id: string): Promise<void> {
    try {
      await adapter.instance.get('/task/sport/' + id + '/confirm');
    } catch (err) {
      throw new Error(err);
    }
  }

  async cancleTaskById(id: string): Promise<void> {
    try {
      await adapter.instance.get('/task' + '/' + id + '/cancle');
    } catch (err) {
      throw new Error(err);
    }
  }

  async cancleTaskByStaff(_id: string, desc?: string): Promise<void> {
    try {
      await adapter.instance.post('/task/staff/cancle', {
        _id,
        desc,
      });
    } catch (err) {
      throw new Error(err);
    }
  }
  async acceptTaskByStaff(_id: string, desc?: string): Promise<void> {
    try {
      await adapter.instance.post('/task/staff/accept', {
        _id,
        desc,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async forwardTaskByStaff(_id: string, desc?: string): Promise<void> {
    try {
      await adapter.instance.post('/task/staff/forward', {
        _id,
        desc,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async rejectTaskByStaff(_id: string, desc?: string): Promise<void> {
    try {
      await adapter.instance.post('/task/staff/reject', {
        _id,
        desc,
      });
      return;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getLastTask(): Promise<TaskLastCard | undefined> {
    try {
      const data = (await adapter.instance.get('/task/last')).data;
      if (!data) return undefined;
      return taskLastParse(data);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  async getQuickTask(
    areaId: string,
    start: Moment,
    stop: Moment,
  ): Promise<QuickTask[]> {
    try {
      if (!areaId) [];
      const data: QuickTaskAPI[] = (
        await adapter.instance.get('/task/quickTask', {
          params: {
            id: areaId,
            start: start.toISOString(),
            stop: stop.toISOString(),
          },
        })
      ).data;
      return data.map(e => ({ ...e, date: moment(e.date) }));
    } catch (err) {
      throw err;
    }
  }
}

export const taskAPI = new TaskClass();
