import React, { PropTypes } from 'react';
import cn from 'classnames';
import tbsUtils, { bsClass } from './utils/bootstrapUtils';

let PanelFooter = React.createClass({
  contextTypes: {
    $bs_panel: PropTypes.shape({
      bsClass: PropTypes.string
    })
  },
  propTypes: {
    bsRole: PropTypes.string
  },
  getDefaultProps() {
    return { bsRole: 'footer' };
  },
  render() {
    let { children } = this.props;
    return (
      <div
        {...this.props}
        className={cn(
          this.props.className,
          tbsUtils.prefix(this.props, this.context.$bs_panel, 'footer')
        )}
      >
        { children }
      </div>
    );
  }
});

export default bsClass('panel', PanelFooter);
