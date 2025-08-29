# RBAC-ABAC Permission System

A robust Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC) system implemented in TypeScript with comprehensive testing using Jest.

## 🎯 Overview

This project implements a flexible permission system that combines:

- **RBAC (Role-Based Access Control)**: Users are assigned roles, and roles have permissions
- **ABAC (Attribute-Based Access Control)**: Access control based on user attributes and context

## 🏗️ Architecture

### Core Components

- **Permissions**: Granular actions that can be performed (create, read, update, delete)
- **Roles**: Collections of permissions that define user capabilities
- **Users**: Entities that have one or more roles
- **Permission Checker**: Function that validates if a user has a specific permission

### Permission Types

```typescript
export enum Permission {
  // User Management
  CREATE_USER = "create_user",
  READ_USER = "read_user",
  UPDATE_USER = "update_user",
  DELETE_USER = "delete_user",

  // Post Management
  CREATE_POST = "create_post",
  READ_POST = "read_post",
  UPDATE_POST = "update_post",
  DELETE_POST = "delete_post",

  // Comment Management
  CREATE_COMMENT = "create_comment",
  READ_COMMENT = "read_comment",
  UPDATE_COMMENT = "update_comment",
  DELETE_COMMENT = "delete_comment",
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd permission-auth

# Install dependencies
pnpm install

# Build the project
pnpm build

# Run tests
pnpm test
```

## 📚 Usage Examples

### Basic Permission Check

```typescript
import { Permission, Role, User, hasPermission } from "./rbac-abac";

// Define a role
const adminRole: Role = {
  id: "admin",
  name: "Administrator",
  permissions: [
    Permission.CREATE_USER,
    Permission.DELETE_USER,
    Permission.CREATE_POST,
    Permission.DELETE_POST,
  ],
};

// Create a user with the role
const adminUser: User = {
  id: "1",
  email: "admin@example.com",
  roles: [adminRole],
};

// Check permissions
const canCreateUser = hasPermission(adminUser, Permission.CREATE_USER); // true
const canDeletePost = hasPermission(adminUser, Permission.DELETE_POST); // true
const canCreateComment = hasPermission(adminUser, Permission.CREATE_COMMENT); // false
```

### Multi-Role Users

```typescript
const authorRole: Role = {
  id: "author",
  name: "Author",
  permissions: [Permission.CREATE_POST, Permission.UPDATE_POST],
};

const readerRole: Role = {
  id: "reader",
  name: "Reader",
  permissions: [Permission.READ_POST, Permission.CREATE_COMMENT],
};

const multiRoleUser: User = {
  id: "2",
  email: "author@example.com",
  roles: [authorRole, readerRole],
};

// User has permissions from both roles
const canCreatePost = hasPermission(multiRoleUser, Permission.CREATE_POST); // true
const canReadPost = hasPermission(multiRoleUser, Permission.READ_POST); // true
const canCreateComment = hasPermission(
  multiRoleUser,
  Permission.CREATE_COMMENT
); // true
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode (development)
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage

# Build the project
pnpm build
```

### Test Coverage

The project maintains **100% test coverage** including:

- ✅ **Admin User**: Full system access
- ✅ **Moderator User**: Content management capabilities
- ✅ **Author User**: Content creation and editing
- ✅ **Reader User**: Content consumption and participation
- ✅ **Multi-Role User**: Combined permissions from multiple roles
- ✅ **Edge Cases**: Invalid permissions, empty roles
- ✅ **Business Logic**: Role-specific permission validation

### Test Structure

```typescript
describe("RBAC-ABAC Permission System", () => {
  describe("Admin User - Full Access", () => {
    test("should have permission to create users", () => {
      expect(hasPermission(adminUser, Permission.CREATE_USER)).toBe(true);
    });

    test("should have all permissions", () => {
      Object.values(Permission).forEach((permission) => {
        expect(hasPermission(adminUser, permission)).toBe(true);
      });
    });
  });
});
```

## 🔧 Configuration

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: false }],
  },
  testMatch: ["**/*.test.ts"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
};
```

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "moduleResolution": "node",
    "strict": true,
    "outDir": "./dist",
    "declaration": true
  }
}
```

## 📊 Role Hierarchy

### Administrator

- **Full system access**
- User management (CRUD)
- Content management (CRUD)
- System configuration

### Moderator

- **Content moderation**
- Post and comment management
- User information viewing
- No user management

### Author

- **Content creation**
- Post creation and editing
- Comment management
- No content deletion

### Reader

- **Content consumption**
- Post and comment reading
- Comment creation
- No content modification

## 🎨 Best Practices

### 1. Role Design

- Keep roles focused and single-purpose
- Use descriptive permission names
- Avoid overly granular permissions

### 2. Permission Naming

- Use consistent naming conventions
- Follow the pattern: `ACTION_RESOURCE`
- Examples: `CREATE_USER`, `DELETE_POST`

### 3. Testing

- Test both positive and negative cases
- Cover edge cases and error scenarios
- Maintain high test coverage

### 4. Security

- Validate permissions on every request
- Implement proper authentication
- Log permission checks for audit

## 🚀 Advanced Features

### Custom Permission Types

```typescript
// Extend the Permission enum
export enum Permission {
  // ... existing permissions

  // Custom business permissions
  APPROVE_INVOICE = "approve_invoice",
  VIEW_SALARY = "view_salary",
  MANAGE_PROJECTS = "manage_projects",
}
```

### Dynamic Permission Checking

```typescript
// Check multiple permissions at once
function hasAnyPermission(user: User, permissions: Permission[]): boolean {
  return permissions.some((permission) => hasPermission(user, permission));
}

function hasAllPermissions(user: User, permissions: Permission[]): boolean {
  return permissions.every((permission) => hasPermission(user, permission));
}
```

## 📈 Performance Considerations

- **Permission caching**: Cache user permissions for frequently accessed users
- **Role optimization**: Minimize role lookups in high-traffic scenarios
- **Batch operations**: Check multiple permissions in single calls when possible

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🔗 Related Resources

- [RBAC Wikipedia](https://en.wikipedia.org/wiki/Role-based_access_control)
- [ABAC Wikipedia](https://en.wikipedia.org/wiki/Attribute-based_access_control)
- [Jest Testing Framework](https://jestjs.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
