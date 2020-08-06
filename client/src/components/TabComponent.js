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
    this.state = {
      dataSource: [],
      favMovies: [],
    };
  }
  componentDidMount() {
    this.userAction();
    this.fetchfavorites();
  }

  toggleFavourite(key, tconst) {
    let newDataSource = this.state.dataSource.slice();
    // newDataSource[key - 1]['isFavourite'] = newDataSource[key - 1][
    //   'isFavourite'
    // ]
    //   ? 0
    //   : 1;

    const addToFavs = async () => {
      const response = await fetch(
        'http://c227cbb6beba.ngrok.io/fav/addfavourites?email=ajit&tconst=' +
          tconst,
        {
          method: 'POST', // string or object
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const myJson = await response.json(); //extract JSON from the http response
      // do something with myJson
      console.log(myJson);
    };
    addToFavs();

    // const deleteFromFavs = async () => {
    //   const response = await fetch(
    //     'http://c227cbb6beba.ngrok.io/fav/deletefavourites?email=ajit&tconst=' +
    //       tconst,
    //     {
    //       method: 'POST', // string or object
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     }
    //   );
    //   const myJson = await response.json(); //extract JSON from the http response
    //   // do something with myJson
    //   console.log(myJson);
    // };
    // deleteFromFavs();

    this.fetchfavorites();
  }
  fetchfavorites = async () => {
    const response = await fetch(
      'http://c227cbb6beba.ngrok.io/fav/listfavourites?email=ajit',
      {
        method: 'POST', // string or object
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson);
    this.setState({ favMovies: myJson.que });
  };
  userAction = async () => {
    const response = await fetch('http://c227cbb6beba.ngrok.io/titles');
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson.results);
    this.setState({ dataSource: myJson.results });
  };
  render() {
    return (
      <Tabs defaultActiveKey='1' onChange={callback}>
        <TabPane tab='All Movies' key='1'>
          <TableComponent
            dataSource={this.state.dataSource}
            toggleFavourite={(key, tconst) => this.toggleFavourite(key, tconst)}
          />
        </TabPane>
        <TabPane tab='Favourites' key='2'>
          <TableComponent
            dataSource={this.state.favMovies}
            toggleFavourite={(key, tconst) => this.toggleFavourite(key, tconst)}
          />
        </TabPane>
      </Tabs>
    );
  }
}

export default TabComponent;
