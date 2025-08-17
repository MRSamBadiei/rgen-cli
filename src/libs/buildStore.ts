import path from 'node:path'
import fs, {existsSync} from 'node:fs'
import Build from './build.js'
import {Command} from '@oclif/core'
import chalk from 'chalk'

export default class Store extends Build {
  constructor(cmd: Command, name: string) {
    super(cmd, name, 'store')
  }

  async setup() {
    try {
      await this.init()

      const statePath = path.join(this.rootDir, 'state')

      const indexPath = path.join(this.rootDir, `index.${this.typescript ? 'tsx' : 'jsx'}`)
      if (!existsSync(indexPath)) {
        const indexTemplate = `import { configureStore } from "@reduxjs/toolkit"

const reducerModules = import.meta.glob("./state/**/*.{js,ts}", { eager: true })

const reducers${this.typescript ? ': Record<string, any>' : ''} = {}
for (const path in reducerModules) {
  const mod = reducerModules[path]${this.typescript ? ' as any' : ''}
  const name = path.split("/").pop()?.replace(/\.(ts|js)$/, "")
  if (mod.default) reducers[name${this.typescript ? '!' : ''}] = mod.default
}

const store = configureStore({
  reducer: reducers
})

export default store

${
  this.typescript
    ? 'export type RootState = ReturnType<typeof store.getState>\nexport type AppDispatch = typeof store.dispatch'
    : ''
}`

        fs.writeFileSync(indexPath, indexTemplate)

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
        const hookTemplate = `import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector`

        fs.writeFileSync(hookPath, hookTemplate)
      }

      const storePath = path.join(statePath, this.name.toLowerCase(), `${this.uname}${this.typescript ? '.ts' : '.js'}`)
      const storeTemplate = `import { createSlice${
        this.typescript ? ', type PayloadAction' : ''
      } } from "@reduxjs/toolkit"

const initialState = {
  value: "",
}

const slice = createSlice({
  name: "${this.uname}",
  initialState,
  reducers: {
    setValue: (state, action${this.typescript ? ': PayloadAction<string>' : ''}) => {
      state.value = action.payload
    },
    resetValue: (state) => {
      state.value = ""
    },
  },
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

*/`

      fs.writeFileSync(storePath, storeTemplate)

      this.cmd.log(`${chalk.blue('[+]')} Creating new store ${this.uname} - ${chalk.blue(storePath)}`)
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.cmd.error(`${chalk.red(err)}`)
      }
    }
  }
}
