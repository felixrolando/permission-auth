export enum Permission {
  CREATE_COMMENT = "create_comment",
  READ_COMMENT = "read_comment",
  UPDATE_COMMENT = "update_comment",
  DELETE_COMMENT = "delete_comment",

  CREATE_POST = "create_post",
  READ_POST = "read_post",
  UPDATE_POST = "update_post",
  DELETE_POST = "delete_post",

  CREATE_USER = "create_user",
  READ_USER = "read_user",
  UPDATE_USER = "update_user",
  DELETE_USER = "delete_user",
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface User {
  id: string;
  email: string;
  roles: Role[];
}

export function hasPermission(user: User, permission: Permission): boolean {
  const permissions = user.roles.flatMap((role) => role.permissions);
  return permissions.includes(permission);
}
