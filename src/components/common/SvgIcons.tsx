import type { FunctionComponent } from "react"
import Image from "next/image"

type SafeNumber = number | `${number}`

export type SvgIconProps = {
    src?: string,
    alt?: string,
    width: SafeNumber,
    height: SafeNumber,
    recolorStyle?: string,
}

const COMMON_STYLES = {
    maxWidth: 'none',
}

const RECOLOR_STYLES: Record<string, string> = {
    'green-600': 'invert(43%) sepia(96%) saturate(426%) hue-rotate(89deg) brightness(94%) contrast(88%)',
    'gray-500': 'invert(43%) sepia(6%) saturate(877%) hue-rotate(182deg) brightness(101%) contrast(88%)',
    'gray-700': 'invert(24%) sepia(6%) saturate(2058%) hue-rotate(178deg) brightness(94%) contrast(92%)'
}

export const SvgIcon: FunctionComponent<SvgIconProps> = (props: SvgIconProps) => {
    return (
        <Image
            src={props.src as string}
            alt={props.alt as string}
            width={props.width}
            height={props.height}
            style={{ ...COMMON_STYLES, filter: props.recolorStyle ? RECOLOR_STYLES[props.recolorStyle] : '' }}
        />
    )
}

export const RightArrowIcon: FunctionComponent<SvgIconProps> = (props: SvgIconProps) => {
    return (
        <Image
            src='/img/right-arrow.svg'
            alt='Right Arrow Icon'
            width={props.width}
            height={props.height}
            style={{ ...COMMON_STYLES, filter: props.recolorStyle ? RECOLOR_STYLES[props.recolorStyle] : '' }}
        />
    )
}

export const TutorIcon: FunctionComponent<SvgIconProps> = (props: SvgIconProps) => {
    return (
        <Image
            src='/img/tutor-icon.svg'
            alt='Tutor Icon'
            width={props.width}
            height={props.height}
            style={{ ...COMMON_STYLES, filter: props.recolorStyle ? RECOLOR_STYLES[props.recolorStyle] : '' }}
        />
    )
}

export const StudentIcon: FunctionComponent<SvgIconProps> = (props: SvgIconProps) => {
    return (
        <Image
            src='/img/student-icon.svg'
            alt='Student Icon'
            width={props.width}
            height={props.height}
            style={{ ...COMMON_STYLES, filter: props.recolorStyle ? RECOLOR_STYLES[props.recolorStyle] : '' }}
        />
    )
}

export const SettingsGearIcon: FunctionComponent<SvgIconProps> = (props: SvgIconProps) => {
    return (
        <Image
            src='/img/settings-gear-icon.svg'
            alt='Settings Gear Icon'
            width={props.width}
            height={props.height}
            style={{ ...COMMON_STYLES, filter: props.recolorStyle ? RECOLOR_STYLES[props.recolorStyle] : '' }}
        />
    )
}

export const EditIcon: FunctionComponent<SvgIconProps> = (props: SvgIconProps) => {
    return (
        <Image
            src='/img/edit-icon.svg'
            alt='Edit Icon'
            width={props.width}
            height={props.height}
            style={{ ...COMMON_STYLES, filter: props.recolorStyle ? RECOLOR_STYLES[props.recolorStyle] : '' }}
        />
    )
}

export const SignOutIcon: FunctionComponent<SvgIconProps> = (props: SvgIconProps) => {
    return (
        <Image
            src='/img/sign-out-icon.svg'
            alt='Sign Out Icon'
            width={props.width}
            height={props.height}
            style={{ ...COMMON_STYLES, filter: props.recolorStyle ? RECOLOR_STYLES[props.recolorStyle] : '' }}
        />
    )
}