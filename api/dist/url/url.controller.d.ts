import { UrlService } from './url.service';
export declare class UrlController {
    private readonly urlService;
    constructor(urlService: UrlService);
    redirectToLongUrl(code: string): Promise<{
        url: string;
    }>;
    shortenUrl(longUrl: string): Promise<{
        shortUrl: string;
    }>;
}
