import React from 'react';
import PropTypes from 'prop-types';

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      const { onToggle, style } = this.props;
      e.preventDefault();
      onToggle(style);
    };
  }

  render() {
    const { label, active } = this.props;
    let className = 'RichEditor-styleButton';
    if (active) {
      className += ' RichEditor-activeButton';
    }
    return (
      <div
        className={className} onMouseDown={this.onToggle}
        role="presentation"
      >
        {label}
      </div>
    );
  }
}

StyleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  style: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired
};

export default StyleButton;
