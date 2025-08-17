# ⚡️ rgen-cli

> 🚧 **This project is still in Beta** – expect breaking changes.

### A blazing-fast CLI for React developers.

`rgen-cli` helps you **kickstart your React projects** and **scaffold essential building blocks**—like components, hooks, pages, layouts, routes, contexts, forms, and stores—with just a single command.

Whether you're starting fresh or scaling fast, `rgen-cli` keeps your codebase clean, consistent, and organized.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/rgen-cli.svg)](https://npmjs.org/package/rgen-cli)
[![Downloads/week](https://img.shields.io/npm/dw/rgen-cli.svg)](https://npmjs.org/package/rgen-cli)

---

## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)

  - [Initialize Your Project](#🧭-initialize-your-project)
  - [Add Path Aliases](#🔗-add-path-aliases)
  - [Finish Tailwind Setup](#🎨-last-step---finish-tailwind-setup)

- [Rules](#rules)

  - [Basic Name](#✅-basic-name)
  - [Dot Notation](#🟠-dot-notation)
  - [Dash Notation](#🟠-dash-notation)

- [Commands](#commands)

  - [`rgen-cli init`](#rgen-cli-init)
  - [`rgen-cli make`](#rgen-cli-make)

    - [`rgen-cli make component`](#rgen-cli-make-component-component-name)
    - [`rgen-cli make context`](#rgen-cli-make-context-context-name)
    - [`rgen-cli make hook`](#rgen-cli-make-hook-hook-name)
    - [`rgen-cli make layout`](#rgen-cli-make-layout-layout-name)
    - [`rgen-cli make page`](#rgen-cli-make-page-page-name)
    - [`rgen-cli make route`](#rgen-cli-make-route-route-name)
    - [`rgen-cli make store`](#rgen-cli-make-store-store-name)
    - [`rgen-cli make form`](#rgen-cli-make-form-form-name)

---

# Installation

```sh
npm install -g rgen-cli
```

[Back to top](#table-of-contents)

---

# 🚀 Getting Started

Before using `rgen-cli`, make sure you're inside a **React project**—either JavaScript or TypeScript.
If you don’t have one yet, scaffold a new project using **Vite**:

👉 [Scaffolding your first Vite project](https://vite.dev/guide/#scaffolding-your-first-vite-project)

---

## 🧭 Initialize Your Project

```sh
rgen-cli init
```

Prepares your `src` directory and configuration files for use with `rgen-cli`.

[Back to top](#table-of-contents)

---

## 🔗 Add Path Aliases

Add the following to your `vite.config.js` or `vite.config.ts`:

```ts
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path' // 👈 Add this

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 👈 Add this
    },
  },
})
```

Then you can import modules like:

```ts
import Button from '@/components/Button'
```

Instead of relative paths:

```ts
import Button from '../../components/Button'
```

[Back to top](#table-of-contents)

---

## 🎨 Last step - Finish Tailwind Setup

Follow the official guide: [TailwindCSS + Vite Installation](https://tailwindcss.com/docs/installation/using-vite)

[Back to top](#table-of-contents)

---

# Rules

### ✅ Basic Name

```sh
rgen-cli make component button
```

- **Component/Class Name**: `Button`
- **Folder Path**: `src/components/button`

### 🟠 Dot (`.`) Notation

```sh
rgen-cli make dashboard.header
```

- **Component/Class Name**: `DashboardHeader`
- **Folder Path**: `src/components/dashboard/header`

### 🟠 Dash (`-`) Notation

```sh
rgen-cli make page user-profile
```

- **Component/Class Name**: `UserProfile`
- **Folder Path**: `src/pages/user-profile`

[Back to top](#table-of-contents)

---

# Commands

## `rgen-cli init`

Initializes a React project with essential utilities and TailwindCSS setup.
Steps include:

- Install TailwindCSS and @tailwindcss/vite
- Install `clsx` and `tailwind-merge`
- Create `cn` utility function in `src/libs/utils.ts`
- Generate `rgen-cli.json` configuration file
- Add TypeScript path alias `@/_ -> ./src/_`

[Back to top](#table-of-contents)

---

## `rgen-cli make`

Quickly create React project elements: components, hooks, layouts, pages, routes, contexts, forms, or stores.

```sh
rgen-cli make
```

- Prompt for type
- Prompt for name
- Generate files in the correct folder

[Back to top](#table-of-contents)

---

## `rgen-cli make component <component-name>`

Generates a new React component in `src/components`.

```sh
rgen-cli make component button
```

### 🛠️ What It Does

- Creates `.tsx` or `.jsx` template based on project setup
- Places files in `src/components/<component-name>/`

### ✅ Example

```sh
rgen-cli make component button
```

Generates:

```
src/components/button/Button.tsx
```

[Back to top](#table-of-contents)

---

## `rgen-cli make context <context-name>`

Generates a React context in `src/contexts`.

```sh
rgen-cli make context auth
```

### 🛠️ What It Does

- Create `<name>Context.tsx`
- Create `<name>Provider.tsx`
- Create `use<name>.ts` hook
- Create `types.ts` (TypeScript only)
- Create `index.ts` export

### ✅ Example

```
src/contexts/auth/AuthContext.tsx
src/contexts/auth/AuthProvider.tsx
src/contexts/auth/useAuth.ts
src/contexts/auth/types.ts
src/contexts/auth/index.ts
```

[Back to top](#table-of-contents)

---

## `rgen-cli make hook <hook-name>`

Generates a custom React hook in `src/hooks`.

```sh
rgen-cli make hook theme
```

### 🛠️ What It Does

- Create `use<HookName>.ts` or `.js`

### ✅ Example

```
src/hooks/theme/useTheme.ts
```

[Back to top](#table-of-contents)

---

## `rgen-cli make layout <layout-name>`

Generates a layout component in `src/layouts`.

```sh
rgen-cli make layout dashboard
```

### 🛠️ What It Does

- Create `<LayoutName>Layout.tsx` or `.jsx`

### ✅ Example

```
src/layouts/dashboard/DashboardLayout.tsx
```

[Back to top](#table-of-contents)

---

## `rgen-cli make page <page-name>`

Generates a page component in `src/pages`.

```sh
rgen-cli make page profile
```

### 🛠️ What It Does

- Create `index.tsx` or `.jsx` inside folder named after page
- Default export component named `<PageName>Page`

### ✅ Example

```
src/pages/profile/index.tsx
```

[Back to top](#table-of-contents)

---

## `rgen-cli make route <route-name>`

Adds a route in `src/routes`.

```sh
rgen-cli make route dashboard
```

### 🏷️ Flags

| Flag | Description                                       |
| ---- | ------------------------------------------------- |
| `-p` | **Optional**. Creates a page along with the route |

### 🛠️ What It Does

- Initializes routing system (if not exists)
- Creates `routes/<RouteName>/index.tsx`
- Adds `<Route>` for the path
- Optionally generates page if `-p` flag is used

### ✅ Example

```sh
rgen-cli make route dashboard -p
```

Generates:

```
src/routes/Dashboard/index.tsx
src/pages/dashboard/index.tsx
```

### ! Important

Make sure your app uses the generated router:

```tsx
import AppRoutes from '@/routes' // 👈 add this

createRoot(document.getElementById('root')!).render(
  <AppRoutes />, // 👈 add this
)
```

[Back to top](#table-of-contents)

---

## `rgen-cli make store <store-name>`

Generates a Redux store slice in `src/store`.

```sh
rgen-cli make store auth
```

### 🛠️ What It Does

- Initialize Redux store (`store/index.tsx`)
- Add slice in `store/state/<store-name>/<StoreName>.ts`
- Add typed hooks (TypeScript only) in `store/state/hooks.ts`

### 📦 Auto-Installed Packages

- `react-redux`
- `@reduxjs/toolkit`

### ✅ Example

```
src/store/index.tsx
src/store/state/auth/Auth.ts
src/store/state/hooks.ts
```

### ! Important

Make sure your app uses the generated store:

```tsx
import {Provider} from 'react-redux'
import store from '@/store'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
```

[Back to top](#table-of-contents)

---

## `rgen-cli make form <form-name> -p <page-name>`

Scaffolds a form using **React Hook Form** + **Zod** in the page context.

```sh
rgen-cli make form login -p auth
```

### 🏷️ Flags

| Flag | Description                                      |
| ---- | ------------------------------------------------ |
| `-p` | **Required**. Creates a form inside @/pages/auth |

### 🛠️ What It Does

- Creates Zod schema (`login.schema.ts`)
- Creates hook (`useLoginForm.ts`)
- Creates form component (`LoginForm.tsx`)
- Organizes files under `src/pages/<page-name>/forms/`

### 📦 Auto-Installed Packages

- `react-hook-form`
- `zod`
- `@hookform/resolvers`

### ✅ Example

```
src/pages/auth/forms/
├── login.schema.ts
├── useLoginForm.ts
└── LoginForm.tsx
```

[Back to top](#table-of-contents)

---
