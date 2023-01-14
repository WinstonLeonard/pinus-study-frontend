import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type ParagraphElement = {
    type: "paragraph";
    align?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";
    children: CustomText[];
};

export type HeadingElement = {
    type: "heading";
    level: number;
    align?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";
    children: CustomText[];
};

export type CodeElement = {
    type: "code";
    align?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";
    children: CustomText[];
};

export type AnyElement = {
    type: string;
    align?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";
    children: CustomText[];
};

export type CustomElement =
    | ParagraphElement
    | HeadingElement
    | CodeElement
    | AnyElement;

export type FormattedText = {
    text: string;
    bold?: true | undefined;
    italic?: true | undefined;
    code?: true | undefined;
    underline?: true | undefined;
};

export type CustomText = FormattedText;

export type TextAlignFormat = "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";

declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}
