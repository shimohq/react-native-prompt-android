import {
    AlertIOS
} from 'react-native';

export default function prompt(
    title: ?string,
    message?: ?string,
    callbackOrButtons?: ?((text: string) => void) | Object,
    options?: Object
): void {
    AlertIOS.prompt(title, message, callbackOrButtons, options.type, options.defaultValue);
};
