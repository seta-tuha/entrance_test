import React from 'react';
import { Editor, EditorState } from 'draft-js';
import { BlockStyleToolbar, getBlockStyle } from '../blockStyles';

class RichInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
  }

  render() {
    return (
      <React.Fragment>
        <div className="toolbar">
          <BlockStyleToolbar
            editorState={this.state.editorState}
            onToggle={this.toggleBlockType}
          />
        </div>

        <div className="editors">
          <Editor
            blockStyleFn={getBlockStyle}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default RichInput;
