import { Drawer } from 'Models/drawer/interface';
import {
  acceptDocs,
  allAreaIcon,
  allDocs,
  calendarIcon,
  dropDocs,
  forwardDocs,
  rejectDocs,
  waitingDocs,
} from './icon.import';

const menu: Drawer[] = [
  {
    key: '0',
    label: ['ตารางการจอง'],
    icon: calendarIcon,
    link: '/staff/calendar',
  },
  {
    key: '1',
    label: ['พื้นที่ทั้งหมด'],
    icon: allAreaIcon,
    link: '/staff/areas',
  },
  {
    key: '2',
    label: ['รายการทั้งหมด'],
    icon: allDocs,
    link: '/staff',
    sub: [
      {
        key: '1',
        label: ['รอดำเนินการ'],
        icon: waitingDocs,
        link: '/staff/wait',
      },
      {
        key: '2',
        label: ['ตีกลับ'],
        icon: rejectDocs,
        link: '/staff/reject',
      },
      {
        key: '3',
        label: ['อนุมัติ'],
        icon: acceptDocs,
        link: '/staff/accept',
      },
      {
        key: '4',
        label: ['ไม่อนุมัติ'],
        icon: dropDocs,
        link: '/staff/drop',
      },
      {
        key: '5',
        label: ['ส่งต่อ'],
        icon: forwardDocs,
        link: '/staff/forward',
      },
    ],
  },
];

export default menu;
