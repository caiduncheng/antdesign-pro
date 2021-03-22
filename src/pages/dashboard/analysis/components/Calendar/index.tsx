import React, { Component } from 'react';

// import autoHeight from '../Charts/autoHeight';
import styles from './index.less';

import { Calendar, Select, Radio, Col, Row, Typography } from 'antd';
// import { FormattedMessage } from '@/.umi/plugin-locale/localeExports';

// const onPanelChange = (value: any, mode: string) => {
// console.log(value, mode);
// };
interface HeaderData {
  value: any;
  type: string;
  onChange: any;
  onTypeChange: any;
}
class TheCalendar extends Component {
  headerRender = (headData: HeaderData) => {
    const { value, type, onChange, onTypeChange } = headData;
    const start = 0;
    const end = 12;
    const monthOptions = [];

    const current = value.clone();
    const localeData = value.localeData();
    // const nowDate = new Date().toDateString().split(' ')[1] + ' ' + new Date().getFullYear();

    const months = [];
    for (let i = 0; i < 12; i += 1) {
      current.month(i);
      months.push(localeData.monthsShort(current));
    }
    for (let index = start; index < end; index += 1) {
      monthOptions.push(
        <Select.Option className="month-item" key={`${index}`} value={months[index]}>
          {months[index]}
        </Select.Option>,
      );
    }
    const month = value.month();
    const year = value.year();
    const options = [];
    for (let i = year - 10; i < year + 10; i += 1) {
      options.push(
        <Select.Option key={i} value={i} className="year-item">
          {i}
        </Select.Option>,
      );
    }
    return (
      <div style={{ padding: 8 }}>
        {/* <Typography.Title level={4}>
          <FormattedMessage
            id="dashboardandanalysis.analysis.the-calendar-of-system"
            defaultMessage="System Calendar"
          />
        </Typography.Title> */}
        <Row gutter={8}>
          <Col>
            <Radio.Group size="small" onChange={(e) => onTypeChange(e.target.value)} value={type}>
              <Radio.Button value="month">Month</Radio.Button>
              <Radio.Button value="year">Year</Radio.Button>
            </Radio.Group>
            {/* <div>{nowDate}</div> */}
          </Col>
          <Col>
            <Select
              size="small"
              dropdownMatchSelectWidth={false}
              className="my-year-select"
              onChange={(newYear) => {
                const now = value.clone().year(newYear);
                onChange(now);
              }}
              value={String(year)}
            >
              {options}
            </Select>
          </Col>
          <Col>
            <Select
              size="small"
              dropdownMatchSelectWidth={false}
              value={String(month + 1)}
              onChange={(selectedMonth) => {
                const newValue = value.clone();
                newValue.month(parseInt(selectedMonth, 10) - 1);
                onChange(newValue);
              }}
            >
              {monthOptions}
            </Select>
          </Col>
        </Row>
      </div>
    );
  };
  render() {
    return (
      <div className={styles.calanWrap}>
        <Calendar
          fullscreen={false}
          headerRender={this.headerRender}
          // onPanelChange={onPanelChange}
        />
      </div>
    );
  }
}

// export default autoHeight()(TheCalendar);
export default TheCalendar;
