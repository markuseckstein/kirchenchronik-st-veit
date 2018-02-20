import { ImageInfo } from '../src/app/shared/image-info';
import { isSuitableFileType } from './utils';
import { FileHandler, FileHandlerFactory } from './classes';

const fs = require('fs-extra');
const path = require('path');

function getDirectories(somePath: string): string[] {
    return fs.readdirSync(somePath).filter((f: string) => fs.statSync(path.join(somePath, f)).isDirectory());
}

function getFiles(somePath: string): string[] {
    return fs.readdirSync(somePath).filter((f: string) => !fs.statSync(path.join(somePath, f)).isDirectory());
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
    const files = getFiles(fullDir).filter(isSuitableFileType).sort();
    const filesInfo: ImageInfo[] = [];

    const fullOutputPathThumbs = `src/assets/Kirchenchronik_thumb/${dir}`;
    const fullOutputPathMain = `src/assets/Kirchenchronik_main/${dir}`;

    fs.ensureDirSync(fullOutputPathThumbs);
    fs.ensureDirSync(fullOutputPathMain);

    files.forEach(name => {
        console.log(`Reading '${name}'`);
        const fullInputFile = path.join(fullDir, name);
        const handler: FileHandler = FileHandlerFactory.getHandler(name, fullInputFile);

        const fullOutputFileThumb = path.join(fullOutputPathThumbs, name);
        const fullOutputFileMain = path.join(fullOutputPathMain, name);

        handler.processThumbFile(fullInputFile, fullOutputFileThumb);
        handler.processMainFile(fullInputFile, fullOutputFileMain);
        filesInfo.push(handler.getFileInfo());
    });
    resultObj[dir] = { images: filesInfo };
});


writeDataTs(resultObj);

console.log('Done');



