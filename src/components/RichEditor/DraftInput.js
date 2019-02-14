import React, { Component } from 'react';
import Draft from 'draft-js';
import Prism from 'prismjs';
import PrismDecorator from './decorators/PrismDraftDecorator';
import 'draft-js/dist/Draft.css';
import './editor.css';
import './prism.css';
import './draftInput.css';

const {
  Editor, EditorState, convertFromRaw
} = Draft;
const prismDecorator = new PrismDecorator(Prism.languages.javascript);

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

const emptyState = EditorState.createEmpty(prismDecorator);
class DraftInput extends Component {
  state = {
    editorState:
      this.props.initData  // eslint-disable-line
        ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(this.props.initData)), // eslint-disable-line
          prismDecorator
        )
        : emptyState
  }


  render() {
    const { editorState } = this.state;
    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <div className={className} role="presentation">
        <Editor
          customStyleMap={styleMap}
          editorState={editorState}
          readOnly
        />
      </div>
    );
  }
}

export default DraftInput;
