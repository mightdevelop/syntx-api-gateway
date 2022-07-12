import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'
import {
    ISSUES_PACKAGE_NAME,
    DEPENDENCIES_SERVICE_NAME,
    DependenciesServiceClient,
    Dependency,
    CreateDependencyRequest,
    DependenciesSearchParams,
} from '../issues.pb'

@Injectable()
export class DependenciesService {

    private dependenciesService: DependenciesServiceClient

    @Inject(ISSUES_PACKAGE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.dependenciesService = this.client.getService<DependenciesServiceClient>(DEPENDENCIES_SERVICE_NAME)
    }

    public async getDependencyById(dependencyId: string): Promise<Dependency> {
        return firstValueFrom(this.dependenciesService.getDependencyById({ dependencyId }))
    }

    public async searchDependencies(dto: DependenciesSearchParams): Promise<Observable<Dependency>> {
        return this.dependenciesService.searchDependencies(dto)
    }

    public async createDependency(dto: CreateDependencyRequest): Promise<Dependency> {
        return firstValueFrom(this.dependenciesService.createDependency(dto))
    }

    public async deleteDependency(dependencyId: string): Promise<Dependency> {
        return firstValueFrom(this.dependenciesService.deleteDependency({ dependencyId }))
    }

}