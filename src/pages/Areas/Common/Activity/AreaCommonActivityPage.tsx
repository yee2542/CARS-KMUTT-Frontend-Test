import { Col, Icon, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import Loadable from 'react-loadable';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router';
import { areaService } from 'Services/area/area.service';
// store / data
import { taskFormAPI } from 'Services/task/form';
import { RootReducersType } from 'Store/reducers';
import {
  initForm,
  setAreaInfoForm,
} from 'Store/reducers/areaForm/actions';
import { AreaFormReducer } from 'Store/reducers/areaForm/types';
// forms
import {
  FacilityForm,
  OverviewCommonForm,
  ProjectForm,
  RequestorForm,
} from '../../../../components/Forms/Common';
// assets
import sharedStyles from '../common/styles/styles.module.css';
import WhiteSpace from '../common/WhiteSpace';
import stepsList from './steps';

const StateSteps = Loadable({
  loader: () => import('Components/StateSteps'),
  loading: () => null,
});
const Badge = Loadable({
  loader: () => import('Components/Badge'),
  loading: () => null,
});
const PageLayout = Loadable({
  loader: () => import('Components/Layout/Page/PageLayout'),
  loading: () => null,
});
const BackCard = Loadable({
  loader: () => import('Components/BackCard'),
  loading: () => null,
});
const Outline = Loadable({
  loader: () => import('Components/Outline'),
  loading: () => null,
});
const ConfirmModal = Loadable({
  loader: () => import('Components/AcceptedModal'),
  loading: () => null,
});

// constant
const MAX_STEPS = 3;

const AreaCommonActivityPage: React.FC<{
  noInit?: boolean;
  editMode?: boolean;
  useModal?: boolean;
  onSend?: (forms: AreaFormReducer) => void;
}> = props => {
  const forms = useSelector((s: RootReducersType) => s.AreaFormReducers);
  const steps = forms.step;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation().pathname;
  const useModal = props.useModal !== undefined ? props.useModal : true;

  const areaId = location.split('/')[3];

  function goBack() {
    if (steps === 0) {
      // return history.push('/reserve/common/' + areaId + '/types');
      return history.goBack();
    }
    const oldPath = location;
    const pathStep = steps + 1;
    const backPath = oldPath.slice(0, -1) + (pathStep - 1);
    return history.replace(backPath);
  }

  function goHome() {
    return history.push('/');
  }

  const [modal, setModal] = useState(false);

  function sendData() {
    props.onSend && props.onSend(forms);
    !props.editMode && taskFormAPI.createCommonTask(forms);
  }

  // once
  useEffect(() => {
    if (!props.noInit) dispatch(initForm({ size: MAX_STEPS }));
    areaId &&
      areaService
        .getAreaInfo(areaId)
        .then(area => {
          console.log(area);
          dispatch(setAreaInfoForm(area));
        })
        .then(() => {
          // pre load other forms
          ProjectForm.preload();
          FacilityForm.preload();
          OverviewCommonForm.preload();
        });
  }, []);

  // when steps change
  useEffect(() => {
    if (steps === 0) return;
    const oldPath = location;
    const newPath = oldPath.slice(0, -1) + (steps + 1);
    history.replace(newPath);
  }, [steps]);

  if (forms.finish) {
    sendData();
    useModal && setModal(true);
    dispatch(initForm({ size: MAX_STEPS }));
  }

  return (
    <PageLayout title="จองพื้นที่ส่วนกลาง">
      {/* confirm modal */}
      <ConfirmModal
        desc={{
          main:
            'เมื่ออาจารย์ที่ปรึกษาโครงการยืนยันการขอใช้สถานที่ระบบจึงจะส่งข้อมูลการจองไปยังเจ้าหน้าที่',
        }}
        visible={modal}
        onClick={goHome}
      />

      {/* Fixed header */}
      <Row
        className={sharedStyles.innerFixedHeader}
        type="flex"
        justify="center"
      >
        {/* steps */}
        <Col style={{ marginTop: '-12px' }} offset={2} span={18}>
          <Row type="flex" justify="center">
            <Col span={20}>
              <StateSteps
                // onClick={this.onClickStep}
                current={steps}
                steps={stepsList.map(({ label }) => ({ label }))}
              />
            </Col>
          </Row>
        </Col>

        {/* back card */}
        <Col style={{ marginTop: '4px', marginBottom: '4px' }} span={14}>
          <BackCard onClick={goBack}>
            {steps === 0
              ? 'เลือกประเภทกิจกรรม'
              : stepsList[steps - 1].desc}
            {/* {backCard[step - 1]} */}
          </BackCard>
        </Col>

        {/* Badge */}
        {/* when overview hide this */}
        {steps !== MAX_STEPS && (
          <Col style={{ marginBottom: '-8px' }} span={24}>
            <Row type="flex" justify="start">
              <Badge>
                {forms.area?._id ? (
                  forms.area.label
                ) : (
                  <Icon type="loading" />
                )}
              </Badge>
            </Row>
          </Col>
        )}
      </Row>

      {/* spacing between fixed inner header */}
      <div style={{ height: '145px' }} />

      {/* when overview hide this */}
      {steps !== MAX_STEPS && <Outline>ฟอร์มขอใช้บริการ</Outline>}

      <Switch>
        <Route path="**/1">
          <RequestorForm ind={0} />
          <WhiteSpace />
        </Route>
        <Route path="**/2">
          <ProjectForm ind={1} />
          <WhiteSpace />
        </Route>
        <Route path="**/3">
          <FacilityForm ind={2} />
          <WhiteSpace />
        </Route>
        <Route path="**/4">
          <OverviewCommonForm ind={3} />
        </Route>
      </Switch>
    </PageLayout>
  );
};

export default AreaCommonActivityPage;
