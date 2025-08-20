import path from 'node:path'
import fs from 'node:fs'
import Build from './build.js'
import {Command} from '@oclif/core'
import chalk from 'chalk'

export default class Form extends Build {
  constructor(cmd: Command, name: string, flags: unknown = {}) {
    super(cmd, name, 'forms', flags)
  }

  async setup() {
    try {
      await this.init()

      // src/pages/auth/forms/x.schema.ts or js
      const schemaPath = path.join(this.rootDir, this.name, `${this.name}.schema.${this.typescript ? 'ts' : 'js'}`)
      const schemaTemplate = `import { z } from 'zod'

export const ${this.name}Schema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
  
${this.typescript ? `export type ${this.uname}FormData = z.infer<typeof ${this.name}Schema>` : ''}`

      // src/pages/auth/forms/useXForm.ts or js
      const useFormPath = path.join(this.rootDir, this.name, `use${this.uname}Form.${this.typescript ? 'ts' : 'js'}`)
      const useFormTemplate = `import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ${this.name}Schema${this.typescript ? `, type ${this.uname}FormData` : ''} } from "./${this.name}.schema"

export function use${this.uname}Form() {
  return useForm${this.typescript ? `<${this.uname}FormData>` : ''}({
    resolver: zodResolver(${this.name}Schema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
}`

      //  src/pages/auth/forms/XForm.tsx or jsx
      const formPath = path.join(this.rootDir, this.name, `${this.uname}Form.${this.typescript ? 'tsx' : 'jsx'}`)
      const formTemplate = `import { cn } from "@/libs/utils"
import { use${this.uname}Form } from "./use${this.uname}Form"

export default function ${this.uname}Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = use${this.uname}Form()

  const onSubmit = (data${this.typescript ? ': any' : ''}) => {
    console.log("Form submitted:", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-6 p-6 bg-white rounded-xl shadow-lg")}>
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 font-medium text-gray-700">Email</label>
        <input
          id="email"
          {...register("email")}
          type="email"
          placeholder="Enter your email"
          className={cn(
            "border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
            errors.email && "border-red-500"
          )}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="mb-1 font-medium text-gray-700">Password</label>
        <input
          id="password"
          {...register("password")}
          type="password"
          placeholder="Enter your password"
          className={cn(
            "border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
            errors.password && "border-red-500"
          )}
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-4 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all"
      >
        Login
      </button>
    </form>
  )
}`

      if (fs.existsSync(formPath)) {
        this.cmd.error(`${chalk.blue('[X]')} Already exists! - ${chalk.blue(formPath)}`)
      }

      fs.writeFileSync(schemaPath, schemaTemplate)
      this.cmd.log(`${chalk.blue('[+]')} Creating new ${this.name}Schema - ${chalk.blue(schemaPath)}`)
      fs.writeFileSync(useFormPath, useFormTemplate)
      this.cmd.log(`${chalk.blue('[+]')} Creating new use${this.uname}Form - ${chalk.blue(useFormPath)}`)
      fs.writeFileSync(formPath, formTemplate)
      this.cmd.log(`${chalk.blue('[+]')} Creating new ${this.uname}Form - ${chalk.blue(formPath)}`)
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.cmd.error(err)
      }
    }
  }
}
