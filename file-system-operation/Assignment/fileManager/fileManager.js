/*
File Manager Application
Create a command-line application that allows users to perform basic file operations including
read, write, copy, delete, and list directory contents.
*/


const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];

function errorHandle(err){
    if(err.code == "ENOENT"){
        console.error("file or directory not found");
    } else if(err.code == "EACCES"){
        console.error("permission denied");
    } else {
        console.error("Error : ", err.message);
    }
}

switch(command){
    // read
    case "read":
        const readFile = args[1];
        fs.readFile(readFile , "utf-8",(err,data) => {
            if(err) return errorHandle(err);
            console.log("file content: ",data);
        });
        break;
    //  write
    case "write":
        const writeFile = args[1];
        const wContent = args.slice(2).join(" ");
        if(!writeFile || !wContent){
            return console.log("Write file content");
        }
        fs.writeFile(writeFile,wContent + "\n" , (err)=>{
            if(err) return errorHandle(err);
            console.log("file created");
        });
        break;
    // append
    case "append":
        const file = args[1];
        const content = args.slice(2).join(" ");

        fs.appendFile(file, content + "\n", (err) => {
            if (err) return errorHandle(err);
            console.log("Content appended");
        });
        break;
    // copy a file
    case "copy":
        const source = args[1];
        const dest = args[2];
        fs.copyFile(source,dest,(err) => {
            if(err) return errorHandle(err);
            console.log("file copied");
        });
        break;
    //  delete file
    case "delete":
        const deletefile = args[1];
        fs.unlink(deletefile,(err) => {
            if(err) return errorHandle(err);
            console.log("file deleted");
        });
        break;
    //  list
        case "list":
            const dir = args[1] || ".";
            fs.readdir(dir,(err,files) => {
                if(err) return errorHandle(err);
                console.log("files in dir");
                files.forEach(file => console.log(file));
            });
            break;

        default:
            console.log("...");
}