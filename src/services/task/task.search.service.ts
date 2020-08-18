import adapter from 'Services/adapter.interface';
import { TaskTableTypeAPI } from 'Services/taskTable/interface';

export interface TaskSearchDto {
  s: string;
  vid?: string;
  areaName?: string;
  requestorName?: string;
  date?: string;
}

class TaskSearchService {
  async search(query: TaskSearchDto): Promise<TaskTableTypeAPI> {
    try {
      const res = await adapter.instance.get('/task/search', {
        params: { ...query },
      });
      return res.data;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}

export const taskSearchService = new TaskSearchService();