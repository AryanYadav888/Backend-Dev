const fs = require('fs');

const inputText = `
Node.js makes file handling very easy.
This text is written automatically by the program.
Now the program will count the words in this file.
`;

fs.writeFile('input.txt', inputText.trim(), (err) => {
    if (err) {
        console.error('Error writing to file:', err);
        return;
    }

    console.log("Save input to input file");

    fs.readFile('input.txt', 'utf8', (err, data) => {
        if(err){
            console.log("Error");
        }
        const wordCount = data.trim().split(/\s+/);
        const count = wordCount.length;

        const result =`the number of words in the file is: ${count}`;

        fs.writeFile('output.txt', result, (err) => {
            if (err) {
                console.error('Error writing to output file:', err);
                return;
            }
            console.log("Save output to output file");
        });
    })
});