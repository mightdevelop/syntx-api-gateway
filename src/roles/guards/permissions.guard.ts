import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'src/auth/types/request'
import { PERMISSION_KEY } from '../decorators/required-permission.decorator'
import { PermissionsService } from '../services/permissions.service'
import { ProjectsService } from '../../projects/services/projects.service'
import { firstValueFrom } from 'rxjs'


@Injectable()
export class PermissionsGuard implements CanActivate {

    constructor(
        @Inject(Reflector) private reflector: Reflector,
        private permissionsService: PermissionsService,
        private projectsService: ProjectsService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const permissionId = this.reflector.getAllAndOverride<number | undefined>(
            PERMISSION_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ]
        )

        const req: Request = context.switchToHttp().getRequest()
        const projectId = req.body.projectId || req.params.projectId || req.query.projectId
        const userId = req.user.id

        const isUserProjectPasticipant = await this.projectsService.isUserProjectParticipant({
            projectId, userId
        })
        if (!isUserProjectPasticipant)
            return false

        if (!permissionId)
            return true

        const isUserHaveRequiredPermission = !!await firstValueFrom(
            this.permissionsService.searchPermissions({
                permissionsIds: [ permissionId ],
                params: {
                    $case: 'userIdAndProjectId',
                    userIdAndProjectId: { userId, projectId }
                }
            })
        )
        return isUserHaveRequiredPermission
    }
}
