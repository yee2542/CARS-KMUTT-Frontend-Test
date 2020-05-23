import React, { useEffect, useState } from 'react';
import Loadable from 'react-loadable';
import { Row, Col, message } from 'antd';
import { useLocation, useHistory } from 'react-router';

// data & store
import { taskAPI } from 'Models/task';

const StaffLayout = Loadable({
  loader: () => import('Components/Layout/Staff/Home'),
  loading: () => null,
});
const BackCard = Loadable({
  loader: () => import('Components/BackCard'),
  loading: () => null,
});
const Badge = Loadable({
  loader: () => import('Components/Badge'),
  loading: () => null,
});
const StateCardIconColor = Loadable({
  loader: () => import('Components/StateCard/icon'),
  loading: () => null,
});
const UsersReserveList = Loadable({
  loader: () => import('Components/UsersReserveList'),
  loading: () => null,
});
const Button = Loadable({
  loader: () => import('Components/Button'),
  loading: () => null,
});
const ConfirmModal = Loadable({
  loader: () => import('Components/ConfirmModal'),
  loading: () => null,
});

import {
  OverviewCommonForm,
  OverviewSportForm,
} from 'Pages/Areas/Common/common/forms';
import { Overview as OverviewMeetingForm } from 'Components/Forms/Meeting';

// common & assets
import xIcon from 'Assets/icons/button/x.svg';
import checkedIcon from 'Assets/icons/button/checked.svg';
import { mainStyle, detailStyle, CustomBrakeLine } from './helper';

import { initTask } from './init.state';
import typeDescHelper from 'Components/TaskTable/type.desc.helper';
import { TaskDetail } from 'Models/task/task.interface';

const TaskPage: React.FC = () => {
  const location = useLocation();
  const taskId = location.pathname.split('/')[3];
  const history = useHistory();

  const [dropModal, setDropModal] = useState(false);
  const [acceptModal, setAcceptModel] = useState(false);
  const [task, setTask] = useState<TaskDetail>(initTask);
  const forms = task.forms;
  const area = task.area;
  const [cancelled, setCancle] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const formInfo = (type: TaskDetail['type']) => {
    if (!forms) return null;
    if (type === 'common') {
      return <OverviewCommonForm viewOnly={true} data={{ forms, area }} />;
    }
    if (type === 'common-sport') {
      return <OverviewSportForm viewOnly={true} data={{ forms, area }} />;
    }
    if (type === 'meeting-club') {
      return (
        <OverviewMeetingForm
          buttonOffeset={false}
          viewOnly={true}
          data={{ forms, area }}
        />
      );
    }
    if (type === 'meeting-room') {
      return (
        <OverviewMeetingForm
          buttonOffeset={false}
          viewOnly={true}
          showFacility={false}
          data={{ forms, area }}
        />
      );
    }
    return null;
  };

  function onBack() {
    return history.goBack();
  }

  // modal handler
  function onActionDropModal(desc?: string) {
    taskAPI
      .cancleTaskByStaff(taskId, desc)
      .then(() => history.goBack())
      .catch(err => message.error(String(err)));
  }

  function onAcceptDropModal(desc?: string) {
    taskAPI
      .acceptTaskByStaff(taskId, desc)
      .then(() => history.goBack())
      .catch(err => message.error(String(err)));
  }

  // modal states
  function onDropModal() {
    setDropModal(prev => !prev);
  }

  function onAcceptModal() {
    setAcceptModel(prev => !prev);
  }

  //   fetch task
  useEffect(() => {
    taskAPI.getTaskById(taskId).then(t => {
      if (t) {
        setTask(t);
        const lastState = t.state.slice(-1)[0];
        const alreadyCancel =
          lastState === 'reject' || lastState === 'drop';
        const alreadyAccepted = lastState === 'accept';
        setCancle(alreadyCancel);
        setAccepted(alreadyAccepted);
      }
    });
  }, []);

  console.log(task);

  return (
    <StaffLayout>
      <Row>
        <Col>
          <BackCard
            onClick={onBack}
            styles={{ fontSize: '18px', fontWeight: 'bold' }}
          >
            ข้อมูลการจอง
          </BackCard>
        </Col>
      </Row>
      <Row style={{ marginTop: '24px' }} justify="center" type="flex">
        {/* header */}
        <Col span={20} style={{ ...mainStyle }}>
          รหัสการจอง : {task._id}
        </Col>
        <Col
          span={20}
          style={{
            ...mainStyle,
            ...{
              fontSize: '14px',
              color: '#666666',
              background: '#FFFFFF',
              marginTop: '-4px',
              minHeight: '350px',
              padding: '32px 72px 32px 72px',
            },
          }}
        >
          {/* detail card */}
          <Row justify="center" type="flex">
            {/* main status */}
            <Col span={24}>
              <Row>
                <Col span={6}>
                  <Badge
                    style={{
                      //   width: '150px',
                      fontSize: '16px',
                      textAlign: 'center',
                    }}
                  >
                    สถานะการจอง
                  </Badge>
                </Col>
                <Col
                  span={6}
                  style={{ marginLeft: '14px', marginTop: '4px' }}
                >
                  <StateCardIconColor type={task.state.slice(-1)[0]} />
                </Col>
              </Row>
            </Col>

            {/* top detail */}
            <Col span={8}>
              <b>ประเภทการจอง</b>{' '}
              <span style={detailStyle}>
                {task.area.building && typeDescHelper(task.type)}
              </span>
            </Col>
            <Col span={8} offset={8} style={{ textAlign: 'right' }}>
              <b>วันที่</b>{' '}
              <span style={detailStyle}>
                {task.createAt.format('DD-MM-YYYY')}
              </span>
            </Col>

            <CustomBrakeLine />

            {/* bottom detail */}
            {/* area */}
            <Col span={24}>
              <b>สถานที่</b>{' '}
              <span style={detailStyle}>
                {task.area.building && task.area.label}
              </span>
            </Col>

            {/* date */}
            <Col span={24}>
              <b>วันที่จอง</b>{' '}
              <span style={detailStyle}>
                {task.reserve[0] &&
                  task.reserve[0].start?.format('DD-MM-YYYY')}
              </span>
            </Col>

            {/* time */}
            <Col span={24}>
              <b>เวลาที่จอง</b>{' '}
              <span style={detailStyle}>
                {task.reserve[0] && task.reserve[0].start?.format('HH.mm')}{' '}
                -{task.reserve[0] && task.reserve[0].stop?.format('HH.mm')}
              </span>
            </Col>

            {/* requestor status list */}
            <Col style={{ fontWeight: 'normal' }} span={24}>
              <p style={{ color: '#1890FF', padding: 0, margin: 0 }}>
                <b>รหัสนักศึกษา</b>
              </p>
              <UsersReserveList users={task.requestor} />
            </Col>

            {/* <CustomBrakeLine /> */}
            {/* extend forms */}

            <Col style={{ fontWeight: 'normal' }} span={24}>
              {formInfo(task.type)}
            </Col>

            {/* Action */}
            {
              <React.Fragment>
                {!accepted && (
                  <Button
                    style={{
                      width: '175px',
                      backgroundColor: '#52C41A',
                    }}
                    fontSize={16}
                    padding={4}
                    onClick={() => setAcceptModel(true)}
                  >
                    <img
                      style={{ padding: 4 }}
                      src={checkedIcon}
                      alt="checked-icon"
                    />
                    อนุมัติ
                  </Button>
                )}

                {!cancelled && (
                  <Button
                    style={{
                      width: '175px',
                      backgroundColor: '#F5222D',
                    }}
                    fontSize={16}
                    padding={4}
                    onClick={() => setDropModal(true)}
                  >
                    <img style={{ padding: 4 }} src={xIcon} alt="x-icon" />
                    ไม่อนุมัติ
                  </Button>
                )}
              </React.Fragment>
            }
          </Row>
        </Col>
      </Row>

      {/* action modal */}
      <ConfirmModal
        onClick={onDropModal}
        onAction={onActionDropModal}
        type="drop"
        visible={dropModal}
      />
      <ConfirmModal
        onClick={onAcceptModal}
        onAction={onAcceptDropModal}
        type="accept"
        visible={acceptModal}
      />
    </StaffLayout>
  );
};

export default TaskPage;
