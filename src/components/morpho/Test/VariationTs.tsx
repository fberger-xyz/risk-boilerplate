'use client'

// import { getDurationBetween } from '@/utils'
import dayjs from 'dayjs'

export function VariationTs(props: { keyName: string; tminus1: string | number; t: string | number }) {
    return (
        <p>
            {props.keyName}: {dayjs(Number(props.tminus1) * 1000).format('ddd. DD MM YYYY')} {'->'}{' '}
            {dayjs(Number(props.t) * 1000).format('ddd. DD MM YYYY')}
            {/* to fix later: webpack issue */}
            {/* {getDurationBetween({ startTs: Number(props.tminus1), endTs: Number(props.t) }).humanize} */} (
            {(Number(props.t) - Number(props.tminus1)) % 60}min)
        </p>
    )
}
