import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UrlModule } from './url.module';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { UrlService } from './url.service';
import { Url } from './url.entity';
import { Repository } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';


describe('urlController', () => {
  let app: INestApplication;
  let urlService : UrlService;
  let urlRepository : Repository<Url>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }), 
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
              type: 'postgres',
              host: configService.get('POSTGRES_HOST'),
              port: configService.get('POSTGRES_PORT'),
              username: configService.get('POSTGRES_USERNAME'),
              password: configService.get('POSTGRES_PASSWORD'),
              database: configService.get('POSTGRES_DATABASE'),
              entities: [Url],
              autoLoadEntities: true,
              synchronize: true,
            }),
          }),
        UrlModule
        ],
      providers: [
        UrlService, 
        {
            provide: getRepositoryToken(Url),
            useValue: {
                create: jest.fn(),
                save: jest.fn(),
                findOneBy: jest.fn()
            }
        },
      ]
    }).compile();

    app = moduleFixture.createNestApplication();
    urlService = moduleFixture.get<UrlService>(UrlService);
    urlRepository = moduleFixture.get<Repository<Url>>(getRepositoryToken(Url))
    await app.init();
  });

  describe('shortenUrl', () => {
    it('/shorten/ (POST)', async () => {
        const long_url = 'https://medium.com/equify-tech/the-three-fundamental-stages-of-an-engineering-career-54dac732fc74';
        const shortUrl = `${process.env.API_URL}/ptl0PV`;
        const res = await request(app.getHttpServer())
        .post('/shorten')
        .send({ long_url })
        expect(res.status).toBe(201);
        expect(res.body).toEqual({ shortUrl });
    });
  });


  describe('longUrl', () => {
    it('/:code (GET)', async () => {
        const longUrl = 'https://medium.com/equify-tech/the-three-fundamental-stages-of-an-engineering-career-54dac732fc74';
        const code = 'ptl0PV';
        const res = await request(app.getHttpServer())
        .get(`/${code}`)
        expect(res.status).toBe(302);
        expect({ url: longUrl });
    });
  });

  describe('randomCode', () => {
    it('/:random (GET)', async () => {
        const code = '123';
        const res = await request(app.getHttpServer())
        .get(`/${code}`)
        expect(res.status).toBe(404);
    });
  });

});
  
  
  
  
  
  
  
  
