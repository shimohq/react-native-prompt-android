package im.shimo.react.prompt;


import android.app.Dialog;
import android.app.DialogFragment;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.text.InputType;
import android.view.LayoutInflater;
import android.widget.EditText;


import javax.annotation.Nullable;

public class RNPromptFragment extends DialogFragment implements DialogInterface.OnClickListener {

    /* package */ static final String ARG_TITLE = "title";
    /* package */ static final String ARG_MESSAGE = "message";
    /* package */ static final String ARG_BUTTON_POSITIVE = "button_positive";
    /* package */ static final String ARG_BUTTON_NEGATIVE = "button_negative";
    /* package */ static final String ARG_BUTTON_NEUTRAL = "button_neutral";
    /* package */ static final String ARG_ITEMS = "items";
    /* package */ static final String ARG_TYPE = "type";
    /* package */ static final String ARG_STYLE = "style";
    /* package */ static final String ARG_DEFAULT_VALUE = "defaultValue";
    /* package */ static final String ARG_PLACEHOLDER = "placeholder";

    private EditText mInputText;

    public enum PromptTypes {
        TYPE_DEFAULT("default"),
        PLAIN_TEXT("plain-text"),
        SECURE_TEXT("secure-text");

        private final String mName;

        PromptTypes(final String name) {
            mName = name;
        }

        @Override
        public String toString() {
            return mName;
        }
    }

    private final
    @Nullable
    RNPromptModule.PromptFragmentListener mListener;

    public RNPromptFragment() {
        mListener = null;
    }

    public RNPromptFragment(@Nullable RNPromptModule.PromptFragmentListener listener, Bundle arguments) {
        mListener = listener;
        setArguments(arguments);
    }

    public static Dialog createDialog(
        Context activityContext, Bundle arguments, RNPromptFragment fragment) {

        AlertDialog.Builder builder;
        String style = arguments.containsKey(ARG_STYLE) ? arguments.getString(ARG_STYLE) : "default";
        style = style != null ? style : "default";

        // AlertDialog style
        switch (style) {
            case "shimo":
                builder = new AlertDialog.Builder(activityContext, R.style.ShimoAlertDialogStyle);
                break;
            default:
                builder = new AlertDialog.Builder(activityContext);
        }

        builder.setTitle(arguments.getString(ARG_TITLE));

        if (arguments.containsKey(ARG_BUTTON_POSITIVE)) {
            builder.setPositiveButton(arguments.getString(ARG_BUTTON_POSITIVE), fragment);
        }
        if (arguments.containsKey(ARG_BUTTON_NEGATIVE)) {
            builder.setNegativeButton(arguments.getString(ARG_BUTTON_NEGATIVE), fragment);
        }
        if (arguments.containsKey(ARG_BUTTON_NEUTRAL)) {
            builder.setNeutralButton(arguments.getString(ARG_BUTTON_NEUTRAL), fragment);
        }
        // if both message and items are set, Android will only show the message
        // and ignore the items argument entirely
        if (arguments.containsKey(ARG_MESSAGE)) {
            builder.setMessage(arguments.getString(ARG_MESSAGE));
        }

        if (arguments.containsKey(ARG_ITEMS)) {
            builder.setItems(arguments.getCharSequenceArray(ARG_ITEMS), fragment);
        }

        AlertDialog alertDialog = builder.create();

        // input style
        LayoutInflater inflater = LayoutInflater.from(activityContext);
        final EditText input;
        switch (style) {
            case "shimo":
                input = (EditText) inflater.inflate(R.layout.edit_text, null);
                break;
            default:
                input = new EditText(activityContext);
        }

        // input type
        int type = InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS;
        if (arguments.containsKey(ARG_TYPE)) {
            String typeString = arguments.getString(ARG_TYPE);
            if (typeString != null) {
                switch (typeString) {
                    case "secure-text":
                        type = InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD;
                        break;
                    case "plain-text":
                    default:
                        type = InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS;
                }
            }
        }
        input.setInputType(type);

        fragment.setTextInput(input);

        if (arguments.containsKey(ARG_DEFAULT_VALUE)) {
            String defaultValue = arguments.getString(ARG_DEFAULT_VALUE);
            if (defaultValue != null) {
                input.setText(defaultValue);
                int textLength = input.getText().length();
                input.setSelection(textLength, textLength);
            }
        }

        if (arguments.containsKey(ARG_PLACEHOLDER)) {
            input.setHint(arguments.getString(ARG_PLACEHOLDER));
        }

        alertDialog.setView(input, 50, 15, 50, 0);

        return alertDialog;
    }

    public void setTextInput(EditText input) {
        mInputText = input;
    }

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        return createDialog(getActivity(), getArguments(), this);
    }

    @Override
    public void onClick(DialogInterface dialog, int which) {
        if (mListener != null) {
            mListener.onConfirm(which, mInputText.getText().toString());
        }
    }

    @Override
    public void onDismiss(DialogInterface dialog) {
        super.onDismiss(dialog);
        if (mListener != null) {
            mListener.onDismiss(dialog);
        }
    }
}
