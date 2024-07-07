import { Controller, HttpCode, HttpStatus, Inject, Delete } from "@nestjs/common";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Public } from "src/common/decorators";
import { Cache } from "cache-manager";

@Controller('api/v1/cache')
export class CacheController {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    @Public()
    @Delete('clear')
    @HttpCode(HttpStatus.OK)
    async clearCache() {
        await this.cacheManager.reset();
    }
}