<template>
  <div class="height100">
    <div class="header-container">
      <h2 class="text-center">Trades <small><sup>live</sup> : {{exchange.id}} ( {{pair}} )</small></h2>
      <p class="text-center">Last update: {{dateNow.getUTCHours()}} : {{dateNow.getUTCMinutes()}} : {{dateNow.getUTCSeconds()}} (UTC)</p>
    </div>
    <div class="items-container">
      <h4 v-show="errMsg">{{errMsg}}</h4>
      <table v-show="!errMsg" class="table table-borderless text-center">
        <thead>
          <tr>
            <th><h4>Size:</h4></th>
            <th><h4>Price({{pair.slice(pair.indexOf('/')+1)}}):</h4></th>
            <th><h4>Date / Time (UTC):</h4></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="trade in allTrades">
            <td>{{ trade.amount }}</td>
            <td>{{ trade.price }}</td> 
            <td>{{ trade.datetime.slice(0, trade.datetime.indexOf('.')).replace('T' , ' / ') }}</td>
          </tr>
        </tbody>  
      </table>
    </div>
  </div>
</template>

<script>

import {bus} from '@/main.js';

export default {
  name: 'Trades',
  data() {
    return {
      dateNow: new Date(),
      errMsg: '',
      exchange: {},
      pair: '',
      allTrades: [],
      limit: 20,
      fetchTradesInterval: undefined,
    };
  },
  created(){
    bus.$on('PairChosen', (exchange, pair)=>{
      this.allTrades = [];
      this.errMsg = '';
      this.exchange = exchange;
      this.pair = pair;
      let since = undefined;
      if(this.fetchTradesInterval){
        clearInterval(this.fetchTradesInterval);
      }
      this.fetchTradesInterval = setInterval(
        async () => {
          if (this.exchange.has['fetchTrades']) {
            try {
              this.allTrades = await exchange.fetchTrades (this.pair, since, this.limit);
              if(this.allTrades.length == 0){
                this.errMsg = 'There is no data available.';
              }
              else {
                this.allTrades.reverse();
              }
              this.dateNow = new Date();
            } catch(err) {
              this.errMsg = "Failed to fetch the trades info, please try another pair or exchange."
              this.allTrades = [];
              if(this.fetchTradesInterval){
                clearInterval(this.fetchTradesInterval);
              }
            }
          }
        }, 
      2000);
    });
    bus.$on('exchangeChosenErr', (err)=>{
      this.exchange = {};
      this.pair = '';
      this.allTrades = [];
      this.errMsg = '';
      if(this.fetchTradesInterval){
        clearInterval(this.fetchTradesInterval);
      }
    });
  },
};
</script>

<style scoped>

th, td{
  padding: 0 5px;
}

tbody > tr:hover{
  background-color: gray;
}


</style>
