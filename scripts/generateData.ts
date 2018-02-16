const fs = require('fs');
const path = require('path');

function getDirectories(somePath: string): string[] {
    return fs.readdirSync(somePath).filter((f: string) => fs.statSync(path.join(somePath, f)).isDirectory());
}

function getFiles(somePath: string): string [] {
    return fs.readdirSync(somePath).filter((f: string) => !fs.statSync(path.join(somePath, f)).isDirectory());
}


function isImage(filename: string): boolean {
    const extIdx = filename.lastIndexOf('.');
    if (extIdx === -1) {
        return false;
    }
    const ext = filename.substr(extIdx + 1).toLowerCase();

    return ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'gif' || ext === 'bmp';
}


function writeDataTs(dataObj: any): void {
    const jsonAsString = JSON.stringify(dataObj, null, 2);
    const data = `export const imageData = JSON.parse(\`
    ${jsonAsString}
    \`);\n`;
    fs.writeFileSync('src/assets/data.ts', data);
}

const pathToScan = process.argv[2];

const directories: string[] = getDirectories(pathToScan);

console.log(directories);

const resultObj: any = {};

directories.forEach(dir => {
    const fullDir = path.join(pathToScan, dir);
    const files = getFiles(fullDir);
    resultObj[dir] = { images: files.filter(isImage) };
});

console.log(resultObj);

writeDataTs(resultObj);

console.log('Done');



