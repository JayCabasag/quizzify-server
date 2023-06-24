import { SetMetadata } from '@nestjs/common';

export const ROLES_ALLOWED = 'rolesAllowed';
export const RolesAllowed = () => SetMetadata(ROLES_ALLOWED, true);