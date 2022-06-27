import { SetMetadata } from '@nestjs/common'

export const PERMISSION_KEY = 'permission'
export const RequiredPermission = (permissionId: number) => SetMetadata(PERMISSION_KEY, permissionId)