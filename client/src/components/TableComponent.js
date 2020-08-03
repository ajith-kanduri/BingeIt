import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const data = require('../data.json');
class TableComponent extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
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

  render() {
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

        ...this.getColumnSearchProps('titleType'),
      },
      {
        title: 'Rating',
        dataIndex: 'averageRating',
        key: 'averageRating',
        ...this.getColumnSearchProps('averageRating'),
      },
      {
        title: 'Genre',
        dataIndex: 'genres',
        key: 'genres',
        ...this.getColumnSearchProps('genres'),
      },
      {
        title: 'Directors',
        dataIndex: 'directors',
        key: 'directors',
        ...this.getColumnSearchProps('address'),
      },
      {
        title: 'Favourites',
        dataIndex: '',
        key: 'x',
        render: () => <a>Add</a>,
      },
    ];
    return (
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
          rowExpandable: record => record.titleType !== 'movie',
        }}
        dataSource={data}
        bordered
      />
    );
  }
}

export default TableComponent;
