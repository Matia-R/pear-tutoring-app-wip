import type { ReactElement } from 'react';
import TutorLayout from '~/components/layout/TutorLayout';
import { api } from '~/utils/api';
import { PendingVerificationAlert } from '~/components/tutor/PendingVerificationAlert';
// import { RocketLaunchIcon } from '@heroicons/react/24/outline'

export default function MyStudentsPage() {

    const isVerified = api.tutors.getVerificationStatus.useQuery().data
    console.log(isVerified)
    if (!isVerified) {
        return (
            <div className='px-10 mt-6'>
                <PendingVerificationAlert />
            </div>
        )
    }

    return (
        <div>

        </div>
    );
}

MyStudentsPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <TutorLayout>
            {page}
        </TutorLayout>
    )
}