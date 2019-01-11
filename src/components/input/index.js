import React from 'react';
import { Editor, EditorState, convertFromRaw, RichUtils, convertToRaw } from 'draft-js';
import { BlockStyleToolbar, getBlockStyle } from '../blockStyles';
import { isEmpty } from 'lodash';

const content = '{ "blocks": [{ "key": "ep7p", "text": "xin chao", "type": "code-block", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }], "entityMap": {} }'

class RichInput extends React.Component {
  constructor(props) {
    super(props);

    const { content } = this.props;
    if (isEmpty(content)) {
      this.state = {
        editorState: EditorState.createEmpty()
      }
    } else {
      this.state = {
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.content)))
      };
    }
  }

  onChange = editorState => {
    const { handleChange } = this.props;
    const option = { answer: convertToRaw(editorState.getCurrentContent()) };
    option.answer = JSON.stringify(option.answer);

    this.setState({ editorState });
    handleChange(option);
  }

  toggleBlockType = (blockType) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  handle = () => {
    const { editorState } = this.state;
    console.log(convertToRaw(editorState.getCurrentContent()));
    const note = { content: convertToRaw(editorState.getCurrentContent()) }
    note["content"] = JSON.stringify(note.content);
    console.log(note);
    this.setState({ content: note.content });
    localStorage.setItem('test', note.content);
  }

  render() {
    const { name } = this.props;
    return (
      <React.Fragment>
        <div className="toolbar">
          <BlockStyleToolbar
            editorState={this.state.editorState}
            onToggle={this.toggleBlockType}
          />
        </div>

        <div className="editors" name={name}>
          <Editor
            blockStyleFn={getBlockStyle}
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default RichInput;
