import Utilities from 'app/shared/helper/utilities';

export type AssetType = 'video' | 'image';
export type VideoType = 'direct_link' | 'youtube' | 'vimeo';

export class AssetEntity {
    id: string;
    type: AssetType;
    videoType: VideoType;
    uri: string;
    thumbnailImageUri?: string;
    externalId?: string;

    constructor(id: string, type: AssetType, uri: string, videoType?: VideoType, thumbnailImageUri?: string, externalId?: string) {
        this.id = id;
        this.type = type;
        this.uri = uri;
        this.videoType = videoType ?? 'direct_link';
        this.thumbnailImageUri = thumbnailImageUri;
        this.externalId = externalId;
        if (this.videoType === 'youtube' && !this.externalId) {
            this.externalId = Utilities.getYoutubeVideoIDFromUrl(this.uri);
        }
    }
}