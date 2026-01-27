const fs = require('fs');
const path = require('path');

const[sourcedir , targetdir] = process.argv.slice(2);

if(!sourcedir || !targetdir){
    console.log("error : sourcedir  destinationdir");
    process.exit(1);
};

function errorHandle(err){
    if(err.code === "ENOENT"){
        console.log("file or directory not found");
    } else if(err.code === "EACCES"){
        console.log("Access denied");
    } else {
        console.log("Error : ",err.message);
    }
}

function SyncDirectories(src,dest){
    fs.readFile(src,(err,files) => {
        if(err) return errorHandle(err);

        files.forEach(file => {
            const srcPath = path.join(src,file);
            const destPath = path.join(dest,file);

            fs.stat(srcPath,(err,srcstat) => {
                if(err) return errorHandle(err);

                if(srcstat.isDirectory()) return;

                fs.stat(destPath,(err,destStat) => {
                    if(err || err.code==='ENOENT'){
                        fs.copy(srcPath , destPath , err =>{
                            if(err) return errorHandle(err);
                            console.log(`File copied1 ${file}`);
                        });
                    } else if(!errr){
                        if (srcStat.mtimeMs > destStat.mtimeMs) {
                            fs.copyFile(srcPath, destPath, err => {
                                if (err) return errorHandle(err);
                                console.log(`Updated: ${file}`);
                            });
                        }
                    }
                });
            });
        });
    });
}

fs.mkdir(targetdir, { recursive: true }, (err) => {
    if (err) return errorHandle(err);
    syncDirectories(sourceDir, targetDir);
});