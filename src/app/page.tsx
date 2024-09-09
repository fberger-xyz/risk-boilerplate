'use client'

import { useSearchParams } from 'next/navigation'
import SafeLinks from '@/components/SafeLinks'

export default function Page() {
    const searchParams = useSearchParams()
    const urlAddress = searchParams.get('address')
    return <SafeLinks urlAddress={urlAddress} />
}
