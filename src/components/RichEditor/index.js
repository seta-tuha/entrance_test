import React, { Component } from 'react';
import Draft from 'draft-js';

import ToolBar from './ToolBar';
import 'draft-js/dist/Draft.css';
import './editor.css';

const { Editor, EditorState, Modifier, convertToRaw, convertFromRaw } = Draft;

const emptyState = EditorState.createEmpty();
export default class RichEditorExample extends Component {
  state = {
    editorState: this.props.initData ?
      EditorState.createWithContent(convertFromRaw(this.props.initData)) :
      emptyState
  }

  focus = () => {
    this.refs.editor.focus();
  }

  onChange = (editorState) => {
    this.setState({ editorState });
    this.props.onChange && this.props.onChange(this.props.name, convertToRaw(editorState.getCurrentContent()));
  }

  addBlock = (blockType) => {
    let selection = this.state.editorState.getSelection();
    const currentBlockType = this.state.editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType();

    if (currentBlockType === blockType) {
      return;
    }

    let contentState = this.state.editorState.getCurrentContent();

    contentState = Modifier.splitBlock(contentState, selection);
    let newState = EditorState.push(this.state.editorState, contentState);

    selection = newState.getSelection();

    contentState = Modifier.setBlockType(contentState, selection, blockType);
    this.onChange(EditorState.push(newState, contentState));
  }


  handleTab = (e) => {
    e.preventDefault();
    const tabCharacter = "  ";

    const currentState = this.state.editorState;
    const newContentState = Modifier.replaceText(
      currentState.getCurrentContent(),
      currentState.getSelection(),
      tabCharacter
    );

    this.setState({
      editorState: EditorState.push(currentState, newContentState, 'insert-characters')
    });
  }

  componentDidMount() {
    this.focus();
  }

  render() {
    const {editorState} = this.state;
    const {placeholder, rows=1} = this.props;
    const minHeight = `${rows}rem`;
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <div className="RichEditor-root" style={{ minHeight }}>
        <ToolBar
          editorState={editorState}
          blocks={{ blockTypes: []}}
          inlines={{ inlineStyles: []}}
          additions={[
            { label: '<code>', onClick: this.addBlock, style: 'code-block' },
            { label: '</code>', onClick: this.addBlock, style: 'unstyled' }
          ]}
        />
        <div className={className} onClick={this.focus}>
          <Editor
            customStyleMap={styleMap}
            editorState={editorState}
            onChange={this.onChange}
            onTab={this.handleTab}
            ref="editor"
            placeholder={placeholder}
          />
        </div>
      </div>
    );
  }
}
// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};
