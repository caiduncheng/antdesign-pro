import { Card } from 'antd';

// import { FormattedMessage } from 'umi';
import React from 'react';
import TheCalendar from './Calendar';
// import Yuan from '../utils/Yuan';
import styles from '../style.less';
import { FormattedMessage } from '@/.umi/plugin-locale/localeExports';

// import closeIcon from '@/assets/close.svg';
// import refreshIcon from '@/assets/refresh.svg';

const SystemCalendar = ({ loading }: { loading: boolean }) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    // title={
    //   <FormattedMessage
    //     id="dashboardandanalysis.analysis.the-calendar-of-system"
    //     defaultMessage="System Calendar"
    //   />
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
    // extra={
    //   <div>
    //     <img src={closeIcon} alt="close" />
    //     <img src={refreshIcon} alt="refresh" />
    //   </div>
    // }
  >
    <div>
      <h2 style={{ fontWeight: 700 }}>
        <FormattedMessage
          id="dashboardandanalysis.analysis.the-calendar-of-system"
          defaultMessage="System Calendar"
        />
      </h2>
      <TheCalendar />
    </div>
  </Card>
);

export default SystemCalendar;
