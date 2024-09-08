import dayjs from 'dayjs'

export const dateHelper = (dayjsInstance: dayjs.Dayjs) => ({
    dayjs: dayjsInstance,
    date: dayjsInstance.toDate(),
    ts: dayjsInstance.toDate().getTime(),
})
