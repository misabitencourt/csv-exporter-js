export default (col, options) => {    
    if (col === null || col === undefined) {
        return ''
    }
    
    return `${col}`.split(options.separator).join(options.separatorEncode || '')
}