import {
    AlertIOS
} from 'react-native';

export default function prompt(
    title: ?string,
    message?: ?string,
    callbackOrButtons?: ?((text: string) => void) | Object,
): void {
    AlertIOS.prompt(title, message, callbackOrButtons);
};
