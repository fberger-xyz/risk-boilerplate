import { cn } from '@/utils'
import LinkWrapper from '../common/LinkWrapper'

interface FooterProps {
    className?: string
}

export default function Footer(props: FooterProps) {
    return (
        <div className={cn('fixed bottom-0 w-full flex justify-between text-xs z-0', props.className)}>
            <div className="flex items-center gap-6">
                <p className="flex">
                    <span className="mr-1 opacity-50">UI</span>
                    <span className="font-bold">{process.env.NEXT_PUBLIC_APP_VERSION}</span>
                </p>
                <p className="flex flex-col sm:flex-row">
                    <span className="mr-1 opacity-50">Environment</span>
                    <span className="font-bold">{process.env.NODE_ENV}</span>
                </p>
                <p className="hidden flex-col sm:flex sm:flex-row">
                    <span className="mr-1 opacity-50">Screen</span>
                    <span className="block font-bold sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">xs</span>
                    <span className="hidden font-bold sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">sm</span>
                    <span className="hidden font-bold sm:hidden md:block lg:hidden xl:hidden 2xl:hidden">md</span>
                    <span className="hidden font-bold sm:hidden md:hidden lg:block xl:hidden 2xl:hidden">lg</span>
                    <span className="hidden font-bold sm:hidden md:hidden lg:hidden xl:block 2xl:hidden">xl</span>
                    <span className="hidden font-bold sm:hidden md:hidden lg:hidden xl:hidden 2xl:block">2xl</span>
                </p>
            </div>
            <div className="flex items-center gap-1">
                <p className="opacity-50">Maintainer</p>
                <LinkWrapper href="https://x.com/fran6brg" className="">
                    <p className="font-bold">fberger</p>
                </LinkWrapper>
            </div>
        </div>
    )
}
