import { Alert } from 'react-native';

export default function prompt(title, message, callbackOrButtons, options) {
    Alert.prompt(title, message, callbackOrButtons, options.type, options.defaultValue, options.keyboardType);
}
