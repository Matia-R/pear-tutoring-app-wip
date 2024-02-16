import { useState } from "react"
import { TutorIcon, StudentIcon } from "../common/SvgIcons"
import { Button } from "../common/Button"
import { useRouter } from "next/router"
import { CenteredFormDiv } from "../common/CenteredFormDiv"
import { GreenInlineLink } from "../common/GreenInlineLink"

enum SignUpOptions {
    STUDENT_SELECTED,
    TUTOR_SELECTED,
}

interface OptionSelectionProps {
    onSelect: () => void
    onSelectCondition: boolean
    label: string
    iconType: string
}

export default function SignUpOptionForm() {

    const [selection, setSelection] = useState(SignUpOptions.STUDENT_SELECTED)
    const router = useRouter()

    return (
        <CenteredFormDiv>
            <div className="mb-7">
                <h1 className="text-xl font-medium text-gray-800 mb-2">
                    Tell us about yourself
                </h1>
                <h1 className="text-md text-gray-500">
                    How would you like to join?
                </h1>
            </div>
            <div className='mb-7'>
                <OptionSelection
                    onSelect={() => setSelection(SignUpOptions.STUDENT_SELECTED)}
                    onSelectCondition={selection === SignUpOptions.STUDENT_SELECTED}
                    label='As a Student'
                    iconType='student'
                />
                <OptionSelection
                    onSelect={() => setSelection(SignUpOptions.TUTOR_SELECTED)}
                    onSelectCondition={selection === SignUpOptions.TUTOR_SELECTED}
                    label='As a Tutor'
                    iconType='tutor'
                />
            </div>
            <div className='mb-2'>
                <Button
                    onClick={() =>
                        selection === SignUpOptions.STUDENT_SELECTED
                            ? router.push('/sign-up/student')
                            : router.push('/sign-up/tutor')
                    }
                    buttonStyle="btn-solid-green"
                    buttonSize="btn-skinny-stretch">
                    Continue
                </Button>
            </div>
            <div className="flex">
                <p className="text-sm pr-1">
                    Have an account?
                </p>
                <GreenInlineLink text='Sign in' href='/sign-in' />
            </div>
        </CenteredFormDiv>
    )
}

// TODO: Add tutor and student icons
const OptionSelection: React.FC<OptionSelectionProps> = ({ onSelect, onSelectCondition, label, iconType }) => {
    return (
        <button
            className='block w-full rounded-lg focus:outline-offset-2 focus:outline-green-600 mb-2'
            onClick={onSelect}>
            <div className={onSelectCondition
                ? 'flex justify-between rounded-lg border-2 border-green-600 px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-all hover:cursor-pointer'
                : 'flex justify-between rounded-lg border-2 border-gray-300 px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-all hover:cursor-pointer'}>
                <div className='flex space-between space-x-2'>
                    {iconType === 'student'
                        ? <StudentIcon width='16' height='16' recolorStyle={onSelectCondition ? 'green-600' : 'gray-500'} />
                        : <TutorIcon width='18' height='18' recolorStyle={onSelectCondition ? 'green-600' : 'gray-500'} />}
                    <p
                        className={onSelectCondition ? 'text-green-600' : 'text-gray-500'}>
                        {label}
                    </p>
                </div>
                <div className='xs:px-10'></div>
            </div>
        </button>
    )
}