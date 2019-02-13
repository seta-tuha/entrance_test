import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Draft from 'draft-js';
import Prism from 'prismjs';
import ToolBar from './ToolBar';
import PrismDecorator from './decorators/PrismDraftDecorator';
import 'draft-js/dist/Draft.css';
import './editor.css';
import './prism.css';

const {
  Editor, EditorState, Modifier, convertToRaw, convertFromRaw
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
class RichEditor extends Component {
  state = {
    editorState:
      this.props.initData  // eslint-disable-line
        ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(this.props.initData)), // eslint-disable-line
          prismDecorator
        )
        : emptyState
  }

  componentDidMount() {
    this.focus();
  }

  focus = () => this.editorRef.focus();

  onChange = (editorState) => {
    const { onChange } = this.props;
    this.setState({ editorState });
    onChange && onChange(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
  }

  changeEditor = (editorState, contentState, blockType) => {
    const selection = editorState.getSelection();
    const newContentState = Modifier.setBlockType(contentState, selection, blockType);
    this.onChange(EditorState.push(editorState, newContentState));
  }

  addBlock = (blockType) => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    let contentState = editorState.getCurrentContent();
    const currentBlockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    if (currentBlockType === blockType) {
      this.changeEditor(editorState, contentState, 'unstyled');
    } else if (
      currentBlockType === 'unstyled'
      && contentState.getBlockMap().first().key === selection.getStartKey()
    ) {
      this.changeEditor(editorState, contentState, blockType);
    } else {
      contentState = Modifier.splitBlock(contentState, selection);
      const newEditorState = EditorState.push(editorState, contentState);
      this.changeEditor(newEditorState, contentState, blockType);
    }
  }

  handleTab = (e) => {
    const { editorState } = this.state;
    e.preventDefault();
    const tabCharacter = '  ';

    const currentState = editorState;
    const newContentState = Modifier.replaceText(
      currentState.getCurrentContent(),
      currentState.getSelection(),
      tabCharacter
    );

    this.setState({
      editorState: EditorState.push(currentState, newContentState, 'insert-characters')
    });
  }

  handleKeyCommand = (command) => {
    const { editorState } = this.state;
    if (command === 'backspace') {
      const contentState = editorState.getCurrentContent();
      const { key: firstKey } = contentState.getBlockMap().first();
      const currentSelectionKey = editorState.getSelection().getStartKey();
      if (firstKey === currentSelectionKey) {
        this.changeEditor(editorState, contentState, 'unstyled');
      }
    }
  }

  render() {
    const { editorState } = this.state;
    const { placeholder, rows = 1 } = this.props;
    const minHeight = `${rows}rem`;
    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="RichEditor-root" style={{ minHeight }}>
        <ToolBar
          editorState={editorState}
          blocks={{ blockTypes: [] }}
          inlines={{ inlineStyles: [] }}
          additions={[
            { label: '<code>', onClick: this.addBlock, style: 'code-block' },
            { label: '</code>', onClick: this.addBlock, style: 'unstyled' }
          ]}
        />
        <div className={className} onClick={this.focus} role="presentation">
          <Editor
            customStyleMap={styleMap}
            editorState={editorState}
            onChange={this.onChange}
            onTab={this.handleTab}
            ref={(node) => { this.editorRef = node; }}
            placeholder={placeholder}
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>
      </div>
    );
  }
}

RichEditor.defaultProps = {
  placeholder: '',
  rows: 1,
  initData: ''
};

RichEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  initData: PropTypes.string
};

export default RichEditor;
