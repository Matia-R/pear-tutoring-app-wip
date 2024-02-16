import Layout from '~/components/layout/Layout';
import type { ReactElement } from 'react';
import { UserProfile } from "@clerk/nextjs"

export default function UserSettingsPage() {
    return (
        <div className="flex h-full justify-center align-middle">
            <UserProfile />
        </div>
    );
}

UserSettingsPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
