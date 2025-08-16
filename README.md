rgen-cli

=================
A developer CLI for initializing React projects, managing utilities, and scaffolding components, hooks, pages, layouts, routes, and contexts quickly.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

[![Version](https://img.shields.io/npm/v/rgen-cli.svg)](https://npmjs.org/package/rgen-cli)

[![Downloads/week](https://img.shields.io/npm/dw/rgen-cli.svg)](https://npmjs.org/package/rgFen-cli)

<!-- toc -->

- [Installation](#Installation)

- [Commands](#commands)

<!-- tocstop -->

# Installation

<!-- usage -->

```sh-session

$ npm install -g rgen-cli

```

<!-- usagestop -->

# Getting Started

First, make sure you are inside a React project — either JavaScript or TypeScript.  
You can quickly create one using Vite: [Scaffolding your first Vite project](https://vite.dev/guide/#scaffolding-your-first-vite-project).

If you are using **React with JavaScript**, add the following alias configuration to your `vite.config.js` to simplify imports:

```javascript
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path' // <--- add this

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // <--- add this
    },
  },
})
```

> ⚠️ Make sure to add the **entire `resolve` section**, not just the alias line. This ensures proper path resolution in your project.

This allows you to import modules from your `src` folder using `@/` instead of relative paths.

# Commands

<!-- commands -->

- [`rgen-cli init`](#rgen-cli-hello-person)
- [`rgen-cli make`](#rgen-cli-hello-person)

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

```bash
rgen-cli make

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

---

### Example

```bash
rgen-cli make

```

**Prompt:**

```
Select what you want to create: component
Enter the name for the component: Button

```

This will create a `Button` component in the correct folder and structure.

---

### Notes

- Names cannot be empty.
- All files follow the project's folder structure and conventions.
- After creation, you can import and use your new element directly in your project.
