import React from 'react';
import {
  Editor,
  EditorState,
  convertFromRaw,
  RichUtils,
  convertToRaw
} from 'draft-js';
import { isEmpty } from 'lodash';
import { BlockStyleToolbar, getBlockStyle } from '../blockStyles';

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
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
      };
    }
  }

  onChange = editorState => {
    const { handleChange } = this.props;
    const field = { content: convertToRaw(editorState.getCurrentContent()) };
    field.content = JSON.stringify(field.content);

    this.setState({ editorState });
    handleChange(field);
  }

  toggleBlockType = (blockType) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

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
