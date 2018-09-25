<template>
  <div class="height100">
    <div class="header-container">
      <h2 class="text-center">Pair <small>for: {{exchangeID}}</small></h2>
      <input type="text" v-model="pairSearch" placeholder="Type a pair name"></input>
    </div>
    <div class="items-container">
      <h4 class="text-center" v-show="symbols.length == 0 && !loadMarketsErr">Chose an exchange</h4>
      <h4 class="text-center" v-show="loadMarketsErr">{{loadMarketsErr}}</h4>
      <ul>
        <li v-for="pair in symbols" @click="updatePair(pair)" v-show="pairSearch == null || pair.toLowerCase().indexOf(pairSearch.toLowerCase())!=-1">{{ pair }}</li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Pair',

  computed: {
    exchangeID(){
      return this.$store.state.exchangeID;
    },
    symbols(){
      return this.$store.state.symbols;
    },
    loadMarketsErr(){
      return this.$store.state.loadMarketsErr;
    },
    pairSearch: {
      get: function(){
        return this.$store.state.pairSearch;
      },
      set: function(newVal){
        this.$store.state.pairSearch = newVal;
        localStorage.setItem( 'localStorageStore', JSON.stringify(this.$store.state) );
      },
    },
  },
  methods: {
    updatePair(newVal) {
      this.$store.state.pair = newVal;
      localStorage.setItem( 'localStorageStore', JSON.stringify(this.$store.state) );
    },
  },
};
</script>

<style scoped>

input{
  width: 100%;
}

.items-container > ul {
  list-style-type: none;
  padding: 0;
}

.items-container > ul > li:hover{
  cursor: pointer;
  background-color: gray;
}

</style>
