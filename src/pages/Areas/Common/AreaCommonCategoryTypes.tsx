import sportTypeBuildingIcon from 'Assets/icons/area/building/basketball-ball.svg';
import activityTypeBuildingIcon from 'Assets/icons/area/building/kfc.svg';
import BackCard from 'Components/BackCard';
import KanbanCard from 'Components/KanbanCard/KanbanCard';
import KanBanLayout from 'Components/Layout/KanbanLayout';
import Menu from 'Models/kanbanCard/interface';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { setFormCurrentIndex } from 'Store/reducers/areaForm/actions';
import BackCardStyles from '../styles/backcard';

const AreaCommonCategoryTypesPage: React.FunctionComponent<{
  allowSport?: boolean;
  useRouter?: boolean;
  selected?: (type: 'activity' | 'sport') => void;
}> = props => {
  const location = useLocation();
  const history = useHistory();
  const areaId = location.pathname.split('/')[3];
  const dispatch = useDispatch();

  const menu: Menu[] = [
    {
      key: '1',
      label: [`จัดกิจกรรม`],
      icon: activityTypeBuildingIcon,
      link: `/reserve/common/${areaId}/activity/1`,
      callback: () => 'activity',
    },
  ];

  const { allowSport } = props;
  if (allowSport)
    menu.push({
      key: '2',
      label: [`แข่งขันกีฬา`],
      icon: sportTypeBuildingIcon,
      link: `/reserve/common/${areaId}/sport/1`,
      callback: () => 'sport',
    });

  const mappedMenu: Menu[] = menu
    .map(e => ({ ...e, style: 'center' }))
    .map(e => {
      if (props.useRouter === false) return { ...e, link: undefined };
      return e;
    });

  function callbackHelper(e: Menu) {
    !props.useRouter &&
      props.selected &&
      e.callback &&
      props.selected(e.callback());
  }

  useEffect(() => {
    // clear form index state
    dispatch(setFormCurrentIndex(0));
  }, []);

  return (
    <KanBanLayout title="จองพื้นที่ส่วนกลาง" outline="เลือกประเภทกิจกรรม">
      <div style={BackCardStyles}>
        {!props.useRouter && (
          <BackCard onClick={() => history.goBack()}>
            เลือกสถานที่
          </BackCard>
        )}
      </div>
      <KanbanCard menu={mappedMenu} callback={callbackHelper} />
    </KanBanLayout>
  );
};

export default React.memo(AreaCommonCategoryTypesPage);
