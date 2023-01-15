import escapeHtml from "escape-html";
import { Text } from "slate";

export const serialize = (node: any) => {
    if (Text.isText(node[0])) {
        return node.map((n: any) => serializeText(n)).join("") + `<br>`;
    }
    console.log(node);
    const children = node.map((n: any) => serialize(n.children)).join("");
    switch (node.type) {
        case "quote":
            console.log("quote" + children);
            return `<blockquote><p>${children}</p></blockquote>`;
        case "paragraph":
            console.log("paragraph" + children);
            return `<p>${children}</p>`;
        case "link":
            console.log("link" + children);
            return `<a href="${escapeHtml(node.url)}">${children}</a>`;
        default:
            console.log(children);
            return children;
    }
};

const serializeText = (node: any) => {
    console.log(node);
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
