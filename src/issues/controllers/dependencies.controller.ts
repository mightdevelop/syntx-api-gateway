import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { DependenciesService } from '../services/dependencies.service'
import { CreateDependencyRequest, Dependency } from '../issues.pb'
import { Observable } from 'rxjs'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('/dependencies')
export class DependenciesController {

    constructor(
        private dependenciesService: DependenciesService
    ) {}

    @Get('/:dependencyId')
    public async getDependencyById(
        @Param('dependencyId') dependencyId: string,
    ): Promise<Dependency> {
        return this.dependenciesService.getDependencyById(dependencyId)
    }

    @Get('/search?')
    @UseGuards(JwtAuthGuard)
    public async searchDependencies(
        @Query('blockedEpicId') blockedEpicId: string,
        @Query('blockingEpicId') blockingEpicId: string,
    ): Promise<Observable<Dependency>> {
        return this.dependenciesService.searchDependencies({
            dependenciesIds: [],
            blockedEpicId,
            blockingEpicId,
        })
    }

    @Post('/')
    @UseGuards(JwtAuthGuard)
    public async createDependency(
        @Body() dto: CreateDependencyRequest,
    ): Promise<Dependency> {
        return this.dependenciesService.createDependency(dto)
    }

    @Delete('/:dependencyId')
    @UseGuards(JwtAuthGuard)
    public async deleteDependency(
        @Param('dependencyId') dependencyId: string,
    ): Promise<Dependency> {
        return this.dependenciesService.deleteDependency(dependencyId)
    }

}