import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Url } from "./url.entity";
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(
   @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
  ) {}

  async redirectToLongUrl(code: string) : Promise<{url: string}> {
    let url = await this.urlRepository.findOneBy({code: code});
    if (!url) throw new NotFoundException("The isn't url corresponding to this code");
    return {url: url.url}
  }

  async shortenUrl(longUrl : string) : Promise<{shortUrl: string}> {
    let url = await this.urlRepository.findOneBy({url: longUrl});
    if (!url)
    {
      url = new Url();
      url.code = nanoid(6);
      url.url = longUrl;
      await this.urlRepository.save(url);
    }
    const shortUrl = `${process.env.API_URL}/${url.code}`;
    return {shortUrl}
  }
}