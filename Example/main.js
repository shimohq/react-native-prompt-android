import React, { Component } from 'react';
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
            password: ''
        };
    };

    _prompt() {
        prompt(
            'Enter password',
            'Enter your password to claim your $1.5B in lottery winnings',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: password => {
                    this.setState({ password });
                    console.log('OK Pressed, password: ' + password);
                }},
            ],
            {
                type: 'secure-text',
                cancelable: false,
                defaultValue: 'test',
                placeholder: 'placeholder'
            }
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this._prompt.bind(this)}
                    underlayColor="#ccc"
                >
                    <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>SET PASSWORD</Text>
                    </View>
                </TouchableHighlight>
                <Text style={styles.title}>Your password</Text>
                <Text style={styles.input}>{this.state.password}</Text>
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
        borderBottomWidth: StyleSheet.hairlineWidth
    }
});

AppRegistry.registerComponent('PromptAndroid', () => PromptAndroid);
