// import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';

import { FormattedMessage } from 'umi';
import React from 'react';
// import numeral from 'numeral';
import { ChartCard } from './Charts';
// import { VisitDataType } from '../data.d';
// import Trend from './Trend';
// import Yuan from '../utils/Yuan';
// import styles from '../style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 8,
  style: { marginBottom: 24 },
};
// , visitData  visitData: VisitDataType[]
const IntroduceRow = ({ loading }: { loading: boolean }) => (
  <Row gutter={24} type="flex">
    <Col {...topColResponsiveProps}>
      <ChartCard
        bodyStyle={{ backgroundColor: '#258DF4', borderRadius: '2px' }}
        bordered={false}
        title={
          <FormattedMessage
            id="dashboardandanalysis.analysis.total-sales"
            defaultMessage="Not Started"
          />
        }
        // action={
        //   <Tooltip
        //     title={
        //       <FormattedMessage
        //         id="dashboardandanalysis.analysis.introduce"
        //         defaultMessage="Introduce"
        //       />
        //     }
        //   >
        //     <InfoCircleOutlined />
        //   </Tooltip>
        // }
        loading={loading}
        total={() => 321}
        // footer={
        //   <Field
        //     label={
        //       <FormattedMessage
        //         id="dashboardandanalysis.analysis.day-sales"
        //         defaultMessage="Daily Sales"
        //       />
        //     }
        //     value={`￥${numeral(12423).format('0,0')}`}
        //   />
        // }
        contentHeight={48}
      >
        {/* <Trend flag="up" style={{ marginRight: 16 }}>
          <FormattedMessage
            id="dashboardandanalysis.analysis.week"
            defaultMessage="Weekly Changes"
          />
          <span className={styles.trendText}>12%</span>
        </Trend>
        <Trend flag="down">
          <FormattedMessage id="dashboardandanalysis.analysis.day" defaultMessage="Daily Changes" />
          <span className={styles.trendText}>11%</span>
        </Trend> */}
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bodyStyle={{ backgroundColor: '#FF474C', borderRadius: '2px' }}
        bordered={false}
        loading={loading}
        title={
          <FormattedMessage
            id="dashboardandanalysis.analysis.visits"
            defaultMessage="In Processed"
          />
        }
        // action={
        //   <Tooltip
        //     title={
        //       <FormattedMessage
        //         id="dashboardandanalysis.analysis.introduce"
        //         defaultMessage="Introduce"
        //       />
        //     }
        //   >
        //     <InfoCircleOutlined />
        //   </Tooltip>
        // }
        // total={numeral(8846).format('0,0')}
        total={202}
        // footer={
        //   <Field
        //     label={
        //       <FormattedMessage
        //         id="dashboardandanalysis.analysis.day-visits"
        //         defaultMessage="Daily Visits"
        //       />
        //     }
        //     value={numeral(1234).format('0,0')}
        //   />
        // }
        contentHeight={46}
      >
        {/* <MiniArea color="#975FE4" data={visitData} /> */}
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bodyStyle={{ backgroundColor: '#00B98B', borderRadius: '2px' }}
        bordered={false}
        loading={loading}
        title={
          <FormattedMessage
            id="dashboardandanalysis.analysis.payments"
            defaultMessage="Completed"
          />
        }
        // action={
        //   <Tooltip
        //     title={
        //       <FormattedMessage
        //         id="dashboardandanalysis.analysis.introduce"
        //         defaultMessage="Introduce"
        //       />
        //     }
        //   >
        //     <InfoCircleOutlined />
        //   </Tooltip>
        // }
        // total={numeral(6560).format('0,0')}
        total={202}
        // footer={
        //   <Field
        //     label={
        //       <FormattedMessage
        //         id="dashboardandanalysis.analysis.conversion-rate"
        //         defaultMessage="Conversion Rate"
        //       />
        //     }
        //     value="60%"
        //   />
        // }
        contentHeight={46}
      >
        {/* <MiniBar data={visitData} /> */}
      </ChartCard>
    </Col>
    {/* <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title={
          <FormattedMessage
            id="dashboardandanalysis.analysis.operational-effect"
            defaultMessage="Operational Effect"
          />
        }
        action={
          <Tooltip
            title={
              <FormattedMessage
                id="dashboardandanalysis.analysis.introduce"
                defaultMessage="Introduce"
              />
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        total="78%"
        footer={
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <Trend flag="up" style={{ marginRight: 16 }}>
              <FormattedMessage
                id="dashboardandanalysis.analysis.week"
                defaultMessage="Weekly Changes"
              />
              <span className={styles.trendText}>12%</span>
            </Trend>
            <Trend flag="down">
              <FormattedMessage
                id="dashboardandanalysis.analysis.day"
                defaultMessage="Weekly Changes"
              />
              <span className={styles.trendText}>11%</span>
            </Trend>
          </div>
        }
        contentHeight={46}
      >
        <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
      </ChartCard>
    </Col> */}
  </Row>
);

export default IntroduceRow;
