import React from 'react';
import { List, Avatar } from 'antd';
// import reqwest from 'reqwest';

// import InfiniteScroll from 'react-infinite-scroller';
import styles from './index.less';
// const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
export interface msgProps {
  data: {
    avatar: string;
    name: string;
    content: string;
  }[];
}
export interface msgState {
  data: {
    avatar: string;
    name: string;
    content: string;
  }[];
  loading: boolean;
  hasMore: boolean;
}
const Messages: React.FC<msgProps> = (props) => {
  // state: msgState = {
  //   data: [],
  //   loading: false,
  //   hasMore: true,
  // };
  const { data } = props;
  // componentDidMount() {
  //   this.fetchData((res) => {
  //     this.setState({
  //       data: res.results,
  //     });
  //   });
  // }

  // fetchData = (callback) => {
  //   reqwest({
  //     url: fakeDataUrl,
  //     type: 'json',
  //     method: 'get',
  //     contentType: 'application/json',
  //     success: (res) => {
  //       callback(res);
  //     },
  //   });
  // };

  // handleInfiniteOnLoad = () => {
  //   let { data } = this.state;
  //   this.setState({
  //     loading: true,
  //   });
  //   if (data.length > 14) {
  //     message.warning('Infinite List loaded all');
  //     this.setState({
  //       hasMore: false,
  //       loading: false,
  //     });
  //     return;
  //   }
  //   // this.fetchData((res) => {
  //   data = data.concat(data);
  //   this.setState({
  //     data,
  //     loading: false,
  //   });
  //   // });
  // };

  // render() {
  // const { data } = this.props;
  return (
    <div className={styles.infiniteContainer}>
      {/* <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        // loadMore={this.handleInfiniteOnLoad}
        // hasMore={!this.state.loading && this.state.hasMore}
        useWindow={false}
      > */}
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.content}
            />
            <div>Content</div>
          </List.Item>
        )}
      >
        {/* {this.state.loading && this.state.hasMore && (
              
            )} */}
        {/* <div className={styles.loadingContainer}>
          <Spin />
        </div> */}
      </List>
      {/* </InfiniteScroll> */}
    </div>
  );
  // }
};

// export default autoHeight()(TheCalendar);
export default Messages;
