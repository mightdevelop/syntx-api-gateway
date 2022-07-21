import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'
import {
    CreateProjectRequest,
    UpdateProjectRequest,
    Project,
    ProjectsServiceClient,
    PROJECTS_SERVICE_NAME,
    PROJECTS_PACKAGE_NAME,
    ProjectIdAndUserId,
    SearchProjectsParams,
    ProjectId
} from '../projects.pb'

@Injectable()
export class ProjectsService {

    private projectsService: ProjectsServiceClient

    @Inject(PROJECTS_PACKAGE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.projectsService = this.client.getService<ProjectsServiceClient>(PROJECTS_SERVICE_NAME)
    }

    public async getProjectById(
        dto: ProjectId
    ): Promise<Project> {
        return firstValueFrom(this.projectsService.getProjectById(dto))
    }

    public searchProjects(dto: SearchProjectsParams): Observable<Project> {
        return this.projectsService.searchProjects(dto)
    }

    public async isUserProjectParticipant(dto: ProjectIdAndUserId): Promise<boolean> {
        return !!(await firstValueFrom(this.projectsService.isUserProjectParticipant(dto))).bool
    }

    public async createProject(
        dto: CreateProjectRequest
    ): Promise<Project> {
        return firstValueFrom(this.projectsService.createProject(dto))
    }

    public async updateProject(
        dto: UpdateProjectRequest
    ): Promise<Project> {
        return firstValueFrom(this.projectsService.updateProject(dto))
    }

    public async deleteProject(
        dto: ProjectId
    ): Promise<Project> {
        return firstValueFrom(this.projectsService.deleteProject(dto))
    }

    public async addUserToProject(
        dto: ProjectIdAndUserId
    ): Promise<void> {
        this.projectsService.addUserToProject(dto)
    }

    public async removeUserFromProject(
        dto: ProjectIdAndUserId
    ): Promise<void> {
        this.projectsService.removeUserFromProject(dto)
    }

}