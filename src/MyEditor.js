import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import
BlockStyleToolbar,
{ getBlockStyle }
  from "./components/blockStyles/BlockStyleToolbar";
import './App.css';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
  }
  _onBoldClick() {
    console.log('abc');
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'BOLD'
    ));
  }

  toggleBlockType = (blockType) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  render() {
    return (
      <div>
        <h1>Draft.js Editor</h1>

        <div className="editorContainer">
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
        </div>
      </div>
    );
  }
}

export default MyEditor;
