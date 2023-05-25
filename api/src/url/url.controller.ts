import { Controller, Get, Param } from '@nestjs/common';
import { UrlService } from './url.service';

@Controller("url")
export class UrlController {
  constructor(private readonly UrlService: UrlService) {}

  @Get()
  get() : {ok : boolean}
  {
    return {ok: true};
  }

}