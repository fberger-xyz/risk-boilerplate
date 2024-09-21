'use client'

import { useRouter } from 'next/navigation'
import IconWrapper from './IconWrapper'
import { IconIds } from '@/enums'

export default function GoBack() {
    const router = useRouter()
    return (
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600">
            <IconWrapper icon={IconIds.CARBON_CHEVRON_LEFT} className={''} />
            <p className="text-sm">Back</p>
        </button>
    )
}
