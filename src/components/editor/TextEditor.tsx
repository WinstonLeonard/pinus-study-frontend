import React, {
  useCallback,
  useMemo,
  useState,
  MouseEvent,
  useEffect,
} from "react";
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
import { Button, Icon, Toolbar } from "./index";
import { TextAlignFormat } from "../../slate";
import { API_URL, Colors, ScreenSizes } from "../../constants";
import {
  BlurredBackground,
  CloseIconDiv,
  ErrorMessage,
} from "../authentication_modal/ModalComponents";
import CloseIcon from "@mui/icons-material/Close";
import { selectId, selectToken } from "../../redux/features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { WhiteLoader, SmallWhiteLoader } from "../Loader";
// STYLED COMPONENTS

const GlobalStyle = createGlobalStyle`
    body {
        font-size: 16px;
        font-family: 'Poppins', sans-serif;
    }
`;

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
  width: 80%;
  margin: 0 auto;
  background: ${Colors.white_1};
  border: 2px solid ${Colors.dark_grey};
  padding: 1em;
  border-radius: 20px;
  box-shadow: 7px 7px 0 ${Colors.green_2},
          7px 7px 0 2px ${Colors.dark_grey};
`;

const UiButton = styled.button`
  border: none;
  border-radius: 50px;
  padding: 0.25em 1.5em;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 1.1em;
  color: white;
  white-space: nowrap;

`;

const PostButton = styled(UiButton)`
  background: ${Colors.blue_3};
  border: 2px solid ${Colors.dark_grey};
  color: ${Colors.dark_grey};
  width: 10em;
  cursor: pointer;
  box-shadow: 0px 5px 0 -2.5px ${Colors.blue_2},
    0px 5px 0 -0.5px ${Colors.dark_grey};

  :hover {
    background-color: ${Colors.blue_accent};
    color: ${Colors.black};
    position: relative;
    top: 3px;
    // left: 3px;
    box-shadow: 0px 2px 0 -2.5px ${Colors.blue_2},
        0px 2px 0 -0.5px ${Colors.dark_grey};
  }

  ${ScreenSizes.extra_small} {
    border: 1px solid;
    box-shadow: 3px 3px 0 ${Colors.blue_2},
        3px 3px 0 1px ${Colors.dark_grey};
      
    :hover {
      top: 2px;
      left: 2px;
      box-shadow: 1px 1px 0 ${Colors.blue_2},
        1px 1px 0 1px ${Colors.dark_grey};
    }
  }
`;

const TagButton = styled(UiButton)`
  background: ${Colors.yellow};
`;

const Buttons = styled.div`
  margin-top: 1.5em;
  display: flex;
  justify-content: space-between;
`;

const TagButtons = styled.div`
  gap: 0.5em;
  display: flex;
`;

const AddTagButton = styled(UiButton)`
  background: ${Colors.white};
  color: ${Colors.dark_grey};
  padding: 0 0.25em;
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

interface Params {
  [key: string]: string | undefined;
  mod: string;
}

/**
 * TextEditor component for the web forum, used for creating a new thread
 * on the modules page of the forum website. Supports rich text formatting.
 * @returns A React component that represents the Text Editor.
 */
const TextEditor = ({ closeTextEditor }: { closeTextEditor: () => void }) => {
  const [postTitle, setPostTitle] = useState({ text: "" });
  const [textData, setTextData] = useState({});
  const [showError, setShowError] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector(selectId);
  const token = useSelector(selectToken);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const { mod } = useParams<Params>(); // Retrieve Module ID through dynamic routing
  const refresh = () => window.location.reload();

  const isInputInvalid = (data: any, postTitle: any): boolean => {
    //Post can't be empty
    if (data[0] === undefined || data[0].children[0].text === "") {
      return true;
    }

    //Title can't be empty, do nothing if empty
    if (postTitle.text === "") {
      return true;
    }

    return false;
  };

  const postThread = (data: any) => {
    //if Invalid Input Do Nothing
    if (isInputInvalid(data, postTitle)) {
      return;
    }

    const stringified = serialize(data);
    console.log(stringified);
    setIsLoading(true)
    fetch(API_URL + `/module/` + mod, {
      method: "POST",
      headers: {
        // Accept: "application/json",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        authorid: userId,
        content: stringified,
        title: postTitle.text,
        tags: [],
        moduleid: mod,
        token: token,
      }),
    })
      .then((response) => response.json())
      .then(closeTextEditor)
      .then(refresh)
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setPostTitle({ text: e.currentTarget.value });
  };

  useEffect(() => {
    setShowError(isInputInvalid(textData, postTitle));
  }, [postTitle, textData]);

  return (
    <>
      <GlobalStyle />
      <BlurredBackground>
        <ThreadContainer>
          <CloseIconDiv onClick={closeTextEditor}>
            <CloseIcon />
          </CloseIconDiv>
          <Input
            type="text"
            value={postTitle.text}
            onChange={onChange}
            placeholder="Enter question title here ..."
            disabled={isLoading}
          />
          <EditorBackground>
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
              <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Description"
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
                readOnly={isLoading}
              />

              <Toolbar>
                <MarkButton format="bold" icon="format_bold" />
                <MarkButton format="italic" icon="format_italic" />
                <MarkButton format="underline" icon="format_underlined" />
                <MarkButton format="code" icon="code" />
                <BlockButton format="heading-one" icon="looks_one" />
                <BlockButton format="heading-two" icon="looks_two" />
                <BlockButton format="block-quote" icon="format_quote" />
                <BlockButton
                  format="numbered-list"
                  icon="format_list_numbered"
                />
                <BlockButton
                  format="bulleted-list"
                  icon="format_list_bulleted"
                />
                <BlockButton format="left" icon="format_align_left" />
                <BlockButton format="center" icon="format_align_center" />
                <BlockButton format="right" icon="format_align_right" />
                <BlockButton format="justify" icon="format_align_justify" />
              </Toolbar>
            </Slate>
          </EditorBackground>
          <Buttons>
            {showError && (
              <ErrorMessage>Title and description cannot be empty.</ErrorMessage>
            )}
            <div>{/* Dummy Div */}</div>
            <PostButton onClick={() => postThread(textData)} disabled={isLoading}>
              {
                isLoading
                ? <SmallWhiteLoader />
                : "Post Question"
              }
            </PostButton>
          </Buttons>
        </ThreadContainer>
      </BlurredBackground>
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

  // console.log(props);

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
    <Button
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
    </Button>
  );
};

/**
 * Button for Mark actions
 */
const MarkButton = ({ format, icon }: { format: string; icon: string }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default TextEditor;
