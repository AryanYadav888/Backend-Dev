/* Task 3 : Directory Backup & Cleanup Utility Scenario

Your system stores user uploads. You must:
    Backup important files
    Delete old unused files automatically

Tasks:
    Create a Node.js utility that:Scans a directoryCopies files to
    a backup folder with timestampDeletes files older than 7 daysLogs
    all operations into backup.log

Constraints:
    Use fs.stat
    Handle missing directories safely
    Use promises / async-await
*/

const fs = require('fs');
const path = require('path');

const src_dir = "uploads";
const backup_dir = "backup";
const log_file = "backup.log";

const day_7 = 7*24*60*60*1000;

async function log(message){
    const time = new Date().toISOString();
    await fs.appendFile(Log_file , `[${time}] ${message}\n`);
}

async function ensureDir(dir){
    try{
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir , { recursive : true});
        await log(`created dir: ${dir}`);
    }
}

async function backupAndCleanup(){
    try{
        await ensureDir(src_dir);
        await ensureDir(backup_dir);

        const files = await fs.readdir(src_dir);

        for(const file of files){
            const filePath = path.join(src_dir,file);
            const stats = await fs.stat(filePath);

            if(!stats.isFile()) continue;

            const now = Date.now();
            const age = now - stats.mtimeMs;

            const timestamp = new Date().toISOString().replace(/:/g, "-");
            const ext = path.extname(file);
            const base = path.basename(file, ext);
            const backupName = `${base}_${timestamp}${ext}`;
            const backupPath = path.join(BACKUP_DIR, backupName);

            await fs.copyFile(filePath, backupPath);
            await log(`Backed up: ${file}`);

            if (age > DAYS_7) {
                await fs.unlink(filePath);
                await log(`Deleted old file: ${file}`);
            }
        }

        console.log("Backup & cleanup completed");
    } catch (err) {
        await log(`error : ${err.message}`);
        console.error("error: ",err.message);
    }
}

backupAndCleanup();