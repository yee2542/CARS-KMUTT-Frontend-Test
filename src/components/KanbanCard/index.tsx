import React from 'react';
import { Row, Col } from 'antd';
import Card from './Card';
import { Link } from 'react-router-dom';

// models
import Menu from '../../models/menu/interface';
import defaultMenu from '../../models/menu';

export default function KanbanCard(props: {
  menu?: Menu[];
  needActions?: string[];
}) {
  const { needActions } = props;
  let menu = props.menu ? props.menu : defaultMenu;

  // when parse new action
  if (needActions && needActions[0]) {
    menu = menu.map(e => {
      if (needActions.includes(e.key))
        return { ...e, setting: { ...e.setting, needAction: true } };
      return e;
    });
  }

  return (
    <React.Fragment>
      <Row type="flex" justify="space-between">
        {menu &&
          menu.map(({ icon, label, setting, key, link, state }) => (
            <Col key={key} span={11}>
              <Link
                to={
                  {
                    pathname: link,
                    state: {
                      ...state,
                      label,
                    },
                  } || ''
                }
              >
                <Card label={label} icon={icon} setting={setting} />
              </Link>
            </Col>
          ))}
      </Row>
    </React.Fragment>
  );
}
