/* eslint-disable react/display-name */
import React from 'react';
import { Table as TableAnt } from 'antd';
import { AreaTableAPI } from 'Models/area/interfaces';
import { ColumnProps } from 'antd/lib/table';
import { useHistory } from 'react-router';

const AreaTable: React.FC<{
  data: AreaTableAPI[];
  loading?: boolean;
}> = props => {
  const history = useHistory();
  const columns: ColumnProps<AreaTableAPI>[] = [
    {
      title: 'สนาม / ห้อง',
      key: 'label',
      dataIndex: 'label',
      render: d => <a>{d}</a>,
      sorter: (a, b) => a.label.localeCompare(b.label),
    },
    {
      title: 'สถานที่',
      render: (d: AreaTableAPI) => d.building.label.split(',')[1],
      key: 'building',
      sorter: (a, b) => a.building.label.localeCompare(b.building.label),
    },
  ];
  return (
    <TableAnt
      loading={props.loading || false}
      pagination={false}
      onRowClick={r => history.push('/staff/area/' + r._id)}
      columns={columns}
      dataSource={props.data}
    />
  );
};

export default AreaTable;