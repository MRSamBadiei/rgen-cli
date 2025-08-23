import {Command} from '@oclif/core'
import chalk from 'chalk'
import fs, {existsSync} from 'node:fs'
import path from 'node:path'

import Build from './build.js'

type templateType = 'hook' | 'index' | 'store' | undefined

export default class Store<T extends undefined> extends Build<T> {
  constructor(cmd: Command, name: string) {
    super(cmd, name, 'store')
  }

  async setup() {
    try {
      await this.init()

      const statePath = path.join(this.rootDir, 'state')

      const indexPath = path.join(this.rootDir, `index.${this.typescript ? 'ts' : 'js'}`)
      if (!existsSync(indexPath)) {
        fs.writeFileSync(indexPath, this.template('index')!)

        this.cmd.log(`${chalk.blue('[+]')} initialize store - ${chalk.blue(indexPath)}`)
        this.cmd.log(chalk.yellow('Next steps:'))
        this.cmd.log('1. Make sure your main entry file (e.g., main.tsx) uses store as the root component.')
        this.cmd.log(`Example:
    import { Provider } from "react-redux";
    import store from "@/store";

    createRoot(document.getElementById("root")!).render(
      <Provider store={store}>
        <App />
      </Provider>,
    );`)
      }

      const hookPath = path.join(statePath, `hook.ts`)
      if (this.typescript && !fs.existsSync(hookPath)) {
        fs.writeFileSync(hookPath, this.template('hook')!)
      }

      const storePath = path.join(statePath, this.name.toLowerCase(), `${this.uname}.${this.typescript ? 'ts' : 'js'}`)

      if (fs.existsSync(storePath)) {
        this.cmd.error(`${chalk.blue('[X]')} Already exists! - ${chalk.blue(storePath)}`)
      }

      fs.writeFileSync(storePath, this.template('store')!)

      this.cmd.log(`${chalk.blue('[+]')} Creating new store ${this.uname} - ${chalk.blue(storePath)}`)
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.cmd.error(error)
      }
    }
  }

  private template(type: templateType) {
    switch (type) {
      case 'hook': {
        return `import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'

export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector\n`
      }

      case 'index': {
        return `import { configureStore${this.typescript ? ', Reducer' : ''} } from '@reduxjs/toolkit'
${
  this.typescript
    ? `\ntype ReducerModule = {
  default: Reducer
}\n`
    : ''
}
const reducerModules = import.meta.glob${
          this.typescript ? '<ReducerModule>' : ''
        }('./state/**/*.{js,ts}', { eager: true })

const reducers${this.typescript ? ': Record<string, Reducer>' : ''} = {}

for (const path in reducerModules) {
  const mod = reducerModules[path]
  const name = path
    .split('/')
    .pop()
    ?.replace(/.(ts|js)$/, '')
  if (name && mod${this.typescript ? '?' : ''}.default) {
    reducers[name] = mod.default
  }
}

const store = configureStore({
  reducer: reducers
})

export default store

${
  this.typescript
    ? 'export type RootState = ReturnType<typeof store.getState>\nexport type AppDispatch = typeof store.dispatch\n'
    : ''
}`
      }

      case 'store': {
        return `import { createSlice${this.typescript ? ', type PayloadAction' : ''} } from '@reduxjs/toolkit'

const initialState = {
  value: ''
}

const slice = createSlice({
  name: '${this.uname}',
  initialState,
  reducers: {
    setValue: (state, action${this.typescript ? ': PayloadAction<string>' : ''}) => {
      state.value = action.payload
    },
    resetValue: (state) => {
      state.value = ''
    }
  }
})

export const { setValue, resetValue } = slice.actions
export default slice.reducer

/* How to use Redux store:

[Typescript]
import { useAppSelector, useAppDispatch } from '@/state/hooks'
import { setValue } from '@/state/${this.uname}'

  1. Read value from store
  const ${this.name} = useAppSelector((state) => state.${this.uname})

  2. Update value in store
  const dispatch = useAppDispatch()
  dispatch(setValue("new value"))

[Javascript]
import { useSelector, useDispatch } from 'react-redux'
import { setValue } from '@/state/${this.uname}'

  1. Read value from store
  const ${this.name} = useSelector((state) => state.${this.uname})

  2. Update value in store
  const dispatch = useDispatch()
  dispatch(setValue("new value"))

*/\n`
      }
    }
  }
}
