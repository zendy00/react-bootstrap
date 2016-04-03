import React, { PropTypes, cloneElement } from 'react';
import classNames from 'classnames';
import uncontrollable from 'uncontrollable';
import bootstrapUtils, { bsClass } from './utils/bootstrapUtils';
import ValidComponentChildren from './utils/ValidComponentChildren';

let idPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]);

const PanelGroup = React.createClass({

  propTypes: {
    accordion: React.PropTypes.bool,

    /**
     * HTML id attribute, required if no `generateChildId` prop
     * is specified.
     */
    id(props, ...args) {
      let error = null;

      if (!props.generateChildId) {
        error = idPropType(props, ...args);

        if (!error && !props.id) {
          error = new Error(
            'In order to properly initialize the PanelGroup in a way that is accessible to assistive technologies ' +
            '(such as screen readers) an `id` or a `generateChildId` prop to PanelGroup is required');
        }
      }
      return error;
    },

    /**
     * A function that takes an eventKey and type and returns a
     * unique id for each Panel heading and Panel Collapse. The function _must_ be a pure function,
     * meaning it should always return the _same_ id for the same set of inputs. The default
     * value requires that an `id` to be set for the PanelGroup.
     *
     * The `type` argument will either be `"tab"` or `"pane"`.
     *
     * @defaultValue (eventKey, type) => `${this.props.id}-${type}-${key}`
     */
    generateChildId: PropTypes.func,

    /**
     * A callback fired when a tab is selected.
     *
     * @controllable activeKey
     */
    onSelect: PropTypes.func,

    /**
     * The `eventKey` of the currently active tab.
     *
     * @controllable onSelect
     */
    activeKey: PropTypes.any
  },

  childContextTypes: {
    $bs_panel_group: React.PropTypes.shape({
      getId: React.PropTypes.func
    })
  },

  getDefaultProps() {
    return {
      accordion: false
    };
  },

  getChildContext() {
    let getId = null;

    if (this.props.accordion) {
      getId = this.props.generateChildId
        || ((key, type) => this.props.id ? `${this.props.id}-${type}-${key}` : null);
    }
    return {
      $bs_panel_group: { getId },
    };
  },

  render() {
    let classes = bootstrapUtils.getClassSet(this.props);
    let {className, ...props} = this.props;

    if (this.props.accordion) {
      props.role = props.role || 'tablist';
    }

    return (
      <div {...props} className={classNames(className, classes)} onSelect={null}>
        { ValidComponentChildren.map(props.children, this.renderPanel) }
      </div>
    );
  },

  renderPanel(child, index) {
    let activeKey = this.props.activeKey;

    let props = {
      bsStyle: child.props.bsStyle || this.props.bsStyle,
      key: child.key ? child.key : index,
      ref: child.ref
    };

    if (this.props.accordion) {
      props.expanded = (child.props.eventKey === activeKey);
      props.onToggle = this.handleSelect.bind(null, child.props.eventKey);
    }

    return cloneElement(
      child,
      props
    );
  },

  handleSelect(key, expanded, e) {
    if (expanded) {
      this.props.onSelect(key, e);
    }
  }
});

export default uncontrollable(
  bsClass('panel-group', PanelGroup),
  {
    activeKey: 'onSelect'
  }
);
