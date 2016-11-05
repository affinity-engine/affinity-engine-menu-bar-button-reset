import Ember from 'ember';
import layout from '../templates/components/affinity-engine-menu-bar-button-reset-menu';
import { classNamesConfigurable, configurable, registrant } from 'affinity-engine';
import { ModalMixin } from 'affinity-engine-menu-bar';
import multiton from 'ember-multiton-service';

const {
  Component,
  get,
  set
} = Ember;

const configurationTiers = [
  'config.attrs.component.menuBar.button.reset',
  'config.attrs.component.menuBar.menu',
  'config.attrs.component.menuBar',
  'config.attrs.global'
];

export default Component.extend(ModalMixin, {
  layout,
  hook: 'affinity_engine_menu_bar_reset_menu',

  config: multiton('affinity-engine/config', 'engineId'),
  eBus: multiton('message-bus', 'engineId'),
  dataManager: registrant('affinity-engine/data-manager'),

  acceptKeys: configurable(configurationTiers, 'keys.accept'),
  animationLibrary: configurable(configurationTiers, 'animationLibrary'),
  cancelKeys: configurable(configurationTiers, 'keys.cancel'),
  customClassNames: classNamesConfigurable(configurationTiers, 'classNames'),
  header: configurable(configurationTiers, 'header'),
  iconFamily: configurable(configurationTiers, 'iconFamily'),
  menuColumns: configurable(configurationTiers, 'menuColumns'),
  moveDownKeys: configurable(configurationTiers, 'keys.moveDown'),
  moveLeftKeys: configurable(configurationTiers, 'keys.moveLeft'),
  moveRightKeys: configurable(configurationTiers, 'keys.moveRight'),
  moveUpKeys: configurable(configurationTiers, 'keys.moveUp'),
  transitionIn: configurable(configurationTiers, 'transitionIn'),
  transitionOut: configurable(configurationTiers, 'transitionOut'),

  choices: [{
    text: 'affinity-engine.menu-bar.buttons.reset.ok'
  }],

  actions: {
    closeModal() {
      set(this, 'willTransitionOut', true);
    },

    onChoice() {
      get(this, 'eBus').publish('restartingEngine');

      set(this, 'willTransitionOut', true);
    }
  }
});
