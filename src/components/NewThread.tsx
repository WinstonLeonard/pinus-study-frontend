import { useState, useCallback, KeyboardEvent } from "react";
import { createEditor, Descendant, Editor, Transforms, Text } from "slate";
import {
    Slate,
    Editable,
    withReact,
    RenderElementProps,
    RenderLeafProps,
} from "slate-react";

// import { CustomElement, FormattedText } from "../slate";

// import { Editor } from "../slate"

// import styled from "styled-components";
// import { API_URL, Colors } from "../constants";
// import { Thread, ThreadInitialState } from "../features/threads/threadSlice";

const initialValue: Descendant[] = [
    {
        type: "paragraph",
        children: [{ text: "Write your post." }],
    },
];

const CustomEditor = {
    isBoldMarkActive(editor: Editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => Text.isText(n) && n.bold === true,
            universal: true,
        });
        return !!match;
    },

    isCodeBlockActive(editor: Editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => Editor.isBlock(editor, n) && n.type === "code",
        });
        return !!match;
    },

    toggleBoldMark(editor: Editor) {
        const isActive = CustomEditor.isBoldMarkActive(editor);
        Transforms.setNodes(
            editor,
            { bold: isActive ? undefined : true },
            { match: (n) => Text.isText(n), split: true }
        );
    },

    toggleCodeBlock(editor: Editor) {
        const isActive = CustomEditor.isCodeBlockActive(editor);
        Transforms.setNodes(
            editor,
            { type: isActive ? undefined : "code" },
            { match: (n) => Editor.isBlock(editor, n) }
        );
    },
};

const NewThread = () => {
    // Create a Slate editor object that won't change across renders.
    // const [initialValue, setInitialValue] = useState<Descendant[]>([{ type: 'paragraph', children: [{ text: '' }] }])

    const renderElement = useCallback((props: RenderElementProps) => {
        switch (props.element.type) {
            case "code":
                return <CodeElement {...props} />;
            default:
                return <DefaultElement {...props} />;
        }
    }, []);

    const renderLeaf = useCallback((props: RenderLeafProps) => {
        return <Leaf {...props} />;
    }, []);

    const [editor] = useState(() => withReact(createEditor()));

    const CodeElement = (props: RenderElementProps) => {
        return (
            <pre {...props.attributes}>
                <code>{props.children}</code>
            </pre>
        );
    };

    const DefaultElement = (props: RenderElementProps) => {
        return <p {...props.attributes}>{props.children}</p>;
    };

    const keyHandler = (event: KeyboardEvent<HTMLImageElement>) => {
        if (!event.ctrlKey) {
            return;
        }

        switch (event.key) {
            case "`": {
                event.preventDefault();
                // Determine whether any of the currently selected blocks are code blocks.
                const [match] = Editor.nodes(editor, {
                    match: (n) =>
                        Editor.isBlock(editor, n) && n.type === "code",
                });
                // Toggle the block type depending on whether there's already a match.
                Transforms.setNodes(
                    editor,
                    { type: match ? "paragraph" : "code" },
                    { match: (n) => Editor.isBlock(editor, n) }
                );
                break;
            }
            case "b": {
                event.preventDefault();
                const [match] = Editor.nodes(editor, {
                    match: (n) => Text.isText(n) && n.bold === true,
                });
                if (match) {
                    Transforms.setNodes(
                        editor,
                        { bold: undefined },
                        { match: (n) => Text.isText(n), split: true }
                    );
                } else {
                    Transforms.setNodes(
                        editor,
                        { bold: true },
                        { match: (n) => Text.isText(n), split: true }
                    );
                }
                break;
            }
        }
    };

    return (
        <Slate editor={editor} value={initialValue}>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={keyHandler}
            />
        </Slate>
    );
};

const Leaf = (props: RenderLeafProps) => {
    return (
        <span
            {...props.attributes}
            style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
        >
            {props.children}
        </span>
    );
};

export default NewThread;
