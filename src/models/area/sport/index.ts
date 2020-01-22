import { footballIcon, badmintonIcon, basketballIcon, tennisIcon, volleyballIcon } from './icon.import';
import Menu from '../../menu/interface';
import i from '../../axios.interface';
import { FetchMenu } from './fetch.interface';

const category: Menu[] = [
  {
    key: '1',
    label: ['ฟุตบอล', 'football'],
    icon: footballIcon,
    link: '/reserve/sport/1',
    state: {
      label: ['ฟุตบอล', 'football'],
    },
    query: { name: 'football' },
  },
  {
    key: '2',
    label: ['แบดมินตัน', 'badminton'],
    icon: badmintonIcon,
    link: '/reserve/sport/1',
    state: {
      label: ['แบดมินตัน', 'badminton'],
    },
    query: { name: 'badminton' },
  },
  {
    key: '3',
    label: ['บาสเก็ตบอล', 'basketball'],
    icon: basketballIcon,
  },
  {
    key: '4',
    label: ['เทนนิส', 'tennis'],
    icon: tennisIcon,
  },
  {
    key: '5',
    label: ['วอลเลย์บอล', 'volleyball'],
    icon: volleyballIcon,
  },
];

class QueryClass {
  data: Menu[];
  constructor() {
    this.data = [];
  }

  async all(): Promise<Menu[]> {
    const fetch: FetchMenu[] = (await i.instance.get('/area/sport/all')).data;
    const mainMenu = category
      .map(e => {
        const fetchIndex = fetch.findIndex(d => d.name === e.query?.name);
        if (fetchIndex < 0) return e;
        return {
          ...e,
          query: {
            ...e.query,
            _id: fetch[fetchIndex]._id,
          },
        };
      })
      .filter(e => e.query?._id);
    return mainMenu;
  }
}
const Query = new QueryClass();

export { category, Query };
