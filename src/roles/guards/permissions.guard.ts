import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'src/auth/types/request'
import { PERMISSION_KEY } from '../decorators/required-permission.decorator'
import { PermissionsService } from '../services/permissions.service'


@Injectable()
export class PermissionsGuard implements CanActivate {

    constructor(
        @Inject(Reflector) private reflector: Reflector,
        @Inject(PermissionsService) private permissionsService: PermissionsService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const permissionId = this.reflector.getAllAndOverride<number>(
            PERMISSION_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ]
        )
        const req: Request = context.switchToHttp().getRequest()
        const bool = await this.permissionsService.doesUserHavePermission({
            permissionId,
            userId: req.user.id,
            projectId: req.body.projectId || req.params.projectId || req.query.projectId,
        })
        return bool
    }
}
