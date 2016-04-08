import React from 'react';
import tbsUtils from './utils/bootstrapUtils';
import Collapse from './Collapse';
import { TAB, PANE } from './utils/tabUtils';


let NavbarCollapse = React.createClass({
  propTypes: {
    bsRole: React.PropTypes.string
  },

  contextTypes: {
    $bs_panel: React.PropTypes.shape({
      getId: React.PropTypes.func,
      bsClass: React.PropTypes.string,
      expanded: React.PropTypes.bool
    })
  },

  getDefaultProps() {
    return { bsRole: 'panel-collapse' };
  },

  render() {
    const { children, ...props } = this.props;
    const { getId, bsClass, expanded } = this.context.$bs_panel || {};

    if (getId) {
      props.id = getId(PANE);
      props.role = props.role || 'tabpanel';
      props['aria-labelledby'] = getId(TAB);
    }

    return (
      <Collapse in={expanded} {...props}>
        <div className={tbsUtils.prefix({ bsClass }, 'collapse')}>
          { children }
        </div>
      </Collapse>
    );
  }
});

export default NavbarCollapse;
