import type { ReactElement } from 'react';
import InAppLayout from '~/components/layout/StudentLayout';

export default function ProtectedPage() {
    return (
        <div>

        </div>
    );
}

ProtectedPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <InAppLayout >
            {page}
        </InAppLayout>
    )
}
