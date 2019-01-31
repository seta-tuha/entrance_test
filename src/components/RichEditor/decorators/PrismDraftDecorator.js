import React from 'react';
import Prism from 'prismjs';
import Immutable from 'immutable';

const { List } = Immutable;

function occupySlice(targetArr, start, end, componentKey) {
  for (let ii = start; ii < end; ii += 1) {
    targetArr[ii] = componentKey; /* eslint-disable-line */
  }
}

class PrismDraftDecorator {
  constructor(grammar) {
    this.grammar = grammar;
    this.highlighted = {};
  }

  getDecorations(block) {
    const blockType = block.getType();
    const blockKey = block.getKey();
    const blockText = block.getText();
    const decorations = Array(blockText.length).fill(null);
    this.highlighted[blockKey] = {};
    if (blockType !== 'code-block') {
      return List(decorations);
    }
    const tokens = Prism.tokenize(blockText, this.grammar);
    let offset = 0;
    tokens.forEach((tok) => {
      if (typeof tok === 'string') {
        offset += tok.length;
      } else {
        const tokId = `tok${offset}`;
        const completeId = `${blockKey}-${tokId}`;
        this.highlighted[blockKey][tokId] = tok;
        occupySlice(decorations, offset, offset + tok.content.length, completeId);
        offset += tok.content.length;
      }
    });
    return List(decorations);
  }

  /* eslint-disable-next-line */
  getComponentForKey() {
    return ({
      tokType,
      entityKey,
      offsetKey,
      decoratedText,
      contentState,
      children,
      ...remainProps
    }) => (
      <span {...remainProps} className={`token ${tokType}`}>{children}</span>
    );
  }

  getPropsForKey(key) {
    const parts = key.split('-');
    const blockKey = parts[0];
    const tokId = parts[1];
    const token = this.highlighted[blockKey][tokId];
    return {
      tokType: token.type
    };
  }
}

export default PrismDraftDecorator;
