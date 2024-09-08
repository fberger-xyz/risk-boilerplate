export const shortenAddress = (address: string) => {
    return `${address.slice(0, 5)}...${address.slice(-5)}`
}
export const shortenStr = (str: string, max = 20) => {
    if (str.length <= max) return str
    return `${str.slice(0, max - 3).trim()}...`
}
