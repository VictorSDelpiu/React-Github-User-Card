import React from 'react';
import axios from 'axios';
import './App.css';


class App extends React.Component {

  state = {
    userData: {},
    userFollowers: []
  };

  componentDidMount() {
    fetch('https://api.github.com/users/VictorSDelpiu')
      .then( res => res.json())
      .then( data => this.setState({ userData: data }))
      .catch( err => console.log(err));

    fetch('https://api.github.com/users/VictorSDelpiu/followers')
      .then( res => res.json())
      .then( data => this.setState({ userFollowers: data }))
      .catch( err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <header>
          <h1>Github User Cards</h1>
          <div className="container">
            <div className="card">
            <h4>{this.state.userData.login}</h4>
               <p>Bio: {this.state.userData.bio}</p>
               <p>Followers: {this.state.userData.followers}</p>
              <img 
                className="card_avatar"
                alt={this.state.userData.login}
                src={this.state.userData.avatar_url}
              />
            </div>
          </div>
        </header>

          <h2>Followers</h2>
          <div className="container">
          {this.state.userFollowers.map( follower => {
               return (
                 <a href={follower.html_url} className="card">
                   <div>
                     <img 
                       className="card_avatar"
                       alt={follower.login}
                       src={follower.avatar_url}
                     />
                     <h4>{follower.login}</h4>
                   </div>
                 </a>
               );
             })}
            </div>
      </div>
    );
  };
}


export default App;
