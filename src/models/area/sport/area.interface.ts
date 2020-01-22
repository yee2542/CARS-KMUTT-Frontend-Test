interface Reserve {
  interval: number | -1 | 60;
  max: number;
  start?: Date;
  stop?: Date;
  allDay: boolean;
  week: string | '1-7' | '1,2,3';
}

export interface Area {
  _id: string;
  name: string;
  label?: string;
  building?: string;
  required: {
    form?: string;
    staff?: string[];
    requestor: number;
  };
  reserve: Reserve[];
  createAt: Date;
  updateAt: Date;
}
