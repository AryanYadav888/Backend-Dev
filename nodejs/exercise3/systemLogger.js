const os = require('os');
const fs = require('fs');
const path = require('path');

function logSystemInfo() {
    const cpuInfo = os.cpus();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const platform = os.platform();
    const uptime = os.uptime();
    const time = new Date().toISOString();

    const logData = `
    System Information:
    CPU Info: ${JSON.stringify(cpuInfo, null, 2)}
    Total Memory: ${totalMem} bytes
    Free Memory: ${freeMem} bytes
    Platform: ${platform}
    Uptime: ${uptime} seconds
    -------------------------------
    `;
    fs.appendFile("system-log.txt", logData, (err) => {
        if (err) {
            console.error("Error writing log:", err);
        } else {
            console.log("System info logged at", time);
        }
    });
};

setInterval(logSystemInfo,6000);