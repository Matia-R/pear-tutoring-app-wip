import type { ReactElement } from 'react';
import StudentLayout from '~/components/layout/StudentLayout';
import { UnderDevelopmentAlert } from '~/components/student/UnderDevelopmentAlert';

export default function StudentLessonsPage() {
    return (
        <div className='px-10 mt-6'>
            <UnderDevelopmentAlert />
        </div>
    );
}

StudentLessonsPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <StudentLayout>
            {page}
        </StudentLayout>
    )
}