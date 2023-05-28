import { Repository } from 'typeorm';
import { Url } from "./url.entity";
export declare class UrlService {
    private readonly urlRepository;
    constructor(urlRepository: Repository<Url>);
    redirectToLongUrl(code: string): Promise<{
        url: string;
    }>;
    shortenUrl(longUrl: string): Promise<{
        shortUrl: string;
    }>;
}
