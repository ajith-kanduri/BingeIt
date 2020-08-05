import React from 'react';
import { Table } from 'antd';

class ExpandedRowRender extends React.Component {
  constructor() {
    super();
    this.state = {
      season: 1,
      data: [],
    };
    this.handleSeasonChange = this.handleSeasonChange.bind(this);
  }
  componentDidMount() {
    var epsList = this.props.episodeList.slice();
    this.setState({
      data: epsList.filter(function (epsList) {
        return epsList.season === 1;
      }),
    });
  }
  handleSeasonChange = e => {
    var epsList = this.props.episodeList.slice();
    console.log(epsList);
    console.log(e.target.value);
    const s = e.target.value;
    var list = [];
    for (let i = 0; i < epsList.length; i++) {
      if (epsList[i].season == s) {
        list.push(epsList[i]);
      }
    }
    this.setState({
      season: e.target.value,
      data: list,
    });
    console.log(list);
    console.log(this.state.data);
  };
  render() {
    let { filteredInfo } = this.state;
    filteredInfo = filteredInfo || {};
    const fullEpsList = this.props.episodeList;
    var uniqueSeasons = [...new Set(fullEpsList.map(({ season }) => season))];
    const columns = [
      {
        title: 'Season',
        dataIndex: 'season',
        key: 'season',
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
      <div>
        <div className='rowC'>
          <h4>Season : </h4>
          <select onChange={this.handleSeasonChange}>
            {uniqueSeasons.map(function (data, key) {
              return (
                <option key={key} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
        </div>
        <br></br>
        <br></br>
        <h1>Season {this.state.season}</h1>
        <br></br>
        <Table
          columns={columns}
          dataSource={this.state.data}
          pagination={false}
          bordered
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
export default ExpandedRowRender;
