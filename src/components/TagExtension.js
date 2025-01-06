import { Node } from '@tiptap/core';

const TagExtension = Node.create({
  name: 'tag', // Name of the custom extension

  group: 'inline', // Inline element, works within a line of text

  inline: true,

  selectable: true,

  atom: true, // Treat as a single unit


  addAttributes() {
    return {
      tag: {
        default: 'default-tag', // Default tag text
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-tag]', // Parse any <span> with data-tag attribute
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      {
        ...HTMLAttributes,
        'data-tag': true,
        style: `
          color: white; 
          background: blue; 
          padding: 2px 6px; 
          border-radius: 4px;
        `,
      },
      `#${HTMLAttributes.tag}`,
    ];
  },

  addCommands() {
    return {
      insertTag:
        (tag) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { tag }, // Add the tag text as an attribute
          });
        },
    };
  },
});

export default TagExtension;
