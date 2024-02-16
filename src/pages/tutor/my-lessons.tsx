import type { ReactElement } from 'react';
import TutorLayout from '~/components/layout/TutorLayout';
import { PendingVerificationAlert } from '~/components/tutor/PendingVerificationAlert';
import { api } from '~/utils/api';

export default function TutorLessonsPage() {

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

TutorLessonsPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <TutorLayout >
            {page}
        </TutorLayout>
    )
}