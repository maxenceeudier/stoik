"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const url_entity_1 = require("./url.entity");
const nanoid_1 = require("nanoid");
let UrlService = class UrlService {
    constructor(urlRepository) {
        this.urlRepository = urlRepository;
    }
    async redirectToLongUrl(code) {
        let url = await this.urlRepository.findOneBy({ code: code });
        if (!url)
            throw new common_1.NotFoundException("The isn't url corresponding to this code");
        return { url: url.url };
    }
    async shortenUrl(longUrl) {
        let url = await this.urlRepository.findOneBy({ url: longUrl });
        if (!url) {
            let numLetter = 6;
            let code = (0, nanoid_1.nanoid)(numLetter);
            let codeExist = await this.urlRepository.findOneBy({ code: code });
            while (codeExist) {
                code = (0, nanoid_1.nanoid)(numLetter++);
                codeExist = await this.urlRepository.findOneBy({ code: code });
            }
            url = new url_entity_1.Url();
            url.code = code;
            url.url = longUrl;
            await this.urlRepository.save(url);
        }
        const shortUrl = `${process.env.API_URL}/${url.code}`;
        return { shortUrl };
    }
};
UrlService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(url_entity_1.Url)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UrlService);
exports.UrlService = UrlService;
//# sourceMappingURL=url.service.js.map