import React from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  ContentState,
  ContentBlock,
  convertFromRaw
} from 'draft-js';

import
BlockStyleToolbar,
{ getBlockStyle }
  from "./components/blockStyles/BlockStyleToolbar";
import './App.css';

const test = { "blocks": [{ "key": "ep7p", "text": "xin chao", "type": "code-block", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }], "entityMap": {} }

const content = '{ "blocks": [{ "key": "ep7p", "text": "xin chao", "type": "code-block", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }], "entityMap": {} }'

class MyEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
    }

    console.log(test['blocks']);
    this.onChange = (editorState) => this.setState({ editorState });
  }

  toggleBlockType = (blockType) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  handle = () => {
    const { editorState } = this.state;
    console.log(convertToRaw(editorState.getCurrentContent()));
    const note = { content: convertToRaw(editorState.getCurrentContent()) }
    note["content"] = JSON.stringify(note.content);
    this.setState({ content: note.content });
    console.log(note);
    localStorage.setItem('test', note.content);
  }

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
              onChange={this.onChange}
            />
          </div>
        </div>
        <button type="button" onClick={this.handle}>
          Get Content
        </button>
      </div>
    );
  }
}

export default MyEditor;
