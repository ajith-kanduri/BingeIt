import React from 'react';
import { Tabs } from 'antd';
import TableComponent from './TableComponent';
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

class TabComponent extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey='1' onChange={callback}>
        <TabPane tab='All Movies' key='1'>
          <TableComponent />
        </TabPane>
        <TabPane tab='Favourites' key='2'>
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    );
  }
}

export default TabComponent;
