const fs = require('fs');
const readline = require('readline');

const logfilePath = "server.log";
const reportfilePath = "summary.txt";

if(!logfilePath) {
    console.log("Please provide log file path");
    process.exit(1);
}

let totallines = 0;
let errorCount = 0;
let warningCount = 0;
let infoCount = 0;

const readStream = fs.createReadStream(logfilePath,{
    encoding : "utf-8"
});

const r1 = readline.createInterface({
    input : readStream,
    crlfDelay : Infinity
});

r1.on("line",(line) => {
    totallines++;

    if(line.includes("ERROR")) errorCount++;
    else if(line.includes("WARNING")) warningCount++;
    else if(line.includes("INFO")) infoCount++;
});

r1.on("close" ,() => {
    const report = `
    Log File Analysis
    total Line : ${totallines}
    error count : ${errorCount}
    warning count : ${warningCount}
    info count : ${infoCount}
    `;

    const writeStream = fs.createWriteStream(reportfilePath);
    writeStream.write(report);
    writeStream.end();

    console.log("Done");
    console.log("Summary");
});

readStream.on("error",(err) => {
    console.log("Errrrr" , err.message);
})
