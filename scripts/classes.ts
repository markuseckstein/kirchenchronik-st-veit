import { isImage } from './utils';
import { ImageInfo, AssetType } from '../src/app/shared/image-info';


const fs = require('fs-extra');
const path = require('path');
const iptc = require('node-iptc');
const sharp = require('sharp');



export class FileHandlerFactory {
    static getHandler(filename: string, fullPathToFile: string): FileHandler {
        const pathLower = fullPathToFile.toLowerCase();

        if (isImage(fullPathToFile)) {
            return new ImageFileHandler(filename, fullPathToFile);
        } else if (pathLower.endsWith('.pdf')) {
            return new PdfFileHandler(filename, fullPathToFile);
        } else if (pathLower.endsWith('.mp4')) {
            return new VideoFileHandler(filename, fullPathToFile);
        }
        throw new Error(`could not find a handler for '${fullPathToFile}'`);
    }
}


export abstract class FileHandler {
    constructor(protected filename: string, protected fullPathToInputFile: string) {
    }
    abstract getDescription(): string | undefined;
    abstract getThumbName(): string;
    abstract processMainFile(fullPathToInputFile: string, fullPathToOutputFile: string): void;
    abstract processThumbFile(fullPathToInputFile: string, fullPathToOutputFile: string): void;
    abstract getType(): AssetType;
    getFileInfo(): ImageInfo {
        return {
            name: this.filename,
            thumbName: this.getThumbName(),
            description: this.getDescription(),
            type: this.getType()
        };
    }
}

export class ImageFileHandler extends FileHandler {
    getDescription(): string | undefined {
        const content = fs.readFileSync(this.fullPathToInputFile);
        const iptc_data = iptc(content);
        return this.sanitizeDescription(this.fullPathToInputFile, iptc_data.caption);
    }

    getThumbName(): string {
        return this.filename;
    }
    processMainFile(fullPathToInputFile: string, fullPathToOutputFile: string): void {
        return sharp(fullPathToInputFile)
            .resize(2400, 1300)
            .max()
            .withMetadata()
            .toBuffer()
            .then(function (data) {
                console.log(`writing to '${fullPathToOutputFile}'`);
                fs.writeFileSync(fullPathToOutputFile, data, {
                });
            });
    }
    processThumbFile(fullPathToInputFile: string, fullPathToOutputFile: string): void {
        return sharp(fullPathToInputFile)
            .resize(150, 100)
            .max()
            .withMetadata()
            .toBuffer()
            .then(function (data) {
                console.log(`writing to '${fullPathToOutputFile}'`);
                fs.writeFileSync(fullPathToOutputFile, data, {
                });
            });
    }
    getType(): AssetType {
        return 'image';
    }

    private sanitizeDescription(fullPathToFile: string, description: string | undefined): string | undefined {
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
}


export class PdfFileHandler extends FileHandler {
    getDescription(): string | undefined {
        return undefined;
    }

    getThumbName(): string {
        return this.filename + '.png';
    }

    processMainFile(fullPathToInputFile: string, fullPathToOutputFile: string): void {
        fs.copySync(fullPathToInputFile, fullPathToOutputFile);
    }
    processThumbFile(fullPathToInputFile: string, fullPathToOutputFile: string): void {
        fs.copySync('src/assets/pdf-logo.png', fullPathToOutputFile + '.png');
    }
    getType(): AssetType {
        return 'pdf';
    }
}

export class VideoFileHandler extends FileHandler {
    getDescription(): string | undefined {
        return undefined;
    }

    getThumbName(): string {
        return this.filename + '.png';
    }

    processMainFile(fullPathToInputFile: string, fullPathToOutputFile: string): void {
        fs.copySync(fullPathToInputFile, fullPathToOutputFile);
    }
    processThumbFile(fullPathToInputFile: string, fullPathToOutputFile: string): void {
        fs.copySync('src/assets/video-logo.png', fullPathToOutputFile + '.png');
    }
    getType(): AssetType {
        return 'video';
    }
}
