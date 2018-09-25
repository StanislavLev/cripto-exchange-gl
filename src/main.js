
import Vue from 'vue';
import Exchange   from '@/components/exchange/Exchange.vue';
import Pair       from '@/components/pair/Pair.vue';
import Trades     from '@/components/trades/Trades.vue';
import {store}    from '@/store/store.js'

let localStorageStore = localStorage.getItem( 'localStorageStore' );
if(localStorageStore == null) {
  localStorage.setItem( 'localStorageStore', JSON.stringify(store.state) );
}


var config = {
  content: [
    {
      type: 'row',
      content:[
        {
          title: 'Exchange',
          type: 'component',
          componentName: 'template',
          isClosable: false,
          componentState: { id: 'exchange'}
        },
        {
          title: 'Pair',
          type: 'component',
          componentName: 'template',
          isClosable: false,
          componentState: { id: 'pair'}
        },
        {
          title: 'Trades',
          type: 'component',
          componentName: 'template',
          isClosable: false,
          componentState: { id: 'trades'}
        }
      ]
    }
  ]
};

var myLayout,
    savedState = localStorage.getItem( 'savedState' );

if( savedState !== null ) {
    myLayout = new GoldenLayout( JSON.parse( savedState ) );
} else {
    myLayout = new GoldenLayout( config );
}

myLayout.on( 'stateChanged', function(){
    var state = JSON.stringify( myLayout.toConfig() );
    localStorage.setItem( 'savedState', state );
});

var persistentComponent = function( container, state ){
  // Check for localStorage
  if( !typeof window.localStorage ) {
    container.getElement().append(  '<h2 class="err">Your browser doesn\'t support localStorage.</h2>');
    return;
  }

  // create vue html depend on id for each container
  let vueTemp = state.id == "exchange" ? Exchange : (state.id == "pair" ? Pair : Trades);
  var html = "<div id=\"" + state.id + "\">" + $('#' + state.id).html() + "</div>";
  container.getElement().html(html);

  // update store.state with localStorageStore(single source of truth) values before create element
  // otherwise it will be created with initial store.state values
  store.replaceState(JSON.parse( localStorage.getItem( 'localStorageStore' )));
  
  // use click event(select exchange, select pair, click on header in 'Trades' component) 
  // to sync store.state values across windows with localStorageStore(single source of truth)
  container.getElement().on( 'click', function(){
    container.layoutManager.eventHub.emit( 'updateStore' );
  });
 
  container.layoutManager.eventHub.on( 'updateStore', function(){
    store.replaceState(JSON.parse( localStorage.getItem( 'localStorageStore' )));
  });
  
  // create vue elements
  setTimeout(function () {
    new Vue({
      el:  '#' + state.id, 
      store: store,
      render : h => h(vueTemp)
    });
  });

};

myLayout.registerComponent( 'template', persistentComponent );
myLayout.init();

