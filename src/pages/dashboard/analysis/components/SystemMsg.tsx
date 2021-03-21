import { Card } from 'antd';

import { FormattedMessage } from 'umi';
import React from 'react';
// import { Pie } from './Charts';
import { messageData } from '../data.d';
import Messages from './Message';
// import Yuan from '../utils/Yuan';
import styles from '../style.less';

const SystemMsg = ({ loading, messageData }: { loading: boolean; messageData: messageData[] }) => {
  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      // title={
      //   <FormattedMessage id="dashboardandanalysis.analysis.messages" defaultMessage="Message" />
      // }
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
        <h2 style={{ fontWeight: 700 }}>
          <FormattedMessage id="dashboardandanalysis.analysis.messages" defaultMessage="Message" />
        </h2>
        <Messages data={messageData}></Messages>
      </div>
    </Card>
  );
};

export default SystemMsg;
