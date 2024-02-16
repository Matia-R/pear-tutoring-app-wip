import Layout from '~/components/layout/Layout';
import type { ReactElement } from 'react';

export default function BecomeATutor() {
    return (
        <div>
        </div>
    );
}

BecomeATutor.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
