import type { FunctionComponent, MouseEventHandler, ReactNode } from 'react';
import { SolidBackgroundLoadingSpinner } from './LoadingSpinners';

export type buttonProps = {
    children?: ReactNode,
    buttonStyle?: string,
    buttonSize?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    formSubmitType?: boolean
    loading?: boolean
}

const STYLES: Record<string, string> = {
    'btn-primary': '',
    'btn-white-flashy': 'bg-white text-green-500 hover:bg-white hover:bg-opacity-25 hover:text-white focus:bg-white focus:bg-opacity-25 focus:text-white',
    'btn-solid-green': 'bg-green-600 text-white hover:bg-green-700 focus:bg-green-700',
    'btn-outline-green': 'bg-white text-green-600 border border-green-600 hover:bg-green-50 focus:bg-green-50',
    'btn-outline-gray': 'bg-white text-gray-700 border border-gray-300 hover:text-gray-600 hover:bg-gray-50 focus:bg-gray-50'
    // 'btn-outline': 'tailwind style',
}

const SIZES: Record<string, string> = {
    'btn-small': 'py-2 px-4 text-md',
    'btn-medium': 'py-2 px-4 text-xl',
    'btn-large': 'py-4 px-8 text-xl',
    'btn-skinny-stretch': 'py-2 px-4 text-md w-full'
}

const commonStyles = 'flex justify-center rounded-md outline-none transition-all'

export const Button: FunctionComponent<buttonProps> = (props: buttonProps) => {

    /**
     * TODO: Fix this absolute dumpster fire literally wtf
     */

    const checkButtonStyle: string | undefined = STYLES[props.buttonStyle || ''] ?? STYLES['btn-primary'];
    const checkButtonSize: string | undefined = SIZES[props.buttonSize || ''] ?? SIZES['btn-medium'];
    return (
        <button
            disabled={props.loading}
            type={props?.formSubmitType ? 'submit' : 'button'}
            onClick={props.onClick}
            className={`${checkButtonStyle || ''} ${checkButtonSize || ''} ${commonStyles}`}>
            {props.loading ? <div className='opacity-90'><SolidBackgroundLoadingSpinner /></div> : props.children}
        </button>
    )

};