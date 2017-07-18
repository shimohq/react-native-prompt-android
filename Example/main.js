import React, { Component } from 'react';
import { Platform } from 'react-native';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

import prompt from 'react-native-prompt-android';

export default class PromptAndroid extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            password: '',
            age: '',
            phone: '',
            email: '',
        };
    }

    _prompt = (params) => {
      console.log(params);
        if (Platform.OS === 'android') {
            prompt(
                params.title,
                params.description,
                [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel'
                    },
                    {
                      text: 'OK', onPress: value =>
                      {
                        this.setState({ [params.name]: value });
                        console.log(`OK Pressed, ${params.name}: ${value}`);
                      }
                    },
                ],
                {
                    type: params.type,
                    cancelable: false,
                    defaultValue: params.defaultValue,
                    placeholder: 'placeholder',
                    style: 'shimo'
                }
            );
        } else {
            prompt(
                params.title,
                params.description,
                [
                    {
                      text: 'Cancel', onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel'
                    },
                    {
                      text: 'OK', onPress: value =>
                      {
                        this.setState({ [params.name]: value });
                        console.log(`OK Pressed, ${params.name}: ${value}`);
                      }
                    },
                ],
                {
                    type: params.type,
                    cancelable: false,
                    defaultValue: params.defaultValue,
                    placeholder: 'placeholder'
                }
            );
        }
    };

    render() {

        const password = {
          name: 'password',
          title: 'Enter password',
          description: 'Enter your password to claim your $1.5B in lottery winnings',
          type: 'secure-text',
          defaultValue: 'test',
        };

        const age = {
          name: 'age',
          title: 'Enter age',
          description: 'Enter your age',
          type: 'numeric',
          defaultValue: '20',
        };

        const phone = {
          name: 'phone',
          title: 'Enter phone',
          description: 'Enter your phone',
          type: 'phone-pad',
          defaultValue: '16051233223',
        };

        const email = {
          name: 'email',
          title: 'Enter email',
          description: 'Enter your email',
          type: 'email-address',
          defaultValue: 'test@test.com',
        };

        return (
            <View style={styles.container}>
              <View style={styles.buttonContainer}>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => this._prompt(password)}
                    underlayColor="#ccc"
                >
                    <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>SET PASSWORD</Text>
                    </View>
                </TouchableHighlight>
                <Text style={styles.title}>Your password</Text>
                <Text style={styles.input}>{this.state.password}</Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => this._prompt(age)}
                    underlayColor="#ccc"
                >
                    <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>SET AGE</Text>
                    </View>
                </TouchableHighlight>
                <Text style={styles.title}>Your age</Text>
                <Text style={styles.input}>{this.state.age}</Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => this._prompt(phone)}
                    underlayColor="#ccc"
                >
                    <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>SET PHONE</Text>
                    </View>
                </TouchableHighlight>
                <Text style={styles.title}>Your phone</Text>
                <Text style={styles.input}>{this.state.phone}</Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => this._prompt(email)}
                    underlayColor="#ccc"
                >
                    <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>SET EMAIL</Text>
                    </View>
                </TouchableHighlight>
                <Text style={styles.title}>Your email</Text>
                <Text style={styles.input}>{this.state.email}</Text>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    buttonContainer: {
        marginBottom: 10,
    },
    button: {
        borderRadius: 5,
        backgroundColor: '#aaa',
        paddingVertical: 5,
        paddingHorizontal: 10,
        height: 30
    },
    buttonContent: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: '#eee',
        marginBottom: 5,
    },
    title: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center'
    },
    input: {
        paddingHorizontal: 5,
        marginBottom: 10
    }
});

AppRegistry.registerComponent('PromptAndroid', () => PromptAndroid);
