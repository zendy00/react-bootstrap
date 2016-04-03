import React from 'react';
import classNames from 'classnames';
import elementType from 'react-prop-types/lib/elementType';
import createChainedFunction from './utils/createChainedFunction';
import { TAB, PANE } from './utils/tabUtils';

const PanelToggle = React.createClass({

  propTypes: {
    onClick: React.PropTypes.func,
    /**
     * You can use a custom element for this component
     */
    componentClass: elementType,
  },

  contextTypes: {
    $bs_panel: React.PropTypes.shape({
      getId: React.PropTypes.func,
      onToggle: React.PropTypes.func,
      expanded: React.PropTypes.bool,
    })
  },

  getDefaultProps() {
    return {
      componentClass: 'a',
      role: 'button'
    };
  },

  render() {
    const { onClick, className, componentClass, ...props } = this.props;
    const { expanded, getId } = this.context.$bs_panel || {};
    const Component = componentClass;

    props.onClick = createChainedFunction(onClick, this.handleToggle);
    props['aria-expanded'] = expanded;
    props.className = classNames(className, {
      collapsed: !expanded
    });

    if (getId) {
      props['aria-controls'] = getId(PANE);
    }

    return (
      <Component {...props} />
    );
  },

  handleToggle(event) {
    const { onToggle } = this.context.$bs_panel || {};

    event.preventDefault();

    if (onToggle) {
      onToggle(event);
    }
  }
});

export default PanelToggle;
