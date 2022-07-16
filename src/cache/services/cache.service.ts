import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import {
    CacheServiceClient,
    CACHE_PACKAGE_NAME,
    Cache as ProtoCache,
    CACHE_SERVICE_NAME,
    CacheKey,
    SetCacheRequest,
} from '../cache.pb'

@Injectable()
export class CacheService {

    private cacheService: CacheServiceClient

    @Inject(CACHE_PACKAGE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.cacheService = this.client.getService<CacheServiceClient>(CACHE_SERVICE_NAME)
    }

    public async getCacheByKey(
        key: CacheKey
    ): Promise<ProtoCache> {
        return firstValueFrom(this.cacheService.getCacheByKey(key))
    }

    public async setCacheByKey(
        dto: SetCacheRequest
    ): Promise<void> {
        this.cacheService.setCacheByKey(dto)
    }

}