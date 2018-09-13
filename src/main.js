// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Comp1  from '@/components/Comp1.vue';
import Comp2  from '@/components/Comp2.vue';
import Comp3  from '@/components/Comp3.vue';


Vue.config.productionTip = false;

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
          componentState: { id: 'exchange', vueTemplate: Comp1 }
        },
        {
          title: 'Pair',
          type: 'component',
          componentName: 'template',
          componentState: { id: 'pair', vueTemplate: Comp2 }
        },
        {
          title: 'Trades',
          type: 'component',
          componentName: 'template',
          componentState: { id: 'trades', vueTemplate: Comp3 }
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