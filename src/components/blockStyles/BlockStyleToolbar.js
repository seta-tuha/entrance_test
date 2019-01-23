import React from 'react';
import BlockStyleButton from './BlockStyleButton'

export const BLOCK_TYPES = [
  { label: "Code Block", style: 'code-block' }
];

export function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

class BlockStyleToolbar extends React.Component {
  render() {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <React.Fragment>
        <span className="RichEditor-controls">
          {BLOCK_TYPES.map(type => {
            return (
              <BlockStyleButton
                active={type.style === blockType}
                label={type.label}
                onToggle={this.props.onToggle}
                style={type.style}
                key={type.label}
              />
            );
          })}
        </span>
      </React.Fragment>
    );
  }
}

export default BlockStyleToolbar;
