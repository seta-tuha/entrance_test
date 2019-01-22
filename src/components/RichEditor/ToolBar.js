import React from 'react';
import StyleButton from './StyleButton';

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

const ToolBar = ({
  inlines: { inlineStyles, onToggleInline},
  blocks: { blockTypes, onToggleBlock },
  additions,
  editorState
}) => {
  const selection = editorState.getSelection();
  const currentBlockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  const currentInlineStyle = editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-toolbar">
      <div className="RichEditor-controls" key="block-type">
        {blockTypes.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === currentBlockType}
            label={type.label}
            onToggle={onToggleBlock}
            style={type.style}
          />
        )}
      </div>
      <div className="RichEditor-controls" key="inline-style">
        {inlineStyles.map((type) =>
          <StyleButton
            key={type.label}
            active={currentInlineStyle.has(type.style)}
            label={type.label}
            onToggle={onToggleInline}
            style={type.style}
          />
        )}
      </div>
      <div className="RichEditor-controls" key="addtional">
        {additions.map((addition) =>
          <StyleButton
            key={addition.label}
            active={addition.style === currentBlockType}
            label={addition.label}
            style={addition.style}
            onToggle={addition.onClick}
          />
        )}
      </div>
    </div>
  )
}

ToolBar.defaultProps = {
  blocks: {
    blockTypes: BLOCK_TYPES,
    onToggleBlock: () => {}
  },
  inlines: {
    inlineStyles: INLINE_STYLES,
    onToggleInline: () => {}
  },
  additions: []
}

export default ToolBar;
