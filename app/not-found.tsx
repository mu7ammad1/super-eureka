import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='w-96 h-96 flex flex-col justify-center items-center gap-6'>
            <h2 className='text-9xl'>404</h2>
            <p className='text-3xl'>Not Found</p>
            <Button variant={'default'} size={'lg'} className='rounded-full'>
                <Link href="/">Return Home</Link>
            </Button>
        </div>
    )
}