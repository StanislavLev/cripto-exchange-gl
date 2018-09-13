// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Exchange   from '@/components/exchange/Exchange.vue';
import Pair       from '@/components/pair/Pair.vue';
import Trades     from '@/components/trades/Trades.vue';


Vue.config.productionTip = false;

export const bus = new Vue();
/* eslint-disable no-new */
//let VueApp = new Vue({
//  el: '#app',
//  components: { Comp1, Comp2, Comp3 },
//});

var config = {
  content: [
    {
      type: 'row',
      content:[
        {
          title: 'Exchange',
          type: 'component',
          componentName: 'template',
          componentState: { id: 'exchange', vueTemplate: Exchange }
        },
        {
          title: 'Pair',
          type: 'component',
          componentName: 'template',
          componentState: { id: 'pair', vueTemplate: Pair }
        },
        {
          title: 'Trades',
          type: 'component',
          componentName: 'template',
          componentState: { id: 'trades', vueTemplate: Trades }
        }
      ]
    }
  ]
};

var myLayout = new GoldenLayout(config);

myLayout.registerComponent( 'template', function( container, componentState ){
  var html = '<div id="' + componentState.id + '"></div>';
  container.getElement().html(html);
  setTimeout(() => {  
    new Vue({
      el:  '#' + componentState.id, 
      render : h => h(componentState.vueTemplate)
    });
  });
});

myLayout.init();