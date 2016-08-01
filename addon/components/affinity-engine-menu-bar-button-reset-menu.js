import Ember from 'ember';
import layout from '../templates/components/affinity-engine-menu-bar-button-reset-menu';
import { classNamesConfigurable, configurable, deepConfigurable, registrant } from 'affinity-engine';
import { ModalMixin } from 'affinity-engine-menu-bar';
import { BusPublisherMixin } from 'ember-message-bus';
import multiton from 'ember-multiton-service';

const {
  Component,
  assign,
  computed,
  get,
  getProperties
} = Ember;

const configurationTiers = [
  'config.attrs.component.menuBar.button.reset',
  'config.attrs.component.menuBar.menu',
  'config.attrs.component.menuBar',
  'config.attrs'
];

export default Component.extend(BusPublisherMixin, ModalMixin, {
  layout,
  hook: 'affinity_engine_menu_bar_reset_menu',

  saveStateManager: registrant('affinity-engine/save-state-manager'),
  config: multiton('affinity-engine/config', 'engineId'),

  menuColumns: configurable(configurationTiers, 'menuColumns'),
  customClassNames: classNamesConfigurable(configurationTiers, 'classNames'),
  iconFamily: configurable(configurationTiers, 'iconFamily'),
  keys: deepConfigurable(configurationTiers, 'keys'),

  options: computed('menuColumns', 'customClassNames', 'iconFamily', 'icon', 'keys', {
    get() {
      return assign({ classNames: get(this, 'customClassNames') }, getProperties(this, 'menuColumns', 'iconFamily', 'icon', 'keys'));
    }
  }),

  choices: [{
    text: 'affinity-engine.menu.reset.confirm'
  }],

  actions: {
    closeModal() {
      this.closeModal();
    },

    onChoice() {
      this.publish(`ae:${get(this, 'engineId')}:restartingEngine`);

      this.closeModal();
    }
  }
});
