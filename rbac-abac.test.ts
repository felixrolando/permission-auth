import { Permission, Role, User, hasPermission } from "./rbac-abac";

// Definir roles de ejemplo
const adminRole: Role = {
  id: "admin",
  name: "Administrator",
  permissions: [
    Permission.CREATE_USER,
    Permission.READ_USER,
    Permission.UPDATE_USER,
    Permission.DELETE_USER,
    Permission.CREATE_POST,
    Permission.READ_POST,
    Permission.UPDATE_POST,
    Permission.DELETE_POST,
    Permission.CREATE_COMMENT,
    Permission.READ_COMMENT,
    Permission.UPDATE_COMMENT,
    Permission.DELETE_COMMENT,
  ],
};

const moderatorRole: Role = {
  id: "moderator",
  name: "Moderator",
  permissions: [
    Permission.READ_USER,
    Permission.CREATE_POST,
    Permission.READ_POST,
    Permission.UPDATE_POST,
    Permission.DELETE_POST,
    Permission.CREATE_COMMENT,
    Permission.READ_COMMENT,
    Permission.UPDATE_COMMENT,
    Permission.DELETE_COMMENT,
  ],
};

const authorRole: Role = {
  id: "author",
  name: "Author",
  permissions: [
    Permission.CREATE_POST,
    Permission.READ_POST,
    Permission.UPDATE_POST,
    Permission.CREATE_COMMENT,
    Permission.READ_COMMENT,
    Permission.UPDATE_COMMENT,
  ],
};

const readerRole: Role = {
  id: "reader",
  name: "Reader",
  permissions: [
    Permission.READ_POST,
    Permission.READ_COMMENT,
    Permission.CREATE_COMMENT,
  ],
};

// Definir usuarios de ejemplo
const adminUser: User = {
  id: "1",
  email: "admin@example.com",
  roles: [adminRole],
};

const moderatorUser: User = {
  id: "2",
  email: "moderator@example.com",
  roles: [moderatorRole],
};

const authorUser: User = {
  id: "3",
  email: "author@example.com",
  roles: [authorRole],
};

const readerUser: User = {
  id: "4",
  email: "reader@example.com",
  roles: [readerRole],
};

const multiRoleUser: User = {
  id: "5",
  email: "poweruser@example.com",
  roles: [authorRole, readerRole],
};

describe("RBAC-ABAC Permission System", () => {
  describe("Admin User - Full Access", () => {
    test("should have permission to create users", () => {
      expect(hasPermission(adminUser, Permission.CREATE_USER)).toBe(true);
    });

    test("should have permission to delete posts", () => {
      expect(hasPermission(adminUser, Permission.DELETE_POST)).toBe(true);
    });

    test("should have permission to read comments", () => {
      expect(hasPermission(adminUser, Permission.READ_COMMENT)).toBe(true);
    });

    test("should have permission to delete users", () => {
      expect(hasPermission(adminUser, Permission.DELETE_USER)).toBe(true);
    });

    test("should have all permissions", () => {
      Object.values(Permission).forEach((permission) => {
        expect(hasPermission(adminUser, permission)).toBe(true);
      });
    });
  });

  describe("Moderator User - Content Management", () => {
    test("should have permission to create posts", () => {
      expect(hasPermission(moderatorUser, Permission.CREATE_POST)).toBe(true);
    });

    test("should have permission to delete posts", () => {
      expect(hasPermission(moderatorUser, Permission.DELETE_POST)).toBe(true);
    });

    test("should NOT have permission to create users", () => {
      expect(hasPermission(moderatorUser, Permission.CREATE_USER)).toBe(false);
    });

    test("should have permission to read users", () => {
      expect(hasPermission(moderatorUser, Permission.READ_USER)).toBe(true);
    });

    test("should have content management permissions", () => {
      expect(hasPermission(moderatorUser, Permission.CREATE_POST)).toBe(true);
      expect(hasPermission(moderatorUser, Permission.UPDATE_POST)).toBe(true);
      expect(hasPermission(moderatorUser, Permission.DELETE_POST)).toBe(true);
      expect(hasPermission(moderatorUser, Permission.CREATE_COMMENT)).toBe(
        true
      );
      expect(hasPermission(moderatorUser, Permission.UPDATE_COMMENT)).toBe(
        true
      );
      expect(hasPermission(moderatorUser, Permission.DELETE_COMMENT)).toBe(
        true
      );
    });
  });

  describe("Author User - Content Creation", () => {
    test("should have permission to create posts", () => {
      expect(hasPermission(authorUser, Permission.CREATE_POST)).toBe(true);
    });

    test("should have permission to update posts", () => {
      expect(hasPermission(authorUser, Permission.UPDATE_POST)).toBe(true);
    });

    test("should NOT have permission to delete posts", () => {
      expect(hasPermission(authorUser, Permission.DELETE_POST)).toBe(false);
    });

    test("should NOT have permission to create users", () => {
      expect(hasPermission(authorUser, Permission.CREATE_USER)).toBe(false);
    });

    test("should have content creation permissions", () => {
      expect(hasPermission(authorUser, Permission.CREATE_POST)).toBe(true);
      expect(hasPermission(authorUser, Permission.READ_POST)).toBe(true);
      expect(hasPermission(authorUser, Permission.UPDATE_POST)).toBe(true);
      expect(hasPermission(authorUser, Permission.CREATE_COMMENT)).toBe(true);
      expect(hasPermission(authorUser, Permission.READ_COMMENT)).toBe(true);
      expect(hasPermission(authorUser, Permission.UPDATE_COMMENT)).toBe(true);
    });
  });

  describe("Reader User - Content Consumption", () => {
    test("should have permission to read posts", () => {
      expect(hasPermission(readerUser, Permission.READ_POST)).toBe(true);
    });

    test("should have permission to create comments", () => {
      expect(hasPermission(readerUser, Permission.CREATE_COMMENT)).toBe(true);
    });

    test("should NOT have permission to update posts", () => {
      expect(hasPermission(readerUser, Permission.UPDATE_POST)).toBe(false);
    });

    test("should NOT have permission to create users", () => {
      expect(hasPermission(readerUser, Permission.CREATE_USER)).toBe(false);
    });

    test("should have limited permissions", () => {
      expect(hasPermission(readerUser, Permission.READ_POST)).toBe(true);
      expect(hasPermission(readerUser, Permission.READ_COMMENT)).toBe(true);
      expect(hasPermission(readerUser, Permission.CREATE_COMMENT)).toBe(true);

      // Should not have these permissions
      expect(hasPermission(readerUser, Permission.UPDATE_POST)).toBe(false);
      expect(hasPermission(readerUser, Permission.DELETE_POST)).toBe(false);
      expect(hasPermission(readerUser, Permission.CREATE_USER)).toBe(false);
    });
  });

  describe("Multi-Role User - Combined Permissions", () => {
    test("should have author permissions", () => {
      expect(hasPermission(multiRoleUser, Permission.CREATE_POST)).toBe(true);
      expect(hasPermission(multiRoleUser, Permission.UPDATE_POST)).toBe(true);
    });

    test("should have reader permissions", () => {
      expect(hasPermission(multiRoleUser, Permission.READ_COMMENT)).toBe(true);
      expect(hasPermission(multiRoleUser, Permission.CREATE_COMMENT)).toBe(
        true
      );
    });

    test("should NOT have permissions not in either role", () => {
      expect(hasPermission(multiRoleUser, Permission.DELETE_POST)).toBe(false);
      expect(hasPermission(multiRoleUser, Permission.CREATE_USER)).toBe(false);
    });

    test("should combine permissions from both roles", () => {
      const allPermissions = [
        Permission.CREATE_POST,
        Permission.READ_POST,
        Permission.UPDATE_POST,
        Permission.CREATE_COMMENT,
        Permission.READ_COMMENT,
        Permission.UPDATE_COMMENT,
      ];

      allPermissions.forEach((permission) => {
        expect(hasPermission(multiRoleUser, permission)).toBe(true);
      });
    });
  });

  describe("Edge Cases", () => {
    test("should handle invalid permissions", () => {
      const invalidPermission = "INVALID_PERMISSION" as Permission;
      expect(hasPermission(adminUser, invalidPermission)).toBe(false);
    });

    test("should handle user with no roles", () => {
      const emptyUser: User = {
        id: "6",
        email: "empty@example.com",
        roles: [],
      };
      expect(hasPermission(emptyUser, Permission.READ_POST)).toBe(false);
    });

    test("should handle user with undefined roles", () => {
      const userWithUndefinedRoles: User = {
        id: "7",
        email: "undefined@example.com",
        roles: [] as Role[],
      };
      expect(hasPermission(userWithUndefinedRoles, Permission.READ_POST)).toBe(
        false
      );
    });
  });

  describe("Business Logic Validation", () => {
    test("moderator should moderate content but not manage users", () => {
      // Can moderate content
      expect(hasPermission(moderatorUser, Permission.DELETE_POST)).toBe(true);
      expect(hasPermission(moderatorUser, Permission.DELETE_COMMENT)).toBe(
        true
      );

      // Cannot manage users
      expect(hasPermission(moderatorUser, Permission.CREATE_USER)).toBe(false);
      expect(hasPermission(moderatorUser, Permission.DELETE_USER)).toBe(false);
    });

    test("author should create and edit content but not delete", () => {
      // Can create and edit
      expect(hasPermission(authorUser, Permission.CREATE_POST)).toBe(true);
      expect(hasPermission(authorUser, Permission.UPDATE_POST)).toBe(true);

      // Cannot delete
      expect(hasPermission(authorUser, Permission.DELETE_POST)).toBe(false);
    });

    test("reader should consume content and participate", () => {
      // Can consume
      expect(hasPermission(readerUser, Permission.READ_POST)).toBe(true);
      expect(hasPermission(readerUser, Permission.READ_COMMENT)).toBe(true);

      // Can participate
      expect(hasPermission(readerUser, Permission.CREATE_COMMENT)).toBe(true);

      // Cannot modify
      expect(hasPermission(readerUser, Permission.UPDATE_POST)).toBe(false);
      expect(hasPermission(readerUser, Permission.DELETE_POST)).toBe(false);
    });

    test("admin should have complete control", () => {
      Object.values(Permission).forEach((permission) => {
        expect(hasPermission(adminUser, permission)).toBe(true);
      });
    });
  });
});
