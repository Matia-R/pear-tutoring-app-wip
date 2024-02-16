import type { ReactElement } from "react";
import Layout from "~/components/layout/Layout";
import SignInForm from "~/components/sign-in/SignInForm";
import { SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SignInPage() {

    const router = useRouter()
    const { isLoaded, isSignedIn } = useUser()

    //redirect if signed in
    useEffect(() => {
        /* eslint-disable */
        if (isLoaded && isSignedIn) {
            router.push('/protected-page')
        }
        /* eslint-disable */
    })

    return (
        <SignedOut>
            <SignInForm />
        </SignedOut>
    );
}

SignInPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}