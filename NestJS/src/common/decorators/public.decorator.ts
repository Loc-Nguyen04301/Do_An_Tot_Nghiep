import { SetMetadata } from '@nestjs/common';

// Don't check access token for request
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
