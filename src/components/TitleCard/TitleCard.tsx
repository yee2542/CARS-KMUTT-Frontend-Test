import React from 'react'
import { Row, Col } from 'antd'
import styles from './styles.module.css'
import { Moment } from 'moment'

export default function TitleCard(props:
    {
        name?: string, state?: string,
        reserve?: {
            date?: Moment,
            start?: Moment,
            stop?: Moment,
            detail?: string,
            state?: {
                type?: 'wait' | 'reject' | 'undefined',
                desc?: string
            }
        }
    }) {
    const { name, reserve } = props
    const date = reserve?.date
    const n = date?.format('DD')
    const month = date?.format('MMMM')
    const year = date?.format('YYYY')

    const empty = (<p className={styles.empty}>ไม่มีข้อมูลการจอง</p>)
    const range = (<span>{date?.format('DD MMMM YYYY')} เวลา {reserve?.start?.format('HH:MM')}-{reserve?.stop?.format('HH:MM')} น.</span>)
    const detail = (<span>blabalbalbalbalbals</span>)
    const showCard = (
        <Row>
            <Row type='flex' justify='space-between'>
                {/* reservation name */}
                <Col span={12}>
                    <p className={styles.title}>{name}</p>
                </Col>

                {/* reservation date */}
                <Col span={12}>
                    <p className={styles.date}>{n} {month} {year}</p>
                </Col>
            </Row>
            <Row className={styles.detail} type='flex'>
                <Col span={22}>
                    <p>{reserve?.start !== undefined ? range : detail}</p>
                </Col>
            </Row>
        </Row>
    )
    return (
        <div className={styles.card}>
            {name === undefined ? empty : showCard}
        </div>
    )
}
