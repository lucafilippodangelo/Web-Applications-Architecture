import React, { Component } from 'react';
import './App.css';
import { Header } from './components/Header'
import { DisplayBoard } from './components/DisplayBoard'
import { getAllItems } from './services/ItemService'
import { Items } from './components/Items'


class App extends Component {

  state = {
    //user: {},
    items: [],
    numberOfItems: 0
  }

  getAllItems = () => {
    console.log(" -- LD get all start --")
    getAllItems()
      .then(items => {
        console.log(items)
        this.setState({items: items, numberOfItems: items.length})
      });
  }

  render() {
    
    return (
      <div className="App">
        <Header></Header>
        <div className="container mrgnbtm">
          <div className="row">
            <div className="col-md-4">
                <DisplayBoard
                  numberOfItems={this.state.numberOfItems}
                  getAllItems={this.getAllItems}
                >
                </DisplayBoard>
            </div>
          </div>
        </div>
        <div className="row mrgnbtm">
          <Items items={this.state.items}></Items>
        </div>
      </div>
    );
  }
}

export default App;
