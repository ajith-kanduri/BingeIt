import React from 'react';
import { Tabs } from 'antd';
import TableComponent from './TableComponent';
import { useHistory,withRouter } from 'react-router';


const API_ADDR = 'http://1d8c951668ad.ngrok.io' 

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

class TabComponent extends React.Component {
  
  constructor(props) {
    super(props);
    let email;
    if(!props.location?.state?.email){
      props.history.push('/');
      email = null;
    }
    else{
      email=props.location.state.email;
    }

    this.state = {
      dataSource: [],
      favMovies: [],
      favIds: [],
      email: email,
    };
  }

  componentDidMount() {
    this.fetchBoth();

  }

  fetchBoth = async() =>{
    const response = await fetch(API_ADDR+'/titles');
    const MovieJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(MovieJson.results);

    const response2 = await fetch(
        API_ADDR+'/fav/listfavourites?email='+this.state.email,
      {
        method: 'POST', // string or object
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const myJson = await response2.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson);
    let ids = [];
    for (let i = 0; i < myJson.que.length; i++) {
      ids.push(myJson.que[i].tconst);
    }
    this.setState({ dataSource: MovieJson.results,favMovies: myJson.que, favIds: ids });


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
        const response = await fetch(
          API_ADDR+'/fav/addfavourites?email='+this.state.email+'&tconst=' +
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
    } else {
      const deleteFromFavs = async () => {
        const response = await fetch(
            API_ADDR+'/fav/deletefavourites?email='+this.state.email+'&tconst=' +
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
      deleteFromFavs();
    }
    this.fetchBoth();
  }
  fetchfavorites = async () => {
    const response = await fetch(
        API_ADDR+'/fav/listfavourites?email='+this.state.email,
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
    this.setState({ favMovies: myJson.que, favIds: ids });
  };
  fetchMovies = async () => {
    const response = await fetch(API_ADDR+'/titles');
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson.results);
    this.setState({ dataSource: myJson.results, favIds: [] });
  };
  render() {
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

export default withRouter(TabComponent);