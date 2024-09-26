import IconWrapper from '@/components/common/IconWrapper'
import { IconIds } from '@/enums'
import LinkWrapper from './LinkWrapper'

export default function LinkWithIcon({ children, href }: { href: string; children?: React.ReactNode }) {
    return (
        <LinkWrapper
            href={href}
            className="z-20 flex w-fit items-center gap-1 rounded-md hover:bg-gray-100 hover:text-white dark:hover:bg-gray-700"
            target="_blank"
        >
            {children}
            <IconWrapper icon={IconIds.IC_BASELINE_OPEN_IN_NEW} className="h-3 w-3" />
        </LinkWrapper>
    )
}
