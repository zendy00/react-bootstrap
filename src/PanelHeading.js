import React, { PropTypes, cloneElement } from 'react';
import cn from 'classnames';
import elementType from 'react-prop-types/lib/elementType';
import tbsUtils, { bsClass } from './utils/bootstrapUtils';
import { TAB } from './utils/tabUtils';

let PanelHeading = React.createClass({
  propTypes: {
    componentClass: elementType,
    title: PropTypes.bool
  },

  contextTypes: {
    $bs_panel: PropTypes.shape({
      getId: React.PropTypes.func,
      bsClass: PropTypes.string
    })
  },

  render() {
    let { children, className, title, ...props } = this.props;
    let { getId } = this.context.$bs_panel || {};

    if (getId) {
      props.role = props.role || 'tab';
      props.id = getId(TAB);
    }

    if (title) {
      children = cloneElement(React.Children.only(children), {
        className: cn(
          children.props.className,
          tbsUtils.prefix(props, this.context.$bs_panel, 'title')
        )
      });
    }

    return (
      <div
        {...props}
        className={cn(
          className,
          tbsUtils.prefix(props, this.context.$bs_panel, 'heading')
        )}
      >
        { children }
      </div>
    );
  }
});

export default bsClass('panel', PanelHeading);
