import {
    NativeModules
} from 'react-native';
const PromptAndroid = NativeModules.PromptAndroid;

export type PromptType = $Enum<{
    /**
     * Default alert with no inputs
     */
        'default': string,
    /**
     * Plain text input alert
     */
        'plain-text': string,
    /**
     * Secure text input alert
     */
        'secure-text': string,
    /**
     * Numeric input alert
     */
        'numeric': string,
    /**
     * Email address input alert
     */
        'email-address': string,
    /**
     * Phone pad input alert
     */
        'phone-pad': string,
}>;

export type PromptStyle = $Enum<{
    /**
     * Default alert dialog style
     */
    'default': string,
    /**
     * Shimo alert dialog style
     */
    'shimo': string,
}>;

type Options = {
    cancelable?: ?boolean;
    type?: ?PromptType;
    defaultValue?: ?String;
    placeholder?: ?String;
    style?: ?PromptStyle;
};

/**
 * Array or buttons
 * @typedef {Array} ButtonsArray
 * @property {string=} text Button label
 * @property {Function=} onPress Callback function when button pressed
 */
type ButtonsArray = Array<{
    /**
     * Button label
     */
        text?: string,
    /**
     * Callback function when button pressed
     */
        onPress?: ?Function,
}>;

export default function prompt(
    title: ?string,
    message?: ?string,
    callbackOrButtons?: ?((text: string) => void) | ButtonsArray,
    options?: Options
): void {
    const defaultButtons = [
      {
        text: 'Cancel',
      },
      {
        text: 'OK',
        onPress: callbackOrButtons
      }
    ];

    let buttons = typeof callbackOrButtons === 'function'
      ? defaultButtons
      : callbackOrButtons;
      
    let config = {
        title: title || '',
        message: message || '',
    };

    if (options) {
        config = {
            ...config,
            cancelable: options.cancelable !== false,
            type: options.type || 'default',
            style: options.style || 'default',
            defaultValue: options.defaultValue || '',
            placeholder: options.placeholder || ''
        };
    }
    // At most three buttons (neutral, negative, positive). Ignore rest.
    // The text 'OK' should be probably localized. iOS Alert does that in native.
    const validButtons: Buttons = buttons ? buttons.slice(0, 3) : [{text: 'OK'}];
    const buttonPositive = validButtons.pop();
    const buttonNegative = validButtons.pop();
    const buttonNeutral = validButtons.pop();

    if (buttonNeutral) {
        config = {...config, buttonNeutral: buttonNeutral.text || '' };
    }
    if (buttonNegative) {
        config = {...config, buttonNegative: buttonNegative.text || '' };
    }
    if (buttonPositive) {
        config = {
            ...config,
            buttonPositive: buttonPositive.text || ''
        };
    }


    PromptAndroid.promptWithArgs(
        config,
        (action, buttonKey, input) => {
            if (action !== PromptAndroid.buttonClicked) {
                return;
            }
            if (buttonKey === PromptAndroid.buttonNeutral) {
                buttonNeutral.onPress && buttonNeutral.onPress(input);
            } else if (buttonKey === PromptAndroid.buttonNegative) {
                buttonNegative.onPress && buttonNegative.onPress();
            } else if (buttonKey === PromptAndroid.buttonPositive) {
                buttonPositive.onPress && buttonPositive.onPress(input);
            }
        }
    );
}
