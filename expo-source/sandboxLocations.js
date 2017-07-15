import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';

const SERVER = 'http://139.59.77.101';
const JSON_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

class RegisterComp extends Component {
  state = {
    username: '',
  };

  handleUsernameChange = username => {
    this.setState({ username });
  };

  _handleButtonPress = () => {
    this.props.register(this.state.username);
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: SERVER + '/static/sandbox.png' }}
          style={{ height: 140, width: 200 }}
        />
        <Text style={styles.paragraph}>
          Welcome to Sandbox's second session.
        </Text>
        <Text style={styles.paragraph}>username</Text>
        <TextInput
          value={this.state.username}
          onChangeText={this.handleUsernameChange}
          style={{
            textAlign: 'center',
            width: '100%',
            height: 44,
            padding: 8,
            backgroundColor: 'white',
          }}
        />
        <Button title="Register" onPress={this._handleButtonPress} />
      </View>
    );
  }
}

class LocationComp extends Component {
  state = {
    mapRegion: {
      latitude: 12.930670084299278,
      longitude: 77.6064229923321,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    inputValue: '',
    locationResult: null,
    otherLocations: [],
    currentLocation: {},
  };

  componentDidMount() {
    this.refreshLocation();
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

  sendLocation = () => {
    const {
      mapRegion: { latitude, longitude },
      inputValue: message,
    } = this.state;
    const { username } = this.props;
    fetch(SERVER + '/locations', {
      headers: JSON_HEADERS,
      method: 'POST',
      body: JSON.stringify({ latitude, longitude, message, username }),
    })
      .then(() => {
        this.refreshLocation();
      });
  };

  refreshLocation = () => {
    fetch(SERVER + '/locations')
      .then(response => response.json())
      .then(value => this.setState({ otherLocations: value }));
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.inputValue}
          placeholder="Type a message here"
          onChangeText={this._handleTextChange}
          style={{ width: '100%', height: 44, padding: 8 }}
        />
        <MapView
          style={{ alignSelf: 'stretch', height: '75%' }}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange}>
          <MapView.Marker coordinate={{ latitude: this.state.mapRegion.latitude, longitude: this.state.mapRegion.longitude }} />
          {this.state.otherLocations.filter(loc => loc.latitude && loc.longitude).map(location => (
            <MapView.Marker
              style={{ backgroundColor: 'white', color: '#aaeeaa' }}
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}>
              <Text>{location.username} says: {location.message}</Text>
            </MapView.Marker>
          ))}
          {this.state.otherLocations.filter(loc => loc.latitude && loc.longitude).map(location => (
            <MapView.Marker
              style={{ backgroundColor: 'white', color: '#aaeeaa' }}
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            />
          ))}
        </MapView>
        <Button title="Send Location" onPress={this.sendLocation} />
        <Button title="Refresh Locations" onPress={this.refreshLocation} />
      </View>
    );
  }
}

export default class App extends Component {
  state = {
    username: '',
  };
  register = username => {
    fetch(SERVER + '/users', {
      headers: JSON_HEADERS,
      method: 'POST',
      body: JSON.stringify({ username }),
    })
      .then(response => response.json())
      .then(value => {
        alert(value.message);
        this.setState({ username: value.username });
      });
  };
  render() {
    return this.state.username
      ? <LocationComp username={this.state.username} />
      : <RegisterComp register={this.register} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
