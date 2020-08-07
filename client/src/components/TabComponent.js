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
    this.state = {
      dataSource: [],
      favMovies: [],
      favIds: [],
      loading: 'false',
    };
  }
  componentDidMount() {
    this.fetchMovies();
    this.fetchfavorites();
  }

  toggleFavourite(tconst) {
    let flag = 0;
    for (let i = 0; i < this.state.favMovies.length; i++) {
      if (this.state.favMovies[i].tconst === tconst) {
        flag = 1;
      }
    }
    if (flag === 0) {
      const addToFavs = async () => {
        this.setState({ loading: 'true' });
        const response = await fetch(
          'http://74d47a6c12e2.ngrok.io/fav/addfavourites?email=ajit&tconst=' +
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
        this.setState({ loading: 'false' });
        this.fetchfavorites();
      };
      addToFavs();
    } else {
      const deleteFromFavs = async () => {
        this.setState({ loading: 'true' });
        const response = await fetch(
          'http://74d47a6c12e2.ngrok.io/fav/deletefavourites?email=ajit&tconst=' +
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
        this.setState({ loading: 'false' });
        this.fetchfavorites();
      };
      deleteFromFavs();
    }
  }
  fetchfavorites = async () => {
    this.setState({ loading: 'true' });
    const response = await fetch(
      'http://74d47a6c12e2.ngrok.io/fav/listfavourites?email=ajit',
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
    let ids = [];
    for (let i = 0; i < myJson.que.length; i++) {
      ids.push(myJson.que[i].tconst);
    }
    this.setState({ favMovies: myJson.que, favIds: ids, loading: 'false' });
  };
  fetchMovies = async () => {
    const response = await fetch('http://74d47a6c12e2.ngrok.io/titles');
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson.results);
    this.setState({ dataSource: myJson.results, loading: 'false' });
  };
  render() {
    if (this.state.loading === 'true') {
      return <h1>Loading...</h1>;
    } else {
      return (
        <Tabs defaultActiveKey='1' onChange={callback}>
          <TabPane tab='All Movies' key='1'>
            <TableComponent
              dataSource={this.state.dataSource}
              toggleFavourite={tconst => this.toggleFavourite(tconst)}
              favIds={this.state.favIds}
            />
          </TabPane>
          <TabPane tab='Favourites' key='2'>
            <TableComponent
              dataSource={this.state.favMovies}
              toggleFavourite={tconst => this.toggleFavourite(tconst)}
              favIds={this.state.favIds}
            />
          </TabPane>
        </Tabs>
      );
    }
  }
}

export default TabComponent;
