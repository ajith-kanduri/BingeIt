import React from 'react';
import { Table } from 'antd';

class ExpandedRowRender extends React.Component {
  state = {
    filteredInfo: null,
  };
  handleChange = filters => {
    //console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
    });
  };
  render() {
    let { filteredInfo } = this.state;
    filteredInfo = filteredInfo || {};
    const data = this.props.episodeList;
    var uniqueSeasons = [...new Set(data.map(({ season }) => season))];
    console.log(uniqueSeasons);
    var filter = [];
    for (let i = 0; i < uniqueSeasons.length; i++) {
      filter.push({
        text: uniqueSeasons[i],
        value: uniqueSeasons[i],
      });
    }
    const columns = [
      {
        title: 'Season',
        dataIndex: 'season',
        key: 'season',
        filters: filter,
        filteredValue: filteredInfo.season || null,
        onFilter: (value, record) => record.season === value,
      },
      { title: 'Episode', dataIndex: 'epsiode', key: 'epsiode' },
      { title: 'Name', dataIndex: 'title', key: 'title' },
      {
        title: 'Runtime(mins)',
        dataIndex: 'runtimeMinutes',
        key: 'runtimeMinutes',
      },
      { title: 'Year', dataIndex: 'year', key: 'year' },
      { title: 'Rating', dataIndex: 'averageRating', key: 'averageRating' },
    ];
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        onChange={this.handleChange}
      />
    );
  }
}
export default ExpandedRowRender;
