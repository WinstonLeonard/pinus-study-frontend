import escapeHtml from "escape-html";
import { Text } from "slate";

/**
 * Serializes a node produced by the text editor (using Slate.JS API) into a HTML string.
 * 
 * @param node A node produced by the text editor (typically from TextEditor.tsx or ReplyTextEditor.tsx)
 * @returns a HTML string
 */
export const serialize = (node: any) => {
  if (node === undefined) {
    return undefined;
  }
  // console.log(node);
  if (Text.isText(node[0])) {
    if (node.type === "list-item") {
      return (
        node.map((n: any) => `<li>${serializeText(n)}</li>`).join("") + `<br>`
      );
    }
    return node.map((n: any) => serializeText(n)).join("") + `<br>`;
  }

  const children: string = (
    Array.isArray(node)
      ? node.map((n: any) => serialize(n))
      : [serialize(node.children)]
  ).join("");

  console.log(node.type);

  console.log(children);

  switch (node.type) {
    case "block-quote":
      console.log("quote" + children);
      return `<blockquote><p>${children}</p></blockquote>`;
    case "paragraph":
      console.log("paragraph" + children);
      return `<p>${children}</p>`;
    case "link":
      console.log("link" + children);
      return `<a href="${escapeHtml(node.url)}">${children}</a>`;
    case "heading-one":
      return `<h1>${children}</h1>`;
    case "heading-two":
      return `<h2>${children}</h2>`;
    case "numbered-list":
      return `<ol>${children}</ol>`;
    case "bulleted-list":
      return `<ul>${children}</ul>`;
    case "list-item":
      return `<li>${children}</li>`;
    default:
      return children;
  }
};

const serializeText = (node: any) => {
  let string = escapeHtml(node.text);
  if (node.bold) {
    string = `<strong>${string}</strong>`;
  }
  if (node.italic) {
    string = `<em>${string}</em>`;
  }
  if (node.underline) {
    string = `<u>${string}</u>`;
  }
  if (node.code) {
    string = `<code>${string}</code>`;
  }
  return string;
};

/**
 * Parses a HTML string into a JSX component.
 * 
 * @param text A HTML string (basically HTML but in string format)
 * @returns a JSX component that represents the rendered HTML string
 */
export const deserialize = (text: string) => {
  return <div dangerouslySetInnerHTML={{ __html: text }} className="deserialised-content" />;
};
