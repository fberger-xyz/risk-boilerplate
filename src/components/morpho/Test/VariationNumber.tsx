'use client'

import { formatNumberWithDecimals } from '@/utils'
import numeral from 'numeral'

export function VariationNumber({
    precision = 1,
    ...props
}: {
    keyName: string
    tminus1: string | number
    t: string | number
    decimals: number
    precision?: number
    className?: string
}) {
    const percent = (Number(props.t) - Number(props.tminus1)) / Number(props.tminus1)
    return (
        <p className={props.className}>
            {props.keyName}: {formatNumberWithDecimals(props.tminus1, props.decimals, precision)} {'->'}{' '}
            {formatNumberWithDecimals(props.t, props.decimals, precision)} (
            {isNaN(percent) || Math.abs(percent) > 100000 ? 'n/a' : numeral(percent).format(`+0,0.00%`)})
        </p>
    )
}
