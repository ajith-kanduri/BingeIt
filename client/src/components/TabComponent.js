import React from 'react';
import { Tabs } from 'antd';
import TableComponent from './TableComponent';
import FavouriteComponent from './FavouriteComponent';
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

class TabComponent extends React.Component {
  constructor(props) {
    super(props);
    let data;
    if (localStorage.getItem('data') != null) {
      data = JSON.parse(localStorage.getItem('data'));
    } else {
      data = require('../data.json');
    }
    this.state = {
      dataSource: data,
    };
  }

  toggleFavourite(key) {
    let newDataSource = this.state.dataSource.slice();
    newDataSource[key - 1]['isFavourite'] = newDataSource[key - 1][
      'isFavourite'
    ]
      ? 0
      : 1;
    localStorage.setItem('data', JSON.stringify(newDataSource));
    this.setState({ dataSource: newDataSource });
  }

  render() {
    return (
      <Tabs defaultActiveKey='1' onChange={callback}>
        <TabPane tab='All Movies' key='1'>
          <TableComponent
            dataSource={this.state.dataSource}
            toggleFavourite={key => this.toggleFavourite(key)}
          />
        </TabPane>
        <TabPane tab='Favourites' key='2'>
          <TableComponent
            dataSource={this.state.dataSource.filter(function (val) {
              return val.isFavourite == 1;
            })}
            toggleFavourite={key => this.toggleFavourite(key)}
          />
        </TabPane>
      </Tabs>
    );
  }
}

export default TabComponent;
