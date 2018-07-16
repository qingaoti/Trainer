import fs from 'fs';
fs.readFile('../logs/cheese.log', (err, body) => {
    if (err) {
        console.error(err);
    } else {
        console.log(body.toString());
    }
});