import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Button, Alert, TextInput } from 'react-native';
import { Constants } from 'expo';

const SERVER = 'http://139.59.77.101';
const JSON_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export default class App extends Component {
  state = {
    chats: [],
    inputValue: "",
    username: '',
  }
  componentDidMount() {
    this.getChats();
  }
  getChats = () => {
    fetch(SERVER + '/chats')
    .then(response => response.json())
    .then(chats => this.setState({ chats }));
  }

  _handleButtonPress = () => {
    if (!this.state.username || !this.state.inputValue) {
      alert('Please enter a username and message...');

    }
    const { inputValue : message, username } = this.state;
    fetch(SERVER + '/chats', { headers: JSON_HEADERS, method: 'POST', body: JSON.stringify({ username, message })})
    .then(() => { this.getChats(); this.setState({ inputValue: '' }); });
  };

  _handleUserChange = username => {
    this.setState({ username });
  };

  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

  register = username => {
    this.setState({ username });
  }

  render() {
    return (
      <View style={styles.container}>

        <TextInput
            value={this.state.username}
            onChangeText={this._handleUserChange}
            placeholder="type your name here..."
            style={{ width: '100%', height: 60, padding: 8 }}
        />
        <TextInput
          value={this.state.inputValue}
          onChangeText={this._handleTextChange}
          placeholder="type your message here..."
          style={{ width: '100%', height: 60, padding: 8 }}
        />
        <Button
          title="Send"
          style={{ marginBottom: 5 }}
          onPress={this._handleButtonPress}
        />
        <Text />
        <Button
          title="Refresh chats"
          style={{ marginBottom: 5 }}
          onPress={this.getChats}
        />
        <ScrollView style={{ backgroundColor: '#F0F0F0' }}>
          {this.state.chats.map(chat => <Text>{chat.username}: {chat.message}</Text>)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
