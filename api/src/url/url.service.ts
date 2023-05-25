import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Url } from "./url.entity";

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private readonly UrlRepository: Repository<Url>,
  ) {}


}