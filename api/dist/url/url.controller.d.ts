export declare class UrlController {
    private urlMappings;
    redirectToLongUrl(slug: string): {
        url: string;
    };
    shortenUrl(longUrl: string): {
        shortUrl: string;
    };
}
