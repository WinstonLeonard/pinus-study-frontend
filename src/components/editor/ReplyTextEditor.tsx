import React, { useCallback, useMemo, useState, MouseEvent } from "react";
import isHotkey from "is-hotkey";
import {
  Editable,
  withReact,
  useSlate,
  Slate,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";
import { serialize } from "./serializer";

import styled, { createGlobalStyle } from "styled-components";
import { ReplyToolbarButton, Icon, ReplyToolbar } from "./index";
import { TextAlignFormat } from "../../slate";
import { API_URL, Colors } from "../../constants";

// STYLED COMPONENTS
const Input = styled.input`
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  padding: 10px 16px;
  background: ${Colors.light_grey_50};
  border: none;
  border-radius: 15px;
  width: calc(100% - 32px);
  ::placeholder {
    color: ${Colors.light_grey};
    font-style: italic;
  }
`;

const CodeBackground = styled.span`
  padding: 0px 5px;
  border-radius: 3px;
  background: ${Colors.white};
`;

const EditorBackground = styled.div`
  background: ${Colors.light_grey_50};
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 0.25em;
  margin-top: 1em;
  border-radius: 15px;
`;

const ThreadContainer = styled.div`
  margin: 0 auto;
  font-size: 1.3em;
  font-family: "Poppins", sans-serif;
`;

const UiButton = styled.button`
  border: none;
  border-radius: 50px;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  padding: 0em 2.5em;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 1.1em;
  color: white;
`;

const PostButton = styled(UiButton)`
  background: ${Colors.light_grey};
`;

const Buttons = styled.div`
  margin-top: 0.5em;
  display: flex;
  justify-content: space-between;
`;

const EmptyDiv = styled.div`
  padding: 2em 0;
`;

// LOCAL CONSTANTS

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const TEXT_ALIGN_TYPES: string[] = ["left", "center", "right", "justify"];

const TEXT_ALIGN_FORMAT_RECORD: Record<string, TextAlignFormat> = {
  start: "start",
  end: "end",
  left: "left",
  right: "right",
  center: "center",
  justify: "justify",
};

type ModulePostData = {
  title: string;
  content: string;
  userID: number;
  token: string;
};

// FUNCTIONS

/**
 * TextEditor component for the web forum, used for creating a new thread
 * on the modules page of the forum website. Supports rich text formatting.
 * @returns A React component that represents the Text Editor.
 */
const ReplyTextEditor = ({ id }: { id: number }) => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const [textData, setTextData] = useState({});

  const postData = (data: any) => {
    const stringified = serialize(data);
    fetch(API_URL + `/thread/` + id.toString(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorid: "",
        content: stringified,
        userId: 0,
        token: "",
        parentid: id,
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };

  return (
    <>
      <ThreadContainer>
        <Slate
          editor={editor}
          value={initialValue}
          onChange={(value) => {
            const isAstChange = editor.operations.some(
              (op) => "set_selection" !== op.type
            );
            if (isAstChange) {
              // Save the value to Local Storage.
              setTextData(value);
            }
          }}
        >
          <EditorBackground>
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Write your reply here"
              spellCheck
              autoFocus
              onKeyDown={(event) => {
                for (const hotkey in HOTKEYS) {
                  if (isHotkey(hotkey, event as any)) {
                    event.preventDefault();
                    const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
                    toggleMark(editor, mark);
                  }
                }
              }}
            />

            <EmptyDiv />
          </EditorBackground>
          <Buttons>
            <ReplyToolbar>
              <MarkButton format="bold" icon="format_bold" />
              <MarkButton format="italic" icon="format_italic" />
              <MarkButton format="underline" icon="format_underlined" />
              <MarkButton format="code" icon="code" />
              <BlockButton format="block-quote" icon="format_quote" />
              <BlockButton format="numbered-list" icon="format_list_numbered" />
              <BlockButton format="bulleted-list" icon="format_list_bulleted" />
            </ReplyToolbar>

            <PostButton
              onClick={() => {
                postData(textData);
              }}
            >
              Post
            </PostButton>
          </Buttons>
        </Slate>
      </ThreadContainer>
    </>
  );
};

/**
 * Toggles the active settings of the current / selected blcok.
 * @param editor A Slate Editor instance
 * @param format The format of the text alignment
 */
const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? "left" : TEXT_ALIGN_FORMAT_RECORD[format],
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

/**
 * Toggles the active settings of marks in the current or selected text
 * @param editor A Slate Editor instance
 * @param format The format of the text alignment
 */
const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

/**
 * Checks if the format alignment in the specified block is active.
 * @param editor A Slate Editor instance
 * @param format The format of the text alignment
 * @param blockType The type of the block
 * @returns a boolean value, true if the block is active, false otherwise
 */
const isBlockActive = (editor: Editor, format: string, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType as keyof typeof n] === format,
    })
  );

  return !!match;
};

/**
 * Checks whether the mark in the current text is active.
 * @param editor A Slate Editor instance
 * @param format The format of the text alignment
 * @returns True if the specified mark is active, false otherwise
 */
const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format as keyof typeof marks] === true : false;
};

/**
 * Renders an Element instance in Slate with specified attributes and
 * children nodes or text.
 * @param props An object containing element, attributes and children
 * @returns A React component representing an Element instance.
 */
const Element = (props: RenderElementProps) => {
  const element = props.element;
  const attributes = props.attributes;
  const children = props.children;

  console.log(props);

  let align: TextAlignFormat = "left";

  if (element.align) {
    align = element.align;
  }

  let style: React.CSSProperties = { textAlign: align };

  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

/**
 * Renders a Leaf, the lowest node instance in a slate editor.
 * @param props The properties for the Leaf, contains node, attributes, children
 * @returns a Leaf component
 */
const Leaf = (props: RenderLeafProps) => {
  const leaf = props.leaf;
  const attributes = props.attributes;
  let children = props.children;
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = (
      <CodeBackground>
        <code>{children}</code>
      </CodeBackground>
    );
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

/**
 * Button for Block Actions
 */
const BlockButton = ({ format, icon }: { format: string; icon: string }) => {
  const editor = useSlate();
  return (
    <ReplyToolbarButton
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
      )}
      onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </ReplyToolbarButton>
  );
};

/**
 * Button for Mark actions
 */
const MarkButton = ({ format, icon }: { format: string; icon: string }) => {
  const editor = useSlate();
  return (
    <ReplyToolbarButton
      active={isMarkActive(editor, format)}
      onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </ReplyToolbarButton>
  );
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default ReplyTextEditor;
