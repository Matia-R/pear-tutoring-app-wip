import { useState, useEffect } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { Button } from "../common/Button";
import ReactInputVerificationCode from 'react-input-verification-code'
import { type SubmitHandler, useForm } from "react-hook-form"
import { parseError, type APIResponseError } from "~/utils/clerk";
import { Validations } from "~/utils/form-validations";
import { type Subjects } from "~/utils/subjects";
import { TextInput } from "../form-inputs/TextInput";
import { CheckboxInput } from "../form-inputs/CheckboxInput";
import { CenteredFormDiv } from "../common/CenteredFormDiv";
import { EditIcon } from "../common/SvgIcons";
import { Listbox } from "../common/Listbox";
import { GreenInlineLink } from "../common/GreenInlineLink";

interface TutorSignUpInputs extends Subjects {
    firstName: string
    lastName: string
    institution: string
    yearLevel: string
    program: string
    gpa: string
    emailAddress: string
    password: string
    acceptedTerms?: boolean
    clerkError?: string
}

enum SignUpFormSteps {
    STUDENT_INFO_FORM,
    SIGNUP_FORM,
    CODE,
}

const yearLevels = [
    'Year 1',
    'Year 2',
    'Year 3',
    'Year 4',
    'Graduate'
]

type InputSubjectType = "english" | "french" | "math" | "science" | "chemistry" | "physics" | "other"
const checkboxSubjects = ['english', 'french', 'math', 'science', 'chemistry', 'physics'] as InputSubjectType[]

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

export default function TutorSignUpForm() {

    const { isLoaded, setSession, signUp } = useSignUp()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [verificationCode, setVerificationCode] = useState('')
    const [codeVerificationErrorStatus, setCodeVerificationErrorStatus] = useState(false)
    const [verificationCodeError, setVerificationCodeError] = useState('')
    const [formStep, setFormStep] = useState(SignUpFormSteps.STUDENT_INFO_FORM)
    const [selectedYearLevel, setSelectedYearLevel] = useState('Year 1')

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        setError,
        formState: { errors },
        watch,
        clearErrors,
    } = useForm<TutorSignUpInputs>()

    /* 
        Each checkbox has a validator to check whether any other checkboxes are checked
        If any validator raises an error, we want all checkboxes to show that
     */
    const invalidSubjectsInput =
        !!errors.english?.message && !!errors.french?.message && !!errors.math?.message
        && !!errors.science?.message && !!errors.chemistry?.message && !!errors.physics?.message
        && !!errors.other?.message
    const invalidSubjectsInputMessage = 'Provide at least one subject'

    useEffect(() => {
        scrollToTop()
    }, [formStep])

    if (!isLoaded) {
        return null;
    }

    const subjectsCheckBoxInputValidation = () => {
        let selectedAtLeastOneSubject = false
        const subjectInputs = getValues([...checkboxSubjects, 'other'] as InputSubjectType[])
        subjectInputs.forEach(input => {
            if (input) {
                selectedAtLeastOneSubject = true
            }
        })
        return (!selectedAtLeastOneSubject ? invalidSubjectsInputMessage : undefined)
    }

    const onTutorInfoFormSubmit: SubmitHandler<TutorSignUpInputs> = ({ yearLevel }) => {

        if (!yearLevel) {
            setValue('yearLevel', 'Year 1')
        }
        setFormStep(SignUpFormSteps.SIGNUP_FORM)

    }

    const onSignUpFormSubmit: SubmitHandler<TutorSignUpInputs> = async ({
        firstName,
        lastName,
        institution,
        yearLevel,
        program,
        gpa,
        english,
        french,
        math,
        science,
        chemistry,
        physics,
        other,
        emailAddress,
        password,
        acceptedTerms,
    }) => {

        try {
            setIsLoading(true);

            const role = 'tutor'

            const signUpAttempt = await signUp.create({
                firstName,
                lastName,
                emailAddress,
                password,
                unsafeMetadata: {
                    role,
                    institution,
                    yearLevel,
                    program,
                    gpa,
                    english,
                    french,
                    math,
                    science,
                    chemistry,
                    physics,
                    other,
                    acceptedTerms,
                }
            })
            await signUpAttempt.prepareEmailAddressVerification();
            setFormStep(SignUpFormSteps.CODE);
        } catch (err) {
            setError("clerkError", {
                type: "manual",
                message: parseError(err as APIResponseError),
            });
        } finally {
            setIsLoading(false);
        }
    }

    const verifySignUpCode: SubmitHandler<object> = async function () {
        try {
            setIsLoading(true);
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code: verificationCode,
            })
            if (signUpAttempt.status === "complete") {
                /* eslint-disable */
                await signUpComplete(signUpAttempt.createdSessionId!)
                /* eslint-disable */
            }
        } catch (err) {
            setCodeVerificationErrorStatus(true)
            setVerificationCodeError(parseError(err as APIResponseError))
        } finally {
            setIsLoading(false);
        }
    }

    const resendSignUpCodeButtonHandler = () => {
        void resendSignUpCode()
    }

    const resendSignUpCode = async function () {
        await signUp.prepareEmailAddressVerification();
    }

    /** Clerk API related errors on change. */
    watch(() => errors.clerkError && clearErrors("clerkError"));

    const signUpComplete = async (createdSessionId: string) => {
        /** Couldn't the signup be updated and have the createdSessionId ? */
        await setSession(createdSessionId, () => router.push("/tutor/my-students"));
    }

    return (
        <CenteredFormDiv>
            {errors.clerkError?.message && (
                <div className="flex p-3 border-2 border-red-300 bg-red-100 rounded-md justify-center align-middle mb-5">
                    <p className='text-sm text-red-400'>{errors.clerkError?.message}</p>
                </div>
            )}
            {formStep === SignUpFormSteps.STUDENT_INFO_FORM && (
                <form onSubmit={handleSubmit(onTutorInfoFormSubmit)}>
                    <div className="mb-7">
                        <h1 className="text-xl font-medium text-gray-800 mb-2">
                            Tutor Information
                        </h1>
                        <h1 className="text-md text-gray-500">
                            Help us pair you with the right students
                        </h1>
                    </div>
                    {/* have fname + lname fields be stacked vertically on small displays */}
                    <div className="sm:flex mb-5">
                        <div className="sm:mr-5">
                            <TextInput
                                autoFocus
                                {...register('firstName', Validations.firstName)}
                                label='First Name'
                                errorText={errors.firstName?.message}
                            />
                        </div>
                        <div className="pt-2 sm:pt-0">
                            <TextInput
                                {...register('lastName', Validations.lastName)}
                                label='Last Name'
                                errorText={errors.lastName?.message}
                            />
                        </div>
                    </div>
                    <div className='mb-5'>
                        <TextInput
                            {...register('institution')}
                            label='University / Institution'
                        />
                    </div>
                    <div className='mb-5'>
                        <TextInput
                            label='Program'
                            {...register('program')}
                        />
                    </div>
                    <div className='mb-5'>
                        <label
                            className="block mb-2 text-sm font-medium text-gray-800">
                            Year / Level
                        </label>
                        <Listbox
                            name='yearLevel'
                            onChange={(value: string) => {
                                register('yearLevel')
                                setValue('yearLevel', value)
                                setSelectedYearLevel(value)
                            }}
                            value={selectedYearLevel}
                            optionsList={yearLevels}
                        />
                    </div>
                    <div className='mb-5'>
                        <TextInput
                            {...register('gpa', Validations.gpa)}
                            label='GPA'
                            errorText={errors.gpa?.message}
                        />
                    </div>
                    <div className='mb-5'>
                        <label
                            htmlFor="subjects"
                            className="block mb-2 text-sm font-medium text-gray-800">
                            Subjects
                        </label>
                        <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                            {checkboxSubjects.map((subject) => (
                                <CheckboxInput
                                    key={`${subject}-checkbox`}
                                    {...register(subject, {
                                        validate: () => subjectsCheckBoxInputValidation()
                                    })}
                                    id={`${subject}-checkbox`}
                                    label={subject.charAt(0).toUpperCase() + subject.slice(1)}
                                    error={invalidSubjectsInput}
                                />
                            ))}
                        </div>
                        <div className='pt-2'>
                            <p className='mb-2 text-sm'>Other</p>
                            <TextInput
                                {...register('other', {
                                    validate: () => subjectsCheckBoxInputValidation()
                                })}
                                errorText={invalidSubjectsInput ? invalidSubjectsInputMessage : ''}
                            />
                        </div>
                    </div>
                    <div className="pb-5">
                        <Button
                            buttonStyle="btn-solid-green"
                            buttonSize="btn-skinny-stretch"
                            formSubmitType
                            loading={isLoading}>
                            Continue
                        </Button>
                    </div>
                    <div className="flex">
                        <p className="text-sm pr-1">
                            Have an account?
                        </p>
                        <GreenInlineLink text='Sign in' href="/sign-in" />
                    </div>
                </form>
            )}
            {formStep === SignUpFormSteps.SIGNUP_FORM && (
                <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
                    <div className="mb-7">
                        <h1 className="text-xl font-medium text-gray-800">
                            Create Your Account
                        </h1>
                    </div>
                    <div className="mb-5">
                        <TextInput
                            autoFocus
                            {...register('emailAddress', Validations.emailAddress)}
                            type='email'
                            errorText={errors.emailAddress?.message}
                            label='Email'
                        />
                    </div>
                    <div className="mb-5">
                        <TextInput
                            {...register('password', Validations.password)}
                            errorText={errors.password?.message}
                            label='Password'
                            type="password"
                        />
                    </div>
                    <div className="pb-5">
                        <div className='flex'>
                            <div className='align-top pt-1'>
                                <CheckboxInput
                                    id='accepted-terms-checkbox'
                                    {...register('acceptedTerms', Validations.terms)}
                                    label={
                                        <div className='pt-3.5'>
                                            <p className="text-sm pr-1 max-w-[300px]">
                                                By signing up, you agree to Pear Tutoring&apos;s <GreenInlineLink text='Terms of Service' href="/terms-of-service" />
                                            </p>
                                        </div>
                                    }
                                    error={!!errors.acceptedTerms?.message}
                                />
                            </div>
                        </div>
                        {errors.acceptedTerms?.message && (
                            <p className="text-sm text-red-500 pt-2">{errors.acceptedTerms?.message}</p>
                        )}
                    </div>
                    <div className="flex pb-7 space-x-2">
                        <Button
                            onClick={() => {
                                clearErrors('clerkError')
                                setFormStep(SignUpFormSteps.STUDENT_INFO_FORM)
                            }}
                            buttonStyle="btn-outline-gray"
                            buttonSize="btn-skinny-stretch">
                            Back
                        </Button>
                        <Button
                            onClick={handleSubmit(onSignUpFormSubmit)}
                            buttonStyle="btn-solid-green"
                            buttonSize="btn-skinny-stretch"
                            loading={isLoading}>
                            Continue
                        </Button>
                    </div>
                </form>
            )}
            {formStep === SignUpFormSteps.CODE && (
                <div>
                    <form onSubmit={handleSubmit(verifySignUpCode)}>
                        <div>
                            <h1 className="text-xl text-medium mb-2">Verify your email</h1>
                            <h2 className="text-md text-gray-700">To continue to Pear Tutoring</h2>
                        </div>
                        <div className="flex justify-between items-center my-12 bg-gray-50 border border-gray-300 shadow-sm p-2 rounded-lg text-md text-gray-700">
                            <h2 className='text-center overflow-hidden'>{getValues('emailAddress')}</h2>
                            <div className="pl-2 hover:cursor-pointer" onClick={() => setFormStep(SignUpFormSteps.SIGNUP_FORM)}>
                                <EditIcon width='15' height='15' recolorStyle='gray-700' />
                            </div>
                        </div>
                        <h2 className="text-sm text-bold mb-2">Verification Code</h2>
                        <h2 className="text-sm text-gray-700 mb-2">Enter the verification code sent to your email</h2>
                        <div className="flex flex-col justify-center mb-5">
                            {/* TODO: Add additional styling to make verification code input field turn red when errors */}
                            <div className="custom-styles">
                                <ReactInputVerificationCode
                                    autoFocus
                                    onChange={setVerificationCode}
                                    placeholder=""
                                    length={6}
                                    value={verificationCode} />
                            </div>
                            {codeVerificationErrorStatus && (
                                <div>
                                    <p className="text-sm text-red-500 pt-2 max-w-sm">{verificationCodeError}</p>
                                </div>
                            )}
                        </div>
                        <div className="flex pb-7 space-x-2">
                            <Button
                                onClick={() => setFormStep(SignUpFormSteps.SIGNUP_FORM)}
                                buttonStyle="btn-outline-gray"
                                buttonSize="btn-skinny-stretch">
                                Back
                            </Button>
                            <Button
                                onClick={handleSubmit(verifySignUpCode)}
                                buttonStyle="btn-solid-green"
                                buttonSize="btn-skinny-stretch"
                                loading={isLoading}>
                                Verify
                            </Button>
                        </div>
                        <p
                            onClick={() => {
                                setVerificationCode('')
                                resendSignUpCodeButtonHandler()
                            }}
                            className="text-md text-green-600 font-medium leading-5 truncate hover:text-green-700 hover:cursor-pointer hover:underline">Resend code</p>
                    </form>
                </div>
            )}
        </CenteredFormDiv>
    );
}