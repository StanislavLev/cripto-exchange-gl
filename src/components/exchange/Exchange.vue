<template>
  <div class="height100">
    <div class="header-container">
      <h2 class="text-center">Exchange</h2>
      <input type="text" v-model="exchangeSearch" placeholder="Type an exchange name"></input>
    </div>
    <div class="items-container">
      <ul>
        <li v-for="exchange in exchanges" @click="findPair(exchange)" v-show="exchange.toLowerCase().indexOf(exchangeSearch.toLowerCase())!=-1">{{ exchange }}</li>
      </ul>
    </div>
  </div>
</template>

<script>

import {bus} from '@/main.js';

export default {
  name: 'Exchange',
  data() {
    return {
      exchanges: ccxt.exchanges,
      exchangeSearch: '',
    };
  },
  methods: {
    findPair(exchange4pair) {
      (async () => {
        let currExchange = new ccxt[exchange4pair]();
        currExchange.enableRateLimit = true;
        try {
          await currExchange.loadMarkets();
          bus.$emit('exchangeChosen', currExchange);
        } catch(err) {
          bus.$emit('exchangeChosenErr', "Failed to fetch the exchange info, please try another one.");
        }      
      })();
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
