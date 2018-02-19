import { ImageInfo } from "../src/app/shared/image-info";

const fs = require('fs-extra');
const path = require('path');
const iptc = require('node-iptc');
const sharp = require('sharp');


function getDirectories(somePath: string): string[] {
    return fs.readdirSync(somePath).filter((f: string) => fs.statSync(path.join(somePath, f)).isDirectory());
}

function getFiles(somePath: string): string[] {
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

function sanitizeDescription(fullPathToFile: string, description: string | undefined): string | undefined {
    if (description) {
        if (description.indexOf('`') > -1) {
            console.log(`Bad description in '${fullPathToFile}', correcting...`);
            description = description.replace('`', '');
        }
        if (description.indexOf('"') > -1) {
            console.log(`Bad description in '${fullPathToFile}', correcting...`);
            description = description.replace(/\"/g, '\'');
        }
    }
    return description;
}

function getDescription(fullPathToFile: string): string | undefined {
    const content = fs.readFileSync(fullPathToFile);
    const iptc_data = iptc(content);
    return sanitizeDescription(fullPathToFile, iptc_data.caption);
}

function processMainImage(fullPathToInputFile: string, fullPathToOutputFile: string): void {
    return sharp(fullPathToInputFile)
        .resize(2400, 1300)
        .max()
        .toBuffer()
        .then(function (data) {
            console.log(`writing to '${fullPathToOutputFile}'`);
            fs.writeFileSync(fullPathToOutputFile, data, {
            });
        });
}

function processThumbImage(fullPathToInputFile: string, fullPathToOutputFile: string): Promise<any> {
    return sharp(fullPathToInputFile)
        .resize(150, 100)
        .max()
        .toBuffer()
        .then(function (data) {
            console.log(`writing to '${fullPathToOutputFile}'`);
            fs.writeFileSync(fullPathToOutputFile, data, {
            });
        });
}


async function waitForImageProcessingThumb(input: string, output: string) {
    await processThumbImage(input, output);
}

async function waitForImageProcessingMain(input: string, output: string) {
    await processMainImage(input, output);
}

const pathToScan = process.argv[2];

const directories: string[] = getDirectories(pathToScan);

console.log(directories);

const resultObj: any = {};

directories.forEach(dir => {
    const fullDir = path.join(pathToScan, dir);
    const files = getFiles(fullDir).filter(isImage).sort();
    const filesInfo: ImageInfo[] = [];

    const fullOutputPathThumbs = `src/assets/Kirchenchronik_thumb/${dir}`;
    const fullOutputPathMain = `src/assets/Kirchenchronik_main/${dir}`;

    fs.ensureDirSync(fullOutputPathThumbs);
    fs.ensureDirSync(fullOutputPathMain);

    files.forEach(name => {
        console.log(`Reading '${name}'`);
        const fullInputFile = path.join(fullDir, name);
        const description = getDescription(fullInputFile);

        const fullOutputFileThumb = path.join(fullOutputPathThumbs, name);
        const fullOutputFileMain = path.join(fullOutputPathMain, name);

        console.log(`outThumb: ${fullOutputFileThumb}`);
        console.log(`outMain: ${fullOutputFileMain}`);
        waitForImageProcessingThumb(fullInputFile, fullOutputFileThumb);
        waitForImageProcessingMain(fullInputFile, fullOutputFileMain);
        filesInfo.push({ name, description });
    });
    resultObj[dir] = { images: filesInfo };
});

console.log(resultObj);

writeDataTs(resultObj);

console.log('Done');



