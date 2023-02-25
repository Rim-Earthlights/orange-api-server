export interface S3ListObjectsResponse {
    Contents?: [
        {
            Key: string;
            LastModified: Date;
            ETag: string;
            Size: number;
            StorageClass: string;
            Owner: {
                DisplayName: string;
                ID: string;
            };
        }
    ];
    IsTruncated?: boolean;
}
