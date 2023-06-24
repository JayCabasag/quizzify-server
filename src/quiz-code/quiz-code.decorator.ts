import { SetMetadata } from '@nestjs/common';

export const ROLES_ALLOWED = 'rolesAllowed';
export const RolesAllowed = (...roles: string[]) => SetMetadata(ROLES_ALLOWED, roles);