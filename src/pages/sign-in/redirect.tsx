import type { ReactElement } from "react";
import Layout from "~/components/layout/Layout";
import SignInForm from "~/components/sign-in/SignInForm";
import { SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { LoadingSpinnerLarge } from "~/components/common/LoadingSpinners";

export default function SignInPage() {

    const router = useRouter()
    const { isLoaded, isSignedIn, user } = useUser()

    //redirect to student / tutor lessons page
    useEffect(() => {
        /* eslint-disable */
        if (isLoaded && isSignedIn && user) {
            const role = user?.unsafeMetadata?.role
            router.push(`/${role}/my-lessons`)
        }
        /* eslint-disable */
    })

    return (
        <div>
            <SignedOut>
                <SignInForm />
            </SignedOut>
            <div className='flex pt-20 justify-center'>
                <LoadingSpinnerLarge />
            </div>
        </div>
    );
}

SignInPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}