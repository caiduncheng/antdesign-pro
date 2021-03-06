import { Card } from 'antd';
// FormattedMessage,
import { formatMessage, FormattedMessage } from 'umi';
import React from 'react';
// OfflineChartData, OfflineDataType,
import { norlineChartData } from '../data.d';

import { TimelineChart } from './Charts';
// import NumberInfo from './NumberInfo';
import styles from '../style.less';

// const CustomTab = ({
//   data,
//   currentTabKey: currentKey,
// }: {
//   data: OfflineDataType;
//   currentTabKey: string;
// }) => (
//   <Row gutter={8} style={{ width: 138, margin: '8px 0' }} type="flex">
//     <Col span={12}>
//       <NumberInfo
//         title={data.name}
//         subTitle={
//           <FormattedMessage
//             id="dashboardandanalysis.analysis.conversion-rate"
//             defaultMessage="Conversion Rate"
//           />
//         }
//         gap={2}
//         total={`${data.cvr * 100}%`}
//         theme={currentKey !== data.name ? 'light' : undefined}
//       />
//     </Col>
//     <Col span={12} style={{ paddingTop: 36 }}>
//       <Pie
//         animate={false}
//         inner={0.55}
//         tooltip={false}
//         margin={[0, 0, 0, 0]}
//         percent={data.cvr * 100}
//         height={64}
//       />
//     </Col>
//   </Row>
// );

// const { TabPane } = Tabs;

const OfflineData = ({
  // activeKey,
  loading,
  // offlineData,
  // offlineChartData,
  norlineChartData,
}: // handleTabChange,
{
  // activeKey: string;
  loading: boolean;
  // offlineData: OfflineDataType[];
  // offlineChartData: OfflineChartData[];
  norlineChartData: norlineChartData[];
  // handleTabChange: (activeKey: string) => void;
}) => (
  <Card
    loading={loading}
    className={styles.offlineCard}
    bordered={false}
    // style={{ marginTop: 32 }}
  >
    {/* <Tabs activeKey={activeKey} onChange={handleTabChange}>
      {offlineData.map((shop) => (
        <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.name}>
          <div style={{ padding: '0 24px' }}>
            <TimelineChart
              height={400}
              data={offlineChartData}
              titleMap={{
                y1: formatMessage({ id: 'dashboardandanalysis.analysis.traffic' }),
                y2: formatMessage({ id: 'dashboardandanalysis.analysis.payments' }),
              }}
            />
          </div>
        </TabPane>
      ))}
    </Tabs> */}
    <div
    // style={{ padding: '0 24px', height: '100%' }}
    >
      <h2 style={{ fontWeight: 700 }}>
        <FormattedMessage
          id="dashboardandanalysis.analysis.linechart"
          defaultMessage="Line Chart"
        />
      </h2>
      <TimelineChart
        // title={'?????????'}
        height={245}
        data={norlineChartData}
        titleMap={{
          y1: formatMessage({ id: 'dashboardandanalysis.analysis.traffic' }),
          y2: formatMessage({ id: 'dashboardandanalysis.analysis.payments' }),
        }}
      />
    </div>
  </Card>
);

export default OfflineData;
