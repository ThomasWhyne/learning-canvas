const path = require('path')
const fs = require('fs')
const childProcess = require('child_process')
const [dirName] = process.argv.slice(2)

function main() {
    if (!dirName) throw new Error('dirName cannot be empty!!!')
    const dirPath = path.resolve(__dirname, dirName)
    childProcess.execSync(
        `cp -r ${path.resolve(__dirname, './a-template')} ${dirPath}`
    )
    const indexHTMLPath = path.resolve(dirPath, './index.html')
    let indexHtml = fs.readFileSync(indexHTMLPath, {
        encoding: 'utf-8',
    })
    const record = {
        title: dirName,
    }
    indexHtml = indexHtml.replace(/\{\{(.*?)\}\}/g, (_, key) => record[key])

    fs.writeFileSync(indexHTMLPath, indexHtml)
}

main()
