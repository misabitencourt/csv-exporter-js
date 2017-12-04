import download from './downloader'
import normalize from './normalizer'
import customPolyfills from './polyfills'

const csvExporter = (data, options) => new Promise(resolve => {
    if (! (data && data.length)) {
        return console.error('Wrong data param')
    }

    let stringResult = ''
    let headerLength = -1
    
    // Default options
    options = options || {}
    options.lineBreak = options.lineBreak || '\r\n'
    options.separator = options.separator || ','
    options.contentType = options.contentType || 'text/csv'
    if (! options.filename) {
        let today = new Date()
        let customName = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}.csv`
        options.filename = customName
    }    

    // Header
    if (options.header && options.header.length) {
        headerLength = options.header.length
        stringResult += options.header.map(col => normalize(col, options)).join(options.separator)
        stringResult += options.lineBreak
    }
    
    // Data
    stringResult += data.map(
        row => row.map(col => normalize(col, options)).join(options.separator)
    ).join(options.lineBreak);

    // Download
    download(stringResult, options.filename, options.contentType)

    return resolve()
})

window.csvExporter = csvExporter;
export default csvExporter;

