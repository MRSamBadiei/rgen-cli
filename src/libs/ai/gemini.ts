import {GoogleGenAI} from '@google/genai'
import chalk from 'chalk'

import {AIModels, BuildType} from '../types/type.js'

export async function generateComponent(
  template: string,
  type: BuildType,
  desc: string,
  apiKey: string,
  typescript: boolean,
  model: AIModels = 'gemini-2.5-flash',
): Promise<string> {
  const systemInstructionTSX = `You are an expert React developer.
Only generate complete React ${type} in TypeScript (TSX).
- Always include proper type annotations and interfaces.
- Follow the template structure provided.${
    type === 'hooks'
      ? ''
      : `\n- Use Tailwind CSS classes for styling.\n- Always use cn() to merge class names, and include "import { cn } from '@/libs/utils'".`
  }
- Do not include markdown, explanations, or comments outside of JSX/TSX.
- Output should be ready-to-use code.`

  const systemInstructionJSX = `You are an expert React developer.
Only generate complete React ${type} in plain JSX.
- Do not include TypeScript types, interfaces, or type annotations.
- Follow the template structure provided.${
    type === 'hooks'
      ? ''
      : `\n- Use Tailwind CSS classes for styling.\n- Always use cn() to merge class names, and include "import { cn } from '@/libs/utils'".`
  }
- Do not include markdown, explanations, or comments outside of JSX.
- Output should be ready-to-use code.`

  const descTSX = `Generate a complete React component in **TypeScript (TSX)**:
- Replace content with TSX that matches the description.
- Keep all TypeScript types and imports intact.
- Only return TSX code, no markdown, no extra explanation.`

  const descJSX = `Generate a complete React component in **plain JSX**:
- Replace content with JSX that matches the description.
- Do not include TypeScript types or interfaces.
- Only return JSX code, no markdown, no extra explanation.`

  const ai = new GoogleGenAI({apiKey})

  const contents = `
Here is my default React component template:

${template}

The user wants a React component with the following description: "${desc}".

${typescript ? descTSX : descJSX}
`

  try {
    console.log(chalk.green(`Generating ${type} with AI...`))
    const response = await ai.models.generateContent({
      config: {
        systemInstruction: typescript ? systemInstructionTSX : systemInstructionJSX,
      },
      contents,
      model,
    })

    let result = response?.text?.trim() ?? ''

    result = result
      .replace(/^```(jsx|tsx)?\s*/, '')
      .replace(/```$/, '')
      .trim()

    if (result.length === 0) {
      console.warn('AI returned empty output, using default template.')
      return template
    }

    return result
  } catch (error: unknown) {
    console.error('AI generation failed:', error)
    return template
  }
}
