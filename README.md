rgen-cli

=================
A developer CLI for initializing React projects, managing utilities, and scaffolding components, hooks, pages, layouts, routes, and contexts quickly.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

[![Version](https://img.shields.io/npm/v/rgen-cli.svg)](https://npmjs.org/package/rgen-cli)

[![Downloads/week](https://img.shields.io/npm/dw/rgen-cli.svg)](https://npmjs.org/package/rgFen-cli)

<!-- toc -->
* [Installation](#installation)
* [Getting Started](#getting-started)
* [Commands](#commands)
<!-- tocstop -->

# Installation

<!-- usage -->
```sh-session
$ npm install -g rgen-cli
$ rgen-cli COMMAND
running command...
$ rgen-cli (--version)
rgen-cli/0.0.2 linux-x64 node-v24.4.1
$ rgen-cli --help [COMMAND]
USAGE
  $ rgen-cli COMMAND
...
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
* [`rgen-cli help [COMMAND]`](#rgen-cli-help-command)
* [`rgen-cli init`](#rgen-cli-init)
* [`rgen-cli make`](#rgen-cli-make)
* [`rgen-cli make component NAME`](#rgen-cli-make-component-name)
* [`rgen-cli make context NAME`](#rgen-cli-make-context-name)
* [`rgen-cli make hook NAME`](#rgen-cli-make-hook-name)
* [`rgen-cli make layout NAME`](#rgen-cli-make-layout-name)
* [`rgen-cli make page NAME`](#rgen-cli-make-page-name)
* [`rgen-cli make route NAME`](#rgen-cli-make-route-name)
* [`rgen-cli plugins`](#rgen-cli-plugins)
* [`rgen-cli plugins add PLUGIN`](#rgen-cli-plugins-add-plugin)
* [`rgen-cli plugins:inspect PLUGIN...`](#rgen-cli-pluginsinspect-plugin)
* [`rgen-cli plugins install PLUGIN`](#rgen-cli-plugins-install-plugin)
* [`rgen-cli plugins link PATH`](#rgen-cli-plugins-link-path)
* [`rgen-cli plugins remove [PLUGIN]`](#rgen-cli-plugins-remove-plugin)
* [`rgen-cli plugins reset`](#rgen-cli-plugins-reset)
* [`rgen-cli plugins uninstall [PLUGIN]`](#rgen-cli-plugins-uninstall-plugin)
* [`rgen-cli plugins unlink [PLUGIN]`](#rgen-cli-plugins-unlink-plugin)
* [`rgen-cli plugins update`](#rgen-cli-plugins-update)

## `rgen-cli help [COMMAND]`

Display help for rgen-cli.

```
USAGE
  $ rgen-cli help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for rgen-cli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.32/src/commands/help.ts)_

## `rgen-cli init`

describe the command here

```
USAGE
  $ rgen-cli init

DESCRIPTION
  describe the command here

EXAMPLES
  $ rgen-cli init
```

_See code: [src/commands/init.ts](https://github.com/mrsambadiei/rgen-cli/blob/v0.0.2/src/commands/init.ts)_

## `rgen-cli make`

```
USAGE
  $ rgen-cli make
```

_See code: [src/commands/make.ts](https://github.com/mrsambadiei/rgen-cli/blob/v0.0.2/src/commands/make.ts)_

## `rgen-cli make component NAME`

Generate a React component

```
USAGE
  $ rgen-cli make component NAME

ARGUMENTS
  NAME  name of component

DESCRIPTION
  Generate a React component
```

_See code: [src/commands/make/component.ts](https://github.com/mrsambadiei/rgen-cli/blob/v0.0.2/src/commands/make/component.ts)_

## `rgen-cli make context NAME`

Generate a React context

```
USAGE
  $ rgen-cli make context NAME

ARGUMENTS
  NAME  name of context

DESCRIPTION
  Generate a React context
```

_See code: [src/commands/make/context.ts](https://github.com/mrsambadiei/rgen-cli/blob/v0.0.2/src/commands/make/context.ts)_

## `rgen-cli make hook NAME`

Generate a React hook

```
USAGE
  $ rgen-cli make hook NAME

ARGUMENTS
  NAME  name of hook

DESCRIPTION
  Generate a React hook
```

_See code: [src/commands/make/hook.ts](https://github.com/mrsambadiei/rgen-cli/blob/v0.0.2/src/commands/make/hook.ts)_

## `rgen-cli make layout NAME`

Generate a React layout

```
USAGE
  $ rgen-cli make layout NAME

ARGUMENTS
  NAME  name of layout

DESCRIPTION
  Generate a React layout
```

_See code: [src/commands/make/layout.ts](https://github.com/mrsambadiei/rgen-cli/blob/v0.0.2/src/commands/make/layout.ts)_

## `rgen-cli make page NAME`

Generate a React page

```
USAGE
  $ rgen-cli make page NAME

ARGUMENTS
  NAME  name of page

DESCRIPTION
  Generate a React page
```

_See code: [src/commands/make/page.ts](https://github.com/mrsambadiei/rgen-cli/blob/v0.0.2/src/commands/make/page.ts)_

## `rgen-cli make route NAME`

Generate a React route - react-router required

```
USAGE
  $ rgen-cli make route NAME

ARGUMENTS
  NAME  name of route

DESCRIPTION
  Generate a React route - react-router required
```

_See code: [src/commands/make/route.ts](https://github.com/mrsambadiei/rgen-cli/blob/v0.0.2/src/commands/make/route.ts)_

## `rgen-cli plugins`

List installed plugins.

```
USAGE
  $ rgen-cli plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ rgen-cli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.46/src/commands/plugins/index.ts)_

## `rgen-cli plugins add PLUGIN`

Installs a plugin into rgen-cli.

```
USAGE
  $ rgen-cli plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into rgen-cli.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the RGEN_CLI_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the RGEN_CLI_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ rgen-cli plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ rgen-cli plugins add myplugin

  Install a plugin from a github url.

    $ rgen-cli plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ rgen-cli plugins add someuser/someplugin
```

## `rgen-cli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ rgen-cli plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ rgen-cli plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.46/src/commands/plugins/inspect.ts)_

## `rgen-cli plugins install PLUGIN`

Installs a plugin into rgen-cli.

```
USAGE
  $ rgen-cli plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into rgen-cli.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the RGEN_CLI_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the RGEN_CLI_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ rgen-cli plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ rgen-cli plugins install myplugin

  Install a plugin from a github url.

    $ rgen-cli plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ rgen-cli plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.46/src/commands/plugins/install.ts)_

## `rgen-cli plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ rgen-cli plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ rgen-cli plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.46/src/commands/plugins/link.ts)_

## `rgen-cli plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ rgen-cli plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ rgen-cli plugins unlink
  $ rgen-cli plugins remove

EXAMPLES
  $ rgen-cli plugins remove myplugin
```

## `rgen-cli plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ rgen-cli plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.46/src/commands/plugins/reset.ts)_

## `rgen-cli plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ rgen-cli plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ rgen-cli plugins unlink
  $ rgen-cli plugins remove

EXAMPLES
  $ rgen-cli plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.46/src/commands/plugins/uninstall.ts)_

## `rgen-cli plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ rgen-cli plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ rgen-cli plugins unlink
  $ rgen-cli plugins remove

EXAMPLES
  $ rgen-cli plugins unlink myplugin
```

## `rgen-cli plugins update`

Update installed plugins.

```
USAGE
  $ rgen-cli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.46/src/commands/plugins/update.ts)_
<!-- commandsstop -->

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
