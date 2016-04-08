import React from 'react';
import uncontrollable from 'uncontrollable';
import classNames from 'classnames';
import warning from 'warning';
import bootstrapUtils, { bsStyles, bsClass } from './utils/bootstrapUtils';
import { State, PRIMARY, DEFAULT } from './styleMaps';

import Body from './PanelBody';
import Heading from './PanelHeading';
import Title from './PanelTitle';
import Footer from './PanelFooter';
import Toggle from './PanelToggle';
import Collapse from './PanelCollapse';

let Panel = React.createClass({

  propTypes: {
    onToggle: React.PropTypes.func,
    expanded: React.PropTypes.bool,
    eventKey: React.PropTypes.any,
    collapsible: React.PropTypes.bool,
    /**
     * The children of a Dropdown may be a `<Dropdown.Toggle/>` or a `<Dropdown.Menu/>`.
     * @type {node}
     */
    children: React.PropTypes.node,
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

  render() {
    let { children, ...props } = this.props;

    return (
      <div
        {...props}
        className={classNames(
          this.props.className,
          bootstrapUtils.getClassSet(this.props)
        )}
      >
        { this.extractChildren(children) }
      </div>
    );
  },

  extractChildren(children) {
    let headers = [];
    let footers = [];
    let body = [];
    let pendingBody = [];
    let i = 0;
    function addChild(array, child) {
      array.push(
        React.isValidElement(child)
          ? React.cloneElement(child, { key: ++i })
          : child
      );
    }

    function maybeWrapPanelBody() {
      if (pendingBody.length === 0) {
        return;
      }
      addChild(body, <Body>{pendingBody}</Body>);
      pendingBody = [];
    }

    React.Children.forEach(children, child => {
      if (child == null) { return; }

      let role = React.isValidElement(child)
        ? child.props.bsRole
        : '';

      switch (role) {
      case 'heading':
        addChild(headers, child);
        break;
      case 'footer':
        addChild(footers, child);
        break;
      case 'body':
        maybeWrapPanelBody();
        addChild(body, child);
        break;
      case 'panel-collapse':
        warning(!this.props.collapsible,
          'You are nesting a `<Panel.Collapse>` inside of a Panel with a `collapsible` prop ' +
          'set to true. Either let the Panel wrap your panel body for you or remove the `collapsible` prop.'
        );
        addChild(body, child);
        break;
      default:
        addChild(pendingBody, child);
        break;
      }
    });

    maybeWrapPanelBody();

    if (this.props.collapsible) {
      body = (<Collapse>{body}</Collapse>);
    }

    return [...headers, ...body, ...footers];
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

Object.assign(Panel, { Heading, Title, Body, Footer, Toggle, Collapse });

export default Panel;
