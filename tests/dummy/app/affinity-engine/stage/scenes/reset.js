import { Scene } from 'affinity-engine-stage';

export default Scene.extend({
  name: 'Reset',

  start: async function(script) {
    await script.data('count').increment();
    await script.text(await script.data('count'));

    script.scene('reset');
  }
});