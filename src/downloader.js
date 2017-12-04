export default (data, downloadFileName, contentType) => {        
    if (window.navigator.msSaveBlob) {        
        let file = new Blob([data], { type: contentType })
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(file, downloadFileName)
        }

        return;
    } 
    
    let a = document.createElement('a')
    a.href = `data:text/csv,${encodeURIComponent(data)}`
    a.download = downloadFileName
    document.body.appendChild(a)
    a.click()
    setTimeout(() => document.body.removeChild(a), 300)
}