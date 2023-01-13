import { useState } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";

// import styled from "styled-components";
// import { API_URL, Colors } from "../constants";
// import { Thread, ThreadInitialState } from "../features/threads/threadSlice";

const initialValue: Descendant[] = [
    {
        type: "paragraph",
        children: [{ text: "Write your post." }],
    },
]

const NewThread = () => {
    // Create a Slate editor object that won't change across renders.
    // const [initialValue, setInitialValue] = useState<Descendant[]>([{ type: 'paragraph', children: [{ text: '' }] }])
    const [editor] = useState(() => withReact(createEditor()));
    return (
        <Slate editor={editor} value={initialValue}>
            <Editable />
        </Slate>
    );
};

export default NewThread;
