// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

/* eslint-disable no-new */
let VueApp = new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});

var config = {
  content: [
    {
      type: 'row',
      content:[
        {
          title: 'Exchange',
          type: 'component',
          componentName: 'template',
          componentState: { templateId: 'exchange' }
        },
        {
          title: 'Pair',
          type: 'component',
          componentName: 'template',
          componentState: { templateId: 'pair' }
        },
        {
          title: 'Trades',
          type: 'component',
          componentName: 'template',
          componentState: { templateId: 'trades' }
        }
      ]
    }
  ]
};

var myLayout = new GoldenLayout(config, $('#app'));

myLayout.registerComponent( 'template', function( container, componentState ){
  var html = "<div id=\"" + componentState.templateId + "\">" + $('#' + componentState.templateId).html() + "</div>";
  container.getElement().html(html);
  new Vue({
    el: '#' + componentState.templateId,
});

});

myLayout.init();