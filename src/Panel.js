import React from 'react';
import uncontrollable from 'uncontrollable';
import classNames from 'classnames';
import bootstrapUtils, { bsStyles, bsClass } from './utils/bootstrapUtils';
import { State, PRIMARY, DEFAULT } from './styleMaps';

import Body from './PanelBody';
import Heading from './PanelHeading';
import Footer from './PanelFooter';
import Toggle from './PanelToggle';
import Collapse from './PanelCollapse';

let Panel = React.createClass({

  propTypes: {
    onToggle: React.PropTypes.func,
    expanded: React.PropTypes.bool,
    eventKey: React.PropTypes.any
  },

  contextTypes: {
    $bs_panel_group: React.PropTypes.shape({
      getId: React.PropTypes.func
    })
  },

  childContextTypes: {
    $bs_panel: React.PropTypes.shape({
      getId: React.PropTypes.func,
      bsClass: React.PropTypes.string,
      onToggle: React.PropTypes.func,
      expanded: React.PropTypes.bool,
    })
  },

  getChildContext() {
    let { getId } = this.context.$bs_panel_group || {};

    return {
      $bs_panel: {
        getId: getId ? (type) => getId(this.props.eventKey, type) : null,
        bsClass: this.props.bsClass,
        onToggle: this.handleToggle,
        expanded: this.props.expanded
      }
    };
  },

  getDefaultProps() {
    return {};
  },

  render() {
    let { children, ...props} = this.props;

    if (typeof children === 'string' || typeof children === 'number') {
      children = (
        <Body>{children}</Body>
      );
    }

    return (
      <div
        {...props}
        className={classNames(
          this.props.className,
          bootstrapUtils.getClassSet(this.props)
        )}
      >
        { children }
      </div>
    );
  },

  handleToggle(e) {
    this.props.onToggle(!this.props.expanded, e);
  }

});

const PANEL_STATES = State.values().concat(DEFAULT, PRIMARY);

Panel = uncontrollable(
  bsStyles(PANEL_STATES, DEFAULT,
    bsClass('panel', Panel)
  ),
  { expanded: 'onToggle' }
);

Object.assign(Panel, { Heading, Body, Footer, Toggle, Collapse });

export default Panel;
