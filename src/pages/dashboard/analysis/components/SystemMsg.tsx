import { Card } from 'antd';

import { FormattedMessage } from 'umi';
import React from 'react';
// import { Pie } from './Charts';
import Messages from './Message';
// import Yuan from '../utils/Yuan';
import styles from '../style.less';

const SystemMsg = ({ loading }: { loading: boolean }) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    title={
      <FormattedMessage id="dashboardandanalysis.analysis.messages" defaultMessage="Message" />
    }
    style={{
      height: '100%',
    }}
    // extra={
    //   <div className={styles.salesCardExtra}>
    //     {dropdownGroup}
    //     <div className={styles.salesTypeRadio}>
    //       <Radio.Group value={salesType} onChange={handleChangeSalesType}>
    //         <Radio.Button value="all">
    //           <FormattedMessage id="dashboardandanalysis.channel.all" defaultMessage="ALL" />
    //         </Radio.Button>
    //         <Radio.Button value="online">
    //           <FormattedMessage id="dashboardandanalysis.channel.online" defaultMessage="Online" />
    //         </Radio.Button>
    //         <Radio.Button value="stores">
    //           <FormattedMessage id="dashboardandanalysis.channel.stores" defaultMessage="Stores" />
    //         </Radio.Button>
    //       </Radio.Group>
    //     </div>
    //   </div>
    // }
  >
    <div>
      {/* <h2
      // style={{ marginTop: 8, marginBottom: 16 }}
      >
        <FormattedMessage id="dashboardandanalysis.analysis.sales" defaultMessage="Sales" />
      </h2> */}
      <Messages></Messages>
    </div>
  </Card>
);

export default SystemMsg;
