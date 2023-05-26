import { UrlService } from './url.service';
import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { nanoid } from 'nanoid';


interface UrlMapping {
  [slug: string]: string;
}

@Controller()
export class UrlController {
  private urlMappings: UrlMapping = {};

  @Get(':slug')
  @Redirect('', 302)
  redirectToLongUrl(@Param('slug') slug: string): {url: string} {
    const longUrl = this.urlMappings[slug];
    return { url: longUrl };
  }

  @Post('/shorten/')
  shortenUrl(@Body('long_url') longUrl: string): { shortUrl: string } {
    const slug = nanoid(5);
    this.urlMappings[slug] = longUrl;
    const shortUrl = `${process.env.API_URL}/${slug}`;
    return { shortUrl };
  }

}