import { CenteredFormDiv } from "../common/CenteredFormDiv";
import { useForm } from 'react-hook-form'
import { useState } from "react";
import { TextInput } from "../form-inputs/TextInput";
import { Validations } from "~/utils/form-validations";
import { useSignIn } from "@clerk/nextjs";
import { type APIResponseError } from "~/utils/clerk"
import { parseError } from "~/utils/clerk";
import { Button } from "../common/Button";
import { GreenInlineLink } from "../common/GreenInlineLink";
import { EditIcon } from "../common/SvgIcons";
import { type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

enum SignInFormSteps {
    EMAIL,
    PASSWORD
}

interface SignInInputs {
    emailAddress: string
    password: string
}

export default function SignInForm() {

    const [formStep, setFormStep] = useState(SignInFormSteps.EMAIL)
    const [isLoading, setIsLoading] = useState(false)
    const { signIn, setSession } = useSignIn()
    const [firstName, setFirstName] = useState("")
    const router = useRouter()
    const {
        register,
        handleSubmit,
        setError,
        getValues,
        formState: { errors },
    } = useForm<SignInInputs>()

    const getFirstName = async function () {
        const emailAddress = getValues("emailAddress");
        const signInAttempt = await signIn?.create({
            identifier: emailAddress,
        })

        setFirstName(signInAttempt?.userData.firstName || "");
    }

    const verifyEmail = async function () {
        try {
            setIsLoading(true)
            await getFirstName()
            setFormStep(SignInFormSteps.PASSWORD)
        } catch (err) {
            setError("emailAddress", {
                type: "manual",
                message: parseError(err as APIResponseError),
            });
        } finally {
            setIsLoading(false);
        }
    }

    const verifyPassword: SubmitHandler<SignInInputs> = async ({
        password,
    }) => {
        try {
            setIsLoading(true);
            const signInAttempt = await signIn?.attemptFirstFactor({
                strategy: "password",
                password,
            });
            if (signInAttempt?.status === "complete") {
                const createdSessionId = signInAttempt.createdSessionId
                /* eslint-disable */
                await setSession!(createdSessionId, () => router.push('/sign-in/redirect'))
                /* eslint-disable */
            }
        } catch (err) {
            setError("password", {
                type: "manual",
                message: parseError(err as APIResponseError).split('.')[0],
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CenteredFormDiv>
            {formStep === SignInFormSteps.EMAIL && (
                <form onSubmit={handleSubmit(verifyEmail)}>
                    <div className="mb-2">
                        <h1 className="text-xl font-medium text-gray-800 mb-2">
                            Sign in
                        </h1>
                        <h1 className="text-md text-gray-500 xs:pr-24">
                            to continue to Pear Tutoring
                        </h1>
                        <div className='pt-5 mb-5'>
                            <TextInput
                                label="Email"
                                {...register("emailAddress", Validations.emailAddress)}
                                errorText={errors.emailAddress?.message}
                                autoFocus
                            />
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
                                Don&apos;t have an account?
                            </p>
                            <GreenInlineLink text='sign up' href='/sign-up' />
                        </div>
                    </div>
                </form>
            )}
            {formStep === SignInFormSteps.PASSWORD && (
                <form onSubmit={handleSubmit(verifyPassword)}>
                    <h1 className="text-xl font-medium text-gray-800 mb-2">
                        Enter your password
                    </h1>
                    <h1 className="text-md text-gray-500">
                        Welcome back {firstName}!
                    </h1>
                    <div className="flex justify-between items-center my-7 bg-gray-50 border border-gray-300 shadow-sm p-2 rounded-lg text-md text-gray-700 xs:w-[305px]">
                        <h2 className='text-center overflow-hidden'>{getValues('emailAddress')}</h2>
                        <div className="pl-2 hover:cursor-pointer" onClick={() => setFormStep(SignInFormSteps.EMAIL)}>
                            <EditIcon width='15' height='15' recolorStyle='gray-700' />
                        </div>
                    </div>
                    <div className='mb-5'>
                        <TextInput
                            label="Password"
                            {...register('password')}
                            errorText={errors.password?.message}
                            type='password'
                            autoFocus
                        />
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
                        <GreenInlineLink text='Forgot password?' href='/forgot-password' />
                    </div>
                </form>
            )}
        </CenteredFormDiv>
    )
}