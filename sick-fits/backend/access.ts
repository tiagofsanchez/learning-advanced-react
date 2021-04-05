import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// // Permissions check if someone meets a criteria
export const permissions = {
  ...generatedPermissions,
  isAwesome({ session }: ListAccessArgs): boolean {
    return session?.data.name.includes('Tiago');
  },
};

// Rules based function
// Rules can return a boolean - yes or no - or a filter witch limits which product they can CRUD

export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    // 1. Do they have permission
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // 2. If not, do they own the product
    return { user: { id: session.itemId } };
  },
};
