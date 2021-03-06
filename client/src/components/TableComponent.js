import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import ExpandedRowRender from './ExpandedRowRender';

class TableComponent extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    filteredInfo: null,
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };
  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  handleChange = (pagination, filters) => {
    //console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
    });
  };
  render() {
    let { filteredInfo } = this.state;
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'tile',

        ...this.getColumnSearchProps('title'),
      },
      {
        title: 'Type',
        dataIndex: 'titleType',
        key: 'titleType',
        filters: [
          { text: 'movie', value: 'movie' },
          { text: 'series', value: 'tvSeries' },
        ],
        filteredValue: filteredInfo.titleType || null,
        onFilter: (value, record) => record.titleType.includes(value),
      },
      {
        title: 'Rating',
        dataIndex: 'averageRating',
        key: 'averageRating',
        filters: [
          { text: '>=9', value: [10, 9] },
          { text: '8.5-9', value: [9, 8.5] },
          { text: '8-8.5', value: [8.5, 8] },
        ],
        filteredValue: filteredInfo.averageRating || null,
        onFilter: (value, record) => {
          if (
            record.averageRating < value[0] &&
            record.averageRating >= value[1]
          ) {
            return record;
          }
        },
      },
      {
        title: 'Genre',
        dataIndex: 'genres',
        key: 'genres',
        filters: [
          { text: 'Drama', value: 'Drama' },
          { text: 'Crime', value: 'Crime' },
          { text: 'Action', value: 'Action' },
          { text: 'Thriller', value: 'Thriller' },
          { text: 'Adventure', value: 'Adventure' },
          { text: 'Fantasy', value: 'Fantasy' },
        ],
        filteredValue: filteredInfo.genres || null,
        onFilter: (value, record) => record.genres.includes(value),
      },
      {
        title: 'Directors',
        dataIndex: 'directors',
        key: 'directors',
        ...this.getColumnSearchProps('address'),
      },
      {
        title: 'Favourite',
        dataIndex: 'isFavourite',
        key: 'isFavourite',
        render: (text, record, index) => (
          <a onClick={() => this.props.toggleFavourite(record.tconst)}>
            {this.props.favIds.includes(record.tconst) ? 'Remove' : 'Add'}
          </a>
        ),
      },
    ];
    return (
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => (
            <div>
              <ExpandedRowRender episodeList={record.episodeList} />
            </div>
          ),
          rowExpandable: record => record.titleType !== 'movie',
        }}
        dataSource={this.props.dataSource}
        bordered
        onChange={this.handleChange}
      />
    );
  }
}

export default TableComponent;
