import { Component } from 'react';

import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component'
import './App.css';

class App extends Component {
  constructor() { // always run first
    super();

    this.state = {
      monsters: [],       
      searchField: ''
    };
  }
  
  componentDidMount() { //first time a component gets mounted, only once
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState(() => { //whenever the state gets updates, rerenders
        return {monsters: users}
      },
      () => {
        console.log(this.state);
      }))
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(()=> {
      return { searchField };
    });
  }

  render(){ // determines what to show //mounts the initial state
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;
    const filteredMonsters = monsters.filter((monster)=> {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    return (
      <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox className='monsters-search-box' 
                   onChangeHandler={onSearchChange} 
                   placeholder="search monsters"/>
        <CardList monsters={filteredMonsters}/>
        
      </div>
    );
  }  
}

export default App;
