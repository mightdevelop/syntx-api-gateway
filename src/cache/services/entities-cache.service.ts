import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import {
    CACHE_PACKAGE_NAME,
    Cache as ProtoCache,
    EntitiesCacheServiceClient,
    ENTITIES_CACHE_SERVICE_NAME,
    EntityKey,
    SetEntityByKey,
} from '../cache.pb'

@Injectable()
export class EntitiesCacheService {

    private entitiesCacheService: EntitiesCacheServiceClient

    @Inject(CACHE_PACKAGE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.entitiesCacheService = this.client.getService<EntitiesCacheServiceClient>(ENTITIES_CACHE_SERVICE_NAME)
    }

    public async getEntityByKey(
        key: EntityKey
    ): Promise<ProtoCache> {
        return firstValueFrom(this.entitiesCacheService.getEntityByKey(key))
    }

    public async setEntityByKey(
        dto: SetEntityByKey
    ): Promise<void> {
        this.entitiesCacheService.setEntityByKey(dto)
    }

}