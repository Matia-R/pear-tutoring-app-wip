import React from "react"
import type { ReactNode } from "react";


const inputFieldStyles = 'form-checkbox w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 ring-transparent'
const inputFieldStylesWithError = 'form-checkbox w-4 h-4 text-green-600 bg-red-50 border-red-500 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 ring-transparent'

const CheckboxInput = React.forwardRef<
    HTMLInputElement,
    {
        id: string;
        label?: string | ReactNode;
        error?: boolean;
    } & React.InputHTMLAttributes<HTMLInputElement>
>(
    (
        {
            id,
            label,
            error,
            ...rest
        },
        ref
    ) => {

        return (
            <div className='flex items-center'>
                <input
                    id={id}
                    type='checkbox'
                    className={!error ? inputFieldStyles : inputFieldStylesWithError}
                    ref={ref}
                    {...rest}
                />
                <label className='ml-2 text-sm' htmlFor={id}>{label}</label>
            </div>
        )
    }
);

CheckboxInput.displayName = 'CheckboxInput';

export { CheckboxInput };