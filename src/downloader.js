export default (data, downloadFileName, contentType) => {        
    if (window.navigator.msSaveBlob) {        
        let file = new Blob([data], { type: contentType, encoding: 'UTF-8' })
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(file, downloadFileName)
        }

        return;
    } 
    
    let a = document.createElement('a')
    a.href = `data:text/csv;charset=utf-8,%EF%BB%BF${encodeURIComponent(data)}`
    a.download = downloadFileName
    document.body.appendChild(a)
    a.click()
    setTimeout(() => document.body.removeChild(a), 300)
}