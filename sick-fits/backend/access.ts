import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

// const generatedPermissions = Object.fromEntries(
//   permissionsList.map((permission) => {
//     permission,
//       function ({ session }: ListAccessArgs) {
//         return !!session?.data.role?.[permission];
//       };
//   })
// );

// // Permissions check if someone meets a criteria
// export const permissions = {
//   ...generatedPermissions,
//   isAwesome({ session }: ListAccessArgs) {
//     return session?.data.name.includes('Tiago');
//   },
// };

// Rules based function
// Rules can return a boolean - yes or no - or a filter witch limits which product they can CRUD

export const roles = {};
