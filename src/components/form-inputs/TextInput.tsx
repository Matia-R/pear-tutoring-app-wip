import React from "react"

const inputFieldStyles =
    'appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-600 focus:ring-1 outline-none focus:outline-none block w-full p-2.5'
const inputFieldStylesWithError =
    'bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg ring-red-500 ring-1 outline-none block w-full p-2.5'

const TextInput = React.forwardRef<
    HTMLInputElement,
    {
        label?: string;
        type?: string;
        errorText?: string;
        onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
        autoFocus?: boolean;
        badge?: React.ReactNode | string;
    } & React.InputHTMLAttributes<HTMLInputElement>
>(
    (
        {
            autoFocus,
            label,
            errorText,
            onPaste,
            type,
            ...rest
        },
        ref
    ) => {
        return (
            <>
                {label && (
                    <label
                        className="block mb-2 text-sm font-medium text-gray-800">
                        {label}
                    </label>
                )}
                <div className='w-full'>

                </div>
                <input
                    className={!errorText ? inputFieldStyles : inputFieldStylesWithError}
                    autoFocus={autoFocus}
                    onPaste={onPaste}
                    type={type}
                    ref={ref}
                    autoCapitalize='off'
                    {...rest}
                />
                {errorText && (
                    <div>
                        <div className="text-sm text-red-500 pt-2">{errorText}</div>
                    </div>
                )}
            </>
        );
    }
);

TextInput.displayName = 'TextInput';

export { TextInput };