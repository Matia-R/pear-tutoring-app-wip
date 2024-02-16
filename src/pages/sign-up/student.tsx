import { SignedOut } from "@clerk/nextjs";
import type { ReactElement } from "react";
import Layout from "~/components/layout/Layout";
import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import { useUser } from "@clerk/nextjs";
import StudentSignUpForm from "~/components/sign-up/StudentSignUpForm"

export default function StudentSignUpPage() {

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
            <StudentSignUpForm />
        </SignedOut>
    );
}

StudentSignUpPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}