import React, {Component} from 'react';
import {View} from 'react-native';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

export default class FBLoginButton extends Component {
  _responseInfoCallback = (error, result) => {
    console.log(result);
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      alert('Result Name: ' + result.name);
      // console.warn(result);
      this.props.callback(result);
    }
  };

  render() {
    return (
      <View>
        <LoginButton
          publishPermissions={['publish_actions']}
          permissions={['email', 'public_profile']}
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('login has error: ', result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                // console.warn(data);
                const infoRequest = new GraphRequest(
                  '/me',
                  {
                    parameters: {
                      fields: {
                        string:
                          'id,first_name,last_name,name,picture.type(large),email', // what you want to get
                      },
                      access_token: {
                        string: data.accessToken.toString(), // put your accessToken here
                      },
                    },
                  },
                  this._responseInfoCallback, // make sure you define _responseInfoCallback in same class
                );
                // Start the graph request.
                new GraphRequestManager().addRequest(infoRequest).start();
              });
            }
          }}
          onLogoutFinished={() => this.props.callback({})}
        />
      </View>
    );
  }
}
