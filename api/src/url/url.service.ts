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
      let numLetter = 6;
      let code = nanoid(numLetter);
      let codeExist = await this.urlRepository.findOneBy({code: code})
      while (codeExist)
      {
        code = nanoid(numLetter++);
        codeExist = await this.urlRepository.findOneBy({code: code});
      }
      url = new Url();
      url.code = code;
      url.url = longUrl;
      await this.urlRepository.save(url);
    }
    const shortUrl = `${process.env.API_URL}/${url.code}`;
    return {shortUrl}
  }
}