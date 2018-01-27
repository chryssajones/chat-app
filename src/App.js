import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import ChatHandler from './components/chatbox/ChatHandler';
// import Map from './components/map/MapBox';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      username: '',
      chats: []
    };
  }

  componentDidMount() {
    const username = window.prompt('Your name: ', 'Anonymous');
    this.setState({ username });
    const pusher = new Pusher('0e660fbb1049d403653d', {
      cluster: 'us2',
      encrypted: true
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', data => {
      this.setState({ chats: [...this.state.chats, data], test: '' });
    });
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e) {
    if (e.keyCode === 13) {
      const payload = {
        username: this.state.username,
        message: this.state.text
      };
      axios.post('http://localhost:5000/message', payload);
    } else {
      this.setState({ text: e.target.value });
    }
  }

  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Pick Me Up! Chat Box</h1>
          </header>
          <div>
            <ChatHandler />
          </div>
        </div>
      </div>
    );
  }
}

export default App;