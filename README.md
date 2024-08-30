<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="20%" alt="ZENLANES-SERVICES-logo">
</p>
<p align="center">
    <h1 align="center">ZENLANES-SERVICES</h1>
</p>
<p align="center">
    <em>Empowering seamless deployment and secure user management</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/oussama-debug/zenlanes-services?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/oussama-debug/zenlanes-services?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/oussama-debug/zenlanes-services?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/oussama-debug/zenlanes-services?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>

<br>

##### Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Repository Structure](#-repository-structure)
- [ Modules](#-modules)
- [ Getting Started](#-getting-started)
  - [ Prerequisites](#-prerequisites)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
  - [ Tests](#-tests)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)

---

## Overview

Zenlanes-services is a robust software project that provides seamless packaging and deployment of TypeScript code. It integrates with various dependencies like Clerk and Knex to handle user authentication and payment processing efficiently. Through structured modules like accounts and authentication, Zenlanes-services ensures secure access to sensitive information and facilitates user account management. Overall, the project offers a valuable platform for building secure, scalable services with comprehensive features for developers leveraging TypeScript and relevant technologies.

---

## Features

|     | Feature           | Description                                                                                                                             |
| --- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| ⚙️  | **Architecture**  | Microservices architecture using TypeScript with Docker bundling. Uses Clerk, Encore.Dev, Knex, Luxon, and pg for enhanced development. |
| 🔩  | **Code Quality**  | Well-structured codebase with strict type-checking and module resolution. Consistent naming conventions and ES2022 features support.    |
| 📄  | **Documentation** | Extensive documentation covering dependencies, configuration, and setup for each module. Descriptive comments and inline documentation. |
| 🔌  | **Integrations**  | Integrated with Clerk for authentication, Encore.Dev for build configuration, and Knex for database management.                         |
| 🧩  | **Modularity**    | Highly modular codebase with separate modules for accounts and authentication. Interfaces and schemas for maintainability.              |
| 🧪  | **Testing**       | Information on testing frameworks/tools isn't provided in the repository contents.                                                      |
| ⚡️ | **Performance**   | Efficient resource usage with optimized Docker bundling and strict type-checking. Fast execution with TypeScript compilation.           |
| 🛡️  | **Security**      | Secure handling of sensitive configurations like secret keys. Proper error handling and authentication logic for data protection.       |
| 📦  | **Dependencies**  | Dependencies include Clerk, Encore.Dev, Knex, Luxon, pg, and other essential libraries for functionality.                               |
| 🚀  | **Scalability**   | Built-in scalability with microservices architecture and modular codebase for easy scaling.                                             |

---

## Repository Structure

```sh
└── zenlanes-services/
    ├── README.md
    ├── accounts
    │   ├── common
    │   ├── index.ts
    │   ├── migrations
    │   ├── payments.ts
    │   └── secrets.ts
    ├── authentication
    │   ├── common
    │   ├── index.ts
    │   ├── migrations
    │   ├── secrets.ts
    │   └── users.ts
    ├── encore.app
    ├── package.json
    ├── tsconfig.json
    └── yarn.lock
```

---

## Modules

<details closed><summary>.</summary>

| File                                                                                        | Summary                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [encore.app](https://github.com/oussama-debug/zenlanes-services/blob/main/encore.app)       | Defines build configuration in encore.app for Docker bundling in zenlanes-services repository, enabling seamless packaging of TypeScript code. Identifies service with id zenlanes-services-tma2 and specifies language as TypeScript. Provisions to bundle source code for enhanced deployment efficiency. |
| [package.json](https://github.com/oussama-debug/zenlanes-services/blob/main/package.json)   | Defines dependencies for Zenlanes Gateway & services, facilitating integration with Clerk, Encore.Dev, Knex, Luxon, pg, and more. Supports TypeScript with Luxon and Node type definitions for enhanced development.                                                                                        |
| [tsconfig.json](https://github.com/oussama-debug/zenlanes-services/blob/main/tsconfig.json) | Enables strict type-checking and module resolution for the repository, defining paths for module resolution and workspace settings. Supports ES2022 features and ensures consistent file naming conventions.                                                                                                |

</details>

<details closed><summary>accounts</summary>

| File                                                                                             | Summary                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [secrets.ts](https://github.com/oussama-debug/zenlanes-services/blob/main/accounts/secrets.ts)   | Retrieves sensitive configurations like the secret key for Stripe from the encore.dev/config library. This file facilitates secure access to confidential information within the accounts module of the Zenlanes services repository. |
| [payments.ts](https://github.com/oussama-debug/zenlanes-services/blob/main/accounts/payments.ts) | Defines a PubSub topic and a subscription for creating Stripe customers and accounts in the payments module to handle payment-related events.                                                                                         |
| [index.ts](https://github.com/oussama-debug/zenlanes-services/blob/main/accounts/index.ts)       | Implements database setup for the accounts service, connecting SQL database and ORM with migration support.                                                                                                                           |

</details>

<details closed><summary>accounts.common.account</summary>

| File                                                                                                          | Summary                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [account.ts](https://github.com/oussama-debug/zenlanes-services/blob/main/accounts/common/account/account.ts) | Defines interface `SUBCreateCustomerAndAccountEvent` in parent repository `zenlanes-services`. Facilitates creating customer accounts with associated user IDs. Organized under `accounts/common` directory for cohesive structure and easy maintainability within the projects architecture. |

</details>

<details closed><summary>accounts.migrations</summary>

| File                                                                                                                                              | Summary                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [1_create_accounts_table.up.sql](https://github.com/oussama-debug/zenlanes-services/blob/main/accounts/migrations/1_create_accounts_table.up.sql) | Defines schema for accounts table with billing details in JSON format; ensures unique IDs and timestamps. |

</details>

<details closed><summary>authentication</summary>

| File                                                                                                 | Summary                                                                                                                                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [users.ts](https://github.com/oussama-debug/zenlanes-services/blob/main/authentication/users.ts)     | Enables user signup and retrieves user data securely for the authentication service. Handles user account creation and retrieval with proper error handling. Central to managing user information within the authentication module of the repository.                   |
| [secrets.ts](https://github.com/oussama-debug/zenlanes-services/blob/main/authentication/secrets.ts) | Defines a secret key variable for the Clerk authentication service in the authentication module. Imports a configuration function from encore.dev/config to securely access and manage sensitive information for user authentication within the project's architecture. |
| [index.ts](https://github.com/oussama-debug/zenlanes-services/blob/main/authentication/index.ts)     | Implements authentication logic for Zenlanes services using Clerk and SQL databases. Handles token verification, session retrieval, and user validation for secure access. Integrates with API Gateway for authentication control.                                      |

</details>

<details closed><summary>authentication.common.users</summary>

| File                                                                                                          | Summary                                                                                |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [index.ts](https://github.com/oussama-debug/zenlanes-services/blob/main/authentication/common/users/index.ts) | Defines user data structure and API responses, integrates user table schema with Knex. |

</details>

<details closed><summary>authentication.common.authentication</summary>

| File                                                                                                                   | Summary                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [index.ts](https://github.com/oussama-debug/zenlanes-services/blob/main/authentication/common/authentication/index.ts) | Defines authentication header parameters and public user data structure for secure API access. Extends User with user-specific details. |

</details>

<details closed><summary>authentication.migrations</summary>

| File                                                                                                                                              | Summary                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [1_create_users_table.up.sql](https://github.com/oussama-debug/zenlanes-services/blob/main/authentication/migrations/1_create_users_table.up.sql) | Defines users table schema for user authentication module in the repository. Ensures uniqueness for user_clerk_id and username fields. Provides columns for timestamp tracking. Facilitates user data storage and retrieval. |

</details>

---

## Getting Started

### Prerequisites

**TypeScript**: `version x.y.z`

### Installation

Build the project from source:

1. Clone the zenlanes-services repository:

```sh
❯ git clone https://github.com/oussama-debug/zenlanes-services
```

2. Navigate to the project directory:

```sh
❯ cd zenlanes-services
```

3. Install the required dependencies:

```sh
❯ npm install
```

### Usage

To run the project, execute the following command:

```sh
❯ npm run build && node dist/main.js
```

### Tests

Execute the test suite using the following command:

```sh
❯ npm test
```

---

## Project Roadmap

- [x] **`Task 1`**: <strike>Implement feature one.</strike>
- [ ] **`Task 2`**: Implement feature two.
- [ ] **`Task 3`**: Implement feature three.

---

## Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://github.com/oussama-debug/zenlanes-services/issues)**: Submit bugs found or log feature requests for the `zenlanes-services` project.
- **[Submit Pull Requests](https://github.com/oussama-debug/zenlanes-services/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/oussama-debug/zenlanes-services/discussions)**: Share your insights, provide feedback, or ask questions.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/oussama-debug/zenlanes-services
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/oussama-debug/zenlanes-services/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=oussama-debug/zenlanes-services">
   </a>
</p>
</details>

---

## License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## Acknowledgments

- List any resources, contributors, inspiration, etc. here.

---
