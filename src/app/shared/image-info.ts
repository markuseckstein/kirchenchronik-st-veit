
export type AssetType = 'image' | 'pdf' | 'audio' | 'video';

export interface ImageInfo {
    name: string;
    thumbName: string;
    description?: string;
    type: AssetType;
}
