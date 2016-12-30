import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../../tests/helpers/module-for-acceptance';
import { $hook, hook } from 'ember-hook';

moduleForAcceptance('Acceptance | menu bar/reset', {
  beforeEach() {
    localStorage.clear();
    Ember.$.Velocity.mock = true;
  },

  afterEach() {
    Ember.$.Velocity.mock = false;
  }
});

test('Affinity Engine | Menu Bar | Button | Reset', function(assert) {
  assert.expect(6);

  const done = assert.async();

  visit('/').then(() => {
    assert.equal($hook('affinity_engine_stage_direction_text').text().trim(), '1', 'text is correct');

    return click('.lxl-container');
  }).then(() => {
    assert.equal($hook('affinity_engine_stage_direction_text').text().trim(), '2', 'text is correct');

    return click(hook('affinity_engine_menu_bar_reset'));
  }).then(() => {
    assert.equal($hook('affinity_engine_menu_bar_reset_menu').length, 1, 'menu opened');

    return click($hook('affinity_engine_menu_bar_menu_screen').get(0));
  }).then(() => {
    assert.equal($hook('affinity_engine_menu_bar_reset_menu').length, 0, 'menu is closed');

    return click(hook('affinity_engine_menu_bar_reset'));
  }).then(() => {
    return click($hook('ember_flex_menu_option_button').get(0));
  }).then(() => {
    assert.equal($hook('affinity_engine_menu_bar_reset_menu').length, 0, 'menu closes after reset');
    assert.equal($hook('affinity_engine_stage_direction_text').text().trim(), '1', 'engine restarted');

    done();
  });
});
