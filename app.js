const urlStatusCode = require('url-status-code')
const fs = require('fs');
let dir = "./links";
let dirBuf = Buffer.from(dir);
var filesName = fs.readdirSync(dir);
// console.log(filesName);

if (filesName) {
    for (let i = 0; i < filesName.length; i++) {
        let dirPath = dir + "/" + filesName[i];
        console.log("fileName - " + filesName[i] + "\n");
        var filesData = fs.readFileSync(dirPath, 'UTF8');
        // console.log(filesData);
        if (filesData) {
            debugger
            var links = filesData.split("\n");
            debugger
            for (let i = 0; i < links.length; i++) {
                var url = links[i];
                // urlStatusCode(url, (error, statusCode) => {
                //     if (error) {
                //         console.error(url + " -  " + error)
                //     } else {
                //         console.log(url + " -  " + statusCode)
                //     }
                // })
                checkBrokenLinks(url);
                debugger
            }

        }
    }
}
// const url = 'https://www.npmjs.com'
function checkBrokenLinks(url) {
    debugger
    urlStatusCode(url, (error, statusCode) => {
        if (error) {
            console.log(url + " -  " + error)
        } else {
            console.log(url + " -  " + statusCode)
        }
    })
}
