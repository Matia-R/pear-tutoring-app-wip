import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Alert, AlertDescription, AlertTitle } from '~/components/common/Alert'
import Link from 'next/link';


export function PendingVerificationAlert() {
    return (
        <Alert variant={'warning'}>
            <InformationCircleIcon className='h-5 w-5' />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                Your tutor application is currently under review. Once verified, you will gain full access to the app.
            </AlertDescription>
            <AlertDescription>
                In the meantime, check out our <Link href='/' className='underline'>FAQ</Link> to learn more about becoming a tutor!
            </AlertDescription>
        </Alert>
    )
}