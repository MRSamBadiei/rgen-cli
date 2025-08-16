# ⚡️ rgen-cli

> 🚧 **This project is still in Beta** – expect breaking changes.

### A blazing-fast CLI for React developers.

`rgen-cli` helps you **kickstart your React projects** and **scaffold essential building blocks**—like components, hooks, pages, layouts, routes, and contexts—with just a single command.

Whether you're starting fresh or scaling fast, `rgen-cli` keeps your codebase clean, consistent, and organized.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

[![Version](https://img.shields.io/npm/v/rgen-cli.svg)](https://npmjs.org/package/rgen-cli)

[![Downloads/week](https://img.shields.io/npm/dw/rgen-cli.svg)](https://npmjs.org/package/rgen-cli)

<!-- toc -->

- [Installation](#installation) - [Getting Started](#getting-started) - [Rules](#rules) - [Commands](#commands)

<!-- tocstop -->

# Installation

<!-- Installation -->

```sh-session
$ npm install -g rgen-cli

```

# 🚀 Getting Started

Before using `rgen-cli`, make sure you're inside a **React project**—either JavaScript or TypeScript.

If you don’t have one yet, you can quickly scaffold a new project using **Vite**:

👉 [Scaffolding your first Vite project](https://vite.dev/guide/#scaffolding-your-first-vite-project)

## 🧭 Initialize Your Project

Run the following command to set up your project structure:

```sh-session
$ rgen-cli init

```

This will prepare your `src` directory and configuration files for use with `rgen-cli`.

## 🔗 Add Path Aliases

To simplify your imports, add the following configuration to your `vite.config.js` or `vite.config.ts`:

```ts
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path' // 👈 Add this

// https://vite.dev/config/

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 👈 Add this
    },
  },
})
```

> ⚠️ Be sure to include the **entire `resolve` section**, not just the alias line. This ensures proper path resolution throughout your project.

Once added, you can import modules like this:

```ts
import Button from '@/components/Button'
```

Instead of:

```ts
import Button from '../../components/Button'
```

## 🎨 Last step - [Finish Tailwind Setup]

To complete your TailwindCSS configuration, follow the official guide:

👉 [TailwindCSS + Vite Installation](https://tailwindcss.com/docs/installation/using-vite)

# Rules

When using `rgen-cli make`, the name you provide determines both the **component name** and the **folder structure**. Here are the rules you should follow:

### ✅ Basic Name

```sh-session
$ rgen-cli make component button

```

- **Component/Class Name**: `Button`

- **Folder Path**: `src/<type>/button`

---

### 🟠 Dot (`.`) Notation

```sh-session
$ rgen-cli make dashboard.header

```

- **Component/Class Name**: `DashboardHeader`

- **Folder Path**: `src/<type>/dashboard/header`

Use this to create nested folders.

---

### 🟠 Dash (`-`) Notation

```sh-session
$ rgen-cli make page user-profile

```

- **Component/Class Name**: `UserProfile`

- **Folder Path**: `src/<type>/user-profile`

Use this for compound names. It will not create nested folders.

# Commands

<!-- commands -->

- [`rgen-cli init`](#rgen-cli-init)

- [`rgen-cli make`](#rgen-cli-make)

  - [`rgen-cli make component`](#rgen-cli-make-component-component-name)

  - [`rgen-cli make context`](#rgen-cli-make-context-context-name)

  - [`rgen-cli make hook`](#rgen-cli-make-hook-hook-name)

  - [`rgen-cli make layout`](#rgen-cli-make-layout-layout-name)

  - [`rgen-cli make page`](#rgen-cli-make-page-page-name)

  - [`rgen-cli make route`](#rgen-cli-make-route-route-name)

## `rgen-cli init`

Initializes a new React project with essential utilities and TailwindCSS setup.

This command performs the following steps:

1. Installs TailwindCSS and @tailwindcss/vite for styling.

2. Installs 'clsx' for conditional classNames in React components.

3. Installs 'tailwind-merge' to merge Tailwind class strings efficiently.

4. Creates a utility function 'cn' in 'src/libs/utils.ts' that combines clsx and tailwind-merge.

5. Generates a 'rgen-cli.json' configuration file with base path and debug settings.

6. Adds a TypeScript path alias '@/_ -> ./src/_' in 'tsconfig.app.json' for cleaner imports.

## `rgen-cli make`

The `make` command helps you **quickly create React project elements** like components, hooks, layouts, pages, routes, or contexts.

## Usage

```sh-session
$ rgen-cli make

```

The command will prompt you to:

1.  **Select the type of item** you want to create:

- `component` — a reusable React component

- `hook` — a custom React hook

- `layout` — a layout wrapper for pages or sections

- `page` — a full page component

- `route` — a route module for react-router

- `context` — a React context for state management

2.  **Enter the name** of the item.

The CLI will then automatically generate the files in the appropriate folder with boilerplate code.

### ✅ Example

```sh-session
$ rgen-cli make

```

**Prompt:**

```
Select what you want to create: component
Enter the name for the component: Button

```

## `rgen-cli make component <component-name>`

Generates a new React component in the `components` directory.

### 🛠️ What It Does

- Automatically creates a `.tsx` or `.jsx` template based on your setup

### ✅ Example

```sh-session
$ rgen-cli make component button

```

This will generate:

- `src/components/button/Button.tsx` or `.jsx`

## `rgen-cli make context <context-name>`

Generates a full React context setup in the `contexts` directory.

### 🛠️ What It Does

When you run this command, the CLI will automatically:

- Create a context file (`<name>Context.tsx` or `.jsx`)

- Create a provider component (`<name>Provider.tsx` or `.jsx`)

- Create a custom hook (`use<name>.ts` or `.js`)

- Create a types file (`types.ts`) if using TypeScript

- Create an index file to export everything

All files are placed inside the `contexts` folder and wired together for immediate use.

### ✅ Example

```sh-session
$ rgen-cli make context auth

```

This will generate:

- `src/contexts/auth/AuthContext.tsx` or `.jsx`

- `src/contexts/auth/AuthProvider.tsx` or `.jsx`

- `src/contexts/auth/useAuth.ts` or `.js`

- `src/contexts/auth/types.ts` (TypeScript only)

- `src/contexts/auth/index.ts` or `.js`

## `rgen-cli make hook <hook-name>`

Generates a custom React hook in the `hooks` directory.

### 🛠️ What It Does

When you run this command, the CLI will automatically:

- Create a new hook template named `use<HookName>.ts` or `.js`

### ✅ Example

```sh-session
$ rgen-cli make hook theme

```

This will generate:

- `src/hooks/theme/useTheme.ts` (or `useTheme.js`)

Perfect! Here's a **simple and clear Markdown explanation** for the `layout` CLI command, consistent with your other docs:

## `rgen-cli make layout <layout-name>`

Generates a basic layout component in the `layouts` directory.

### 🛠️ What It Does

When you run this command, the CLI will automatically:

- Create a new layout template named `<LayoutName>Layout.tsx` or `.jsx`

### ✅ Example

```sh-session
$ rgen-cli make layout dashboard

```

This will generate:

- `src/layouts/dashboard/DashboardLayout.tsx` (or `DashboardLayout.jsx`)

## `rgen-cli make page <page-name>`

Generates a basic page component in the `pages` directory.

### 🛠️ What It Does

When you run this command, the CLI will automatically:

- Create a new page file named `index.tsx` or `index.jsx` inside a folder named after your page

### ✅ Example

```sh-session
$ rgen-cli make page profile

```

This will generate:

- `pages/profile/index.tsx` (or `index.jsx`)

- With a default export component named `ProfilePage`

## `rgen-cli make route <route-name>`

Initializes the routing system and adds a new route to the `routes` directory.

### 🛠️ What It Does

When you run this command, the CLI will:

1.  **Initialize the routing system** (if not already set up):

- Creates a `routes/index.tsx` or `.jsx` file

- Dynamically loads route modules using `import.meta.glob`

- Sets up a `<BrowserRouter>` with `<Routes>` and auto-injected route components

2.  **Add a new route**:

- Creates a file `routes/<RouteName>/index.tsx` or `.jsx`

- Exports a `<Route>` element for the given path

### Flags

- `-p` → Creates a page along with the route

### ✅ Example

```sh-session
$ rgen-cli make route dashboard

```

This will:

- Create `routes/Dashboard/index.tsx` (or `.jsx`)

- Add a route for `/dashboard`

- If routing is not yet initialized, it will also create `routes/index.tsx` with the full `<AppRoutes />` setup

```sh-session
$ rgen-cli make route dashboard -p

```

This will:

- Create `routes/Dashboard/index.tsx` (or `.jsx`)

- Register the `/dashboard` route

- Create `pages/dashboard/index.tsx` (or `.jsx`)

### ! Important

Make sure your app uses the generated router:

```tsx
import AppRoutes from  "@/routes"; // <- add this


createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <AppRoutes  /> // <- add this
    </StrictMode>
  );


```
