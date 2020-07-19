import { Col, Row } from 'antd';
import { Drawer } from 'Models/drawer/interface';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export default function MainCard(props: {
  settings?: Drawer['settings'];
  icon: Drawer['icon'];
  label: Drawer['label'];
  link?: Drawer['link'];
  onClick?: any;
}) {
  const { icon, label, settings, link, onClick } = props;
  return (
    <Col onClick={onClick} className={styles.main} span={22}>
      <Link to={link || ''}>
        <Row type="flex" justify="start">
          <Col span={3}>
            <Row type="flex" justify="center">
              <Col>
                <img
                  height={settings?.iconSize || undefined}
                  src={icon}
                  alt={label[0]}
                />
              </Col>
            </Row>
          </Col>
          <Col offset={2} span={19}>
            {label}
          </Col>
        </Row>
      </Link>
    </Col>
  );
}
