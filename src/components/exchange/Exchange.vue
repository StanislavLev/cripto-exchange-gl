<template>
  <div id='exchange' class="height100">
    <div class="header-container">
      <h2 class="text-center">Exchange</h2>
      <input type="text" v-model="exchangeSearch" placeholder="Type an exchange name"></input>
    </div>
    <div class="items-container">
      <ul>
        <li v-for="exchangeID in exchanges" @click="updateExchange(exchangeID)" v-show="exchangeSearch == null || exchangeID.toLowerCase().indexOf(exchangeSearch.toLowerCase())!=-1">{{ exchangeID }}</li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Exchange',
  data() {
    return {
      exchanges: this.$store.state.NoCORSExchanges,
    };
  },
  computed: {
    exchangeSearch: {
      get: function(){
        return this.$store.state.exchangeSearch;
      },
      set: function(newVal){
        this.$store.state.exchangeSearch = newVal;
        localStorage.setItem( 'localStorageStore', JSON.stringify(this.$store.state) );
      }
    }
  },
  methods: {
    updateExchange(newVal) {
      this.$store.state.exchangeID = newVal;
      this.$store.state.pair = "";
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
