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


// const deserialize = (el, markAttributes = {}) => {
//   if (el.nodeType === Node.TEXT_NODE) {
//     return jsx('text', markAttributes, el.textContent)
//   } else if (el.nodeType !== Node.ELEMENT_NODE) {
//     return null
//   }

//   const nodeAttributes = { ...markAttributes }

//   // define attributes for text nodes
//   switch (el.nodeName) {
//     case 'strong':
//       nodeAttributes.bold = true
//   }

//   const children = Array.from(el.childNodes)
//     .map(node => deserialize(node, nodeAttributes))
//     .flat()

//   if (children.length === 0) {
//     children.push(jsx('text', nodeAttributes, ''))
//   }

//   switch (el.nodeName) {
//     case 'BODY':
//       return jsx('fragment', {}, children)
//     case 'BR':
//       return '\n'
//     case 'BLOCKQUOTE':
//       return jsx('element', { type: 'quote' }, children)
//     case 'P':
//       return jsx('element', { type: 'paragraph' }, children)
//     case 'A':
//       return jsx(
//         'element',
//         { type: 'link', url: el.getAttribute('href') },
//         children
//       )
//     default:
//       return children
//   }
// }