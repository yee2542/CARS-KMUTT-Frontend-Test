import React, { useState, useEffect } from 'react';
import { TaskTableType, TaskTable } from 'Models/taskTable/interface';
import { Row, Col, Table } from 'antd';
// import ListTable from './list';
// import SortByTools from 'Components/SortByTools';
// import sortHelper from './sort.helper';
import HeadTitle from 'Components/HeadTitle';
import {
  ColumnProps,
  PaginationConfig,
  SorterResult,
} from 'antd/lib/table';
import moment from 'moment';
import typeDescHelper from './type.desc.helper';
import State from './state';
import ActionBtn from './ActionBtn';
import { useHistory } from 'react-router';

interface Props {
  title?: string;
  icon?: string;
  data?: TaskTableType;
  loading?: boolean;
  pagination?: (current: number, pageSize: number) => void;
  order?: (column: string, order: 1 | -1) => void;
}

const TaskTable: React.FC<Props> = props => {
  const { data, icon, title } = props;
  const [sortSelect, setSortSelect] = useState(undefined);
  const history = useHistory();

  const TASK_LINK = (id: string): string => `/staff/task/${id}`;
  const tableCols: ColumnProps<TaskTable>[] = [
    {
      title: 'วันที่',
      key: 'createAt',
      width: 110,
      sorter: (a, b) =>
        moment(a.createAt).valueOf() - moment(b.createAt).valueOf(),
      render: data => moment(data?.createAt).format('DD-MM-YYYY'),
    },
    {
      title: 'รหัสการจอง',
      key: '_id',
      render: data =>
        String(data?._id).slice(0, 3) + '.' + String(data?._id).slice(-4),
    },
    {
      title: 'ประเภทการจอง',
      key: 'reservationType',
      render: data => typeDescHelper(data?.type),
    },
    {
      title: 'สถานที่',
      key: 'area',
      width: 280,
      render: data => data?.area.label || data?.area.name,
    },
    {
      title: 'รหัสผู้จอง',
      key: 'requestor',
      render: data => data?.requestor[0] && data?.requestor[0].username,
    },
    {
      title: 'สถานะ',
      key: 'status',
      width: 90,
      sorter: (a, b) =>
        a.state.slice(-1)[0].localeCompare(b.state.slice(-1)[0]),
      // eslint-disable-next-line react/display-name
      render: data => <State state={data?.state.slice(-1)[0]} />,
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      // eslint-disable-next-line react/display-name
      render: data => (
        <ActionBtn onClick={() => history.push(TASK_LINK(data._id))} />
      ),
    },
  ];

  console.log('task table', data);
  function tableOnChange(
    pagination: PaginationConfig,
    filters: Partial<Record<keyof TaskTable, string[]>>,
    sorter: SorterResult<TaskTable>,
  ) {
    console.log('sort or pagination client requested');
    console.log(pagination, filters, sorter);
    const { order, pagination: paginationProps } = props;
    order && order(sorter.columnKey, sorter.order === 'ascend' ? 1 : -1);
    paginationProps &&
      paginationProps(pagination.current || -1, pagination.pageSize || -1);
  }
  return (
    <div>
      <Row>
        {/* title */}
        <HeadTitle icon={icon} title={title} />

        {/* tools */}
        {/* <Col offset={10} span={8} style={{ textAlign: 'right' }}>
          <SortByTools onSelected={e => setSortSelect(e)} />
        </Col> */}
      </Row>

      {/* <Row></Row> */}
      {/* data display */}
      <Table
        loading={props.loading || false}
        onChange={tableOnChange}
        dataSource={data}
        columns={tableCols}
      />

      {/* <Row>
        <ListTable header={true} />
        {data &&
          data
            // .sort(sortHelper(sortSelect))
            .map(e => <ListTable header={false} key={e._id} data={e} />)}
      </Row> */}
    </div>
  );
};

export default TaskTable;
