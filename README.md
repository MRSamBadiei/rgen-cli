rgen-cli
=================

A new CLI generated with oclif


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/rgen-cli.svg)](https://npmjs.org/package/rgen-cli)
[![Downloads/week](https://img.shields.io/npm/dw/rgen-cli.svg)](https://npmjs.org/package/rgen-cli)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g rgen-cli
$ rgen-cli COMMAND
running command...
$ rgen-cli (--version)
rgen-cli/0.0.0 linux-x64 node-v24.4.1
$ rgen-cli --help [COMMAND]
USAGE
  $ rgen-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`rgen-cli hello PERSON`](#rgen-cli-hello-person)
* [`rgen-cli hello world`](#rgen-cli-hello-world)
* [`rgen-cli help [COMMAND]`](#rgen-cli-help-command)
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

## `rgen-cli hello PERSON`

Say hello

```
USAGE
  $ rgen-cli hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ rgen-cli hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/mrsambadiei/rgen-cli/blob/v0.0.0/src/commands/hello/index.ts)_

## `rgen-cli hello world`

Say hello world

```
USAGE
  $ rgen-cli hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ rgen-cli hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/mrsambadiei/rgen-cli/blob/v0.0.0/src/commands/hello/world.ts)_

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
