/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, Button, Image} from 'react-native';
import FBLoginButton from './LoginButton';

const FBSDK = require('react-native-fbsdk');
const {LoginManager} = FBSDK;

function HomeScreen({navigation}) {
  const [info, setInfo] = React.useState({});
  const [style, setStyle] = React.useState({
    height: 0,
    width: 0,
  });

  const _getInfoUser = infomation => {
    console.log('hello');
    console.log(infomation);
    setInfo(infomation);
  };

  const checkObjectEmpty = obj => {
    return Object.entries(info).length === 0 && info.constructor === Object;
  };

  React.useEffect(() => {
    if (!checkObjectEmpty(info)) {
      setStyle({
        ...style,
        height: info.picture.data.height,
        width: info.picture.data.width,
      });
    }
  },[info]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {!checkObjectEmpty(info) ? (
        <Image source={{uri: info.picture.data.url}} style={{...style}}/>
      ) : null}
      <Text>{!checkObjectEmpty(info) ? info.name : 'Home Screen'}</Text>
      <Text>{!checkObjectEmpty(info)? info.email : "  "}</Text>
      <FBLoginButton callback={_getInfoUser} />
    </View>
  );
}

function DetailsScreen({route, navigation}) {
  /* 2. Get the param */
  const {itemId} = route.params;
  const {otherParam} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Overview'}}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
