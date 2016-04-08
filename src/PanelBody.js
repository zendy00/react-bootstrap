import React, { PropTypes } from 'react';
import cn from 'classnames';
import tbsUtils, { bsClass } from './utils/bootstrapUtils';

let PanelBody = React.createClass({
  propTypes: {
    bsRole: PropTypes.string
  },
  contextTypes: {
    $bs_panel: PropTypes.shape({
      bsClass: PropTypes.string
    })
  },

  getDefaultProps() {
    return { bsRole: 'body' };
  },

  render() {
    let { children } = this.props;
    return (
      <div
        {...this.props}
        className={cn(
          this.props.className,
          tbsUtils.prefix(this.props, this.context.$bs_panel, 'body')
        )}
      >
        { children }
      </div>
    );
  }
});

export default bsClass('panel', PanelBody);
