import React from 'react';
import axios from 'axios';
import './App.css';

import { Card } from '@material-ui/core'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      user: {},
      github: ""
    }
  }

  componentDidMount() {
    axios.get('https://api.github.com/users/VictorSDelpiu')
    .then((res) => {
      this.setState({
        ...this.state,
        user: res.data
      }) 
    }).catch(error => {
      console.log(error)  
    })
  }

  handleChanges = (e) => {
      console.log(e.target.value)
      console.log(e.target.name)
      e.preventDefault();
      this.setState({...this.state, [e.target.name]: e.target.value});
    }

  handleSearch = (e) => {
    e.preventDefault()
    axios.get(`https://api.github.com/users/${this.state.github}`)
    .then((res) => {
      this.setState({
        ...this.state,
        user: res.data
      }) 
    }).catch(error => {
      console.log(error)  
    })
  }

  render() {
    return (
			<div>
				<Card className="App">
				<img src={this.state.user.avatar_url} />
				<h1>{this.state.user.login}</h1>
				<p>{this.state.user.bio}</p>
				<p>Followers: {this.state.user.followers}</p>
				<p>Following: {this.state.user.following}</p>
				</Card>
				<Card className="App">
                    <form onSubmit={this.handleSearch}>
							<input name="github" type="texts" onChange={this.handleChanges} placeholder="github handle"/>
					<button type="submit">SEARCH</button>
                    </form>
				</Card>
						
			</div>
    );
  }
}

export default App;
