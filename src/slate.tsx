import { BaseEditor } from 'slate'
import { HistoryEditor } from 'slate-history'
import { ReactEditor } from 'slate-react'

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

export type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}

export type HeadingElement = {
  type: 'heading'
  level: number
  children: CustomText[]
}

export type CodeElement = {
  type: 'code'
  children: CustomText[]
}

export type CustomElement = ParagraphElement | HeadingElement | CodeElement

export type FormattedText = { text: string; bold?: true }

export type CustomText = FormattedText

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}