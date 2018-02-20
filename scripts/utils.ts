
export function isImage(filename: string): boolean {
    const extIdx = filename.lastIndexOf('.');
    if (extIdx === -1) {
        return false;
    }
    const ext = filename.substr(extIdx + 1).toLowerCase();

    return ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'gif' || ext === 'bmp';
}

export function isSuitableFileType(filename: string): boolean {
    const extIdx = filename.lastIndexOf('.');
    if (extIdx === -1) {
        return false;
    }
    const ext = filename.substr(extIdx + 1).toLowerCase();

    return ext === 'html' || ext === 'mp4' || ext === 'pdf' || isImage(filename);
}
