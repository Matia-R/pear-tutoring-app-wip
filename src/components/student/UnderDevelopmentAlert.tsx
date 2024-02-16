import { WrenchIcon } from '@heroicons/react/24/outline';
import { Alert, AlertDescription, AlertTitle } from '~/components/common/Alert'
// import Link from 'next/link';


export function UnderDevelopmentAlert() {
    return (
        <Alert variant={'warning'}>
            <WrenchIcon className='h-5 w-5' />
            <AlertTitle>Under Construction!</AlertTitle>
            <AlertDescription>
                This is a WIP build, student features coming soon...
            </AlertDescription>
            {/* <AlertDescription>
                In the meantime, check out our <Link href='/' className='underline'>FAQ</Link> to learn more about becoming a tutor!
            </AlertDescription> */}
            <AlertDescription>
                FAQ under way, stay tuned!
            </AlertDescription>
        </Alert>
    )
}