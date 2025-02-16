import { Editor, editorViewOptionsCtx, editorViewCtx, marksCtx, parserCtx, serializerCtx } from '@milkdown/core';
import { commonmark } from '../src';
import './style.css';

const markdown = `
# Milkdown Test

## Blockquote

> Milkdown is an editor.

## Marks Paragraph

Hello, ***milkdown* nice \`to\` meet *you***!  
There should be a line break before this.

---

## Image and Link

**Of course you can add image! ![cat](https://th.bing.com/th/id/OIP.EiYMXYhAnpsXnVmwJAq1jAHaEo?pid=ImgDet&rs=1 "kitty")**

Your *[link is here](https://bing.com "bing")*, have a look.

## Lists

* list item 1
    1. is this the real life
    2. is this just fantasy
* list item 2
    * sub list item 1

        some explain

    * sub list item 2
* list item 3

## Code

\`\`\`typescript
const milkdown = new Milkdown();
milkdown.create();
\`\`\`

---

Now you can play!
`;

const app = document.getElementById('app');
const json =
    '{"type":"doc","content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"Milkdown Test"}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Blockquote"}]},{"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"Milkdown is an editor."}]}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Marks Paragraph"}]},{"type":"paragraph","content":[{"type":"text","text":"Hello, "},{"type":"text","marks":[{"type":"strong"},{"type":"em"}],"text":"milkdown"},{"type":"text","marks":[{"type":"strong"}],"text":" nice "},{"type":"text","marks":[{"type":"code_inline"}],"text":"to"},{"type":"text","text":" meet "},{"type":"text","marks":[{"type":"em"}],"text":"you"},{"type":"text","text":"!"},{"type":"hardbreak"},{"type":"text","text":"There should be a line break before this."}]},{"type":"hr"},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Image and Link"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"strong"}],"text":"Of course you can add image! "},{"type":"image","attrs":{"src":"https://th.bing.com/th/id/OIP.EiYMXYhAnpsXnVmwJAq1jAHaEo?pid=ImgDet&rs=1","alt":"cat","title":"kitty"}}]},{"type":"paragraph","content":[{"type":"text","text":"Your "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://bing.com","title":"bing"}},{"type":"em"}],"text":"link is here"},{"type":"text","text":", have a look."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Lists"}]},{"type":"bullet_list","content":[{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"list item 1"}]},{"type":"ordered_list","attrs":{"order":1},"content":[{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"is this the real life"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"is this just fantasy"}]}]}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"list item 2"}]},{"type":"bullet_list","content":[{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"sub list item 1"}]},{"type":"paragraph","content":[{"type":"text","text":"some explain"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"sub list item 2"}]}]}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"list item 3"}]}]}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Code"}]},{"type":"fence","attrs":{"language":"typescript"},"content":[{"type":"text","text":"const milkdown = new Milkdown();\\nmilkdown.create();"}]},{"type":"hr"},{"type":"paragraph","content":[{"type":"text","text":"Now you can play!"}]}]}';

const jsonDefaultValue = {
    type: 'json',
    value: JSON.parse(json),
} as const;

async function main() {
    const editor = await new Editor()
        .config((ctx) => {
            ctx.update(editorViewOptionsCtx, (prev) => ({
                ...prev,
                root: app,
                defaultValue: jsonDefaultValue,
            }));
        })
        .use(commonmark)
        .create();

    const getMarkdown = () => {
        return editor.action((ctx) => {
            const editorView = ctx.get(editorViewCtx);
            const serializer = ctx.get(serializerCtx);
            return serializer(editorView.state.doc);
        });
    };

    console.log(getMarkdown());

    // const editorView = editor.action((ctx) => ctx.get(editorViewCtx));
    // const parser = editor.action((ctx) => ctx.get(parserCtx));
    // const tr = editorView.state.tr;
    // tr.replaceRangeWith(0, editorView.state.doc.nodeSize - 2, parser('# New Content'));
    // editorView.dispatch(tr);
}

main();
