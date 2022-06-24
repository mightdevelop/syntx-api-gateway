import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'
import {
    CreateProjectRequest,
    UpdateProjectRequest,
    DeleteProjectRequest,
    Project,
    ProjectByIdRequest,
    ProjectsServiceClient,
    PROJECTS_SERVICE_NAME,
    ProjectUserRequest
} from '../projects.pb'

@Injectable()
export class ProjectsService {

    private projectsService: ProjectsServiceClient

    @Inject(PROJECTS_SERVICE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.projectsService = this.client.getService<ProjectsServiceClient>(PROJECTS_SERVICE_NAME)
    }

    public async getProjectById(
        dto: ProjectByIdRequest
    ): Promise<Project> {
        return firstValueFrom(this.projectsService.getProjectById(dto))
    }

    public async getProjectsByUserId(userId: string): Promise<Observable<Project>> {
        return this.projectsService.getProjectsByUserId({ userId })
    }

    public async getProjectsByLeadId(leadId: string): Promise<Observable<Project>> {
        return this.projectsService.getProjectsByLeadId({ leadId })
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
        dto: DeleteProjectRequest
    ): Promise<Project> {
        return firstValueFrom(this.projectsService.deleteProject(dto))
    }

    public async addUserToProject(
        dto: ProjectUserRequest
    ): Promise<void> {
        this.projectsService.addUserToProject(dto)
    }

    public async removeUserFromProject(
        dto: ProjectUserRequest
    ): Promise<void> {
        this.projectsService.removeUserFromProject(dto)
    }

}