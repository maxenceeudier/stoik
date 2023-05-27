import { UrlService } from './url.service';
import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';

@Controller()
export class UrlController {
  constructor(private readonly urlService : UrlService){}

  @Get(':code')
  @Redirect('', 302)
  redirectToLongUrl(@Param('code') code: string): Promise<{url: string}> {
    return this.urlService.redirectToLongUrl(code);
  }

  @Post('/shorten/')
  shortenUrl(@Body('long_url') longUrl: string): Promise<{ shortUrl: string }> {
    return this.urlService.shortenUrl(longUrl);
  }

}