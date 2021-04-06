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
  canManageProducts({
    session,
  }: ListAccessArgs): true | { user: { id: string } } {
    // 1. Do they have permission
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // 2. If not, do they own the product
    return { user: { id: session.itemId } };
  },

  canOrder({ session }: ListAccessArgs) {
    // if user not signedIn this is important to manage the API response
    if (!isSignedIn({ session })) {
      return false;
    }

    // 1. Do they have permission
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. If not, do they own the product
    return { user: { id: session.itemId } };
  },

  canManageOrderItems({
    session,
  }: ListAccessArgs): true | { order: { user: { id: string } } } {
    // 1. Do they have permission
    if (permissions.canManageOrders({ session })) {
      return true;
    }
    // 2. If not, do they own the product
    return { order: { user: { id: session.itemId } } };
  },

  // here if the user can not update and delete products, the user will only read
  // products that are available
  canReadProducts({ session }: ListAccessArgs): true | { status: string } {
    // 1. Do they have permission
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // 2. If not, do they own the product
    return { status: 'AVAILABLE' };
  },

  canManageUsers({ session }: ListAccessArgs) {
    // if user not signedIn this is important to manage the API response
    if (!isSignedIn({ session })) {
      return false;
    }

    // 1. Do they have permission
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    // 2. If not can they do it themselves
    return { id: session.itemId };
  },
};
