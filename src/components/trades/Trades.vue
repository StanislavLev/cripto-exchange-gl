<template>
  <div class="height100">
    <div class="header-container" ref="tradesHeader">
      <h2 class="text-center">Trades <small><sup>live</sup> : {{currExchange.id}} ( {{pair}} )</small></h2>
      <p class="text-center">Last update: {{dateNow.getUTCHours()}} : {{dateNow.getUTCMinutes()}} : {{dateNow.getUTCSeconds()}} (UTC)</p>
    </div>
    <div class="items-container">
      <h4 v-show="fetchTradesErr">{{fetchTradesErr}}</h4>
      <table v-show="!fetchTradesErr" class="table table-borderless text-center">
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

export default {
  name: 'Trades',
  data() {
    return {
      dateNow: new Date(),
      currExchange: {},
      allTrades: [],
      limit: 20,
      fetchTradesInterval: undefined,
    };
  },
  computed: {
    exchangeID() {
      return this.$store.state.exchangeID;
    },
    pair() {
      return this.$store.state.pair;
    },
    loadMarketsErr() {
      this.$store.state.loadMarketsErr;
    },
    fetchTradesErr() {
      return this.$store.state.fetchTradesErr;
    }
  },  
  methods: {
    loadMarkets() {
      if(this.exchangeID != ''){
        (async () => {
          this.currExchange = new ccxt[this.exchangeID]();
          this.currExchange.enableRateLimit = true;
          this.allTrades = [];
          this.$store.state.symbols = [];
          this.$store.state.loadMarketsErr = '';
          this.$store.state.fetchTradesErr = '';
          if(this.fetchTradesInterval){
            clearInterval(this.fetchTradesInterval);
          }
          try {
            await this.currExchange.loadMarkets();
            this.$store.state.symbols = this.currExchange.symbols;
          } catch(err) {
            this.$store.state.loadMarketsErr = 'Failed to fetch the exchange info, please try another one.';
          } finally {
            localStorage.setItem( 'localStorageStore', JSON.stringify(this.$store.state) );
            this.clickTradesHeader();
          }        
        })();
      }
    },
    fetchTrades() {
      if(this.pair != ''){
        this.allTrades = [];
        this.$store.state.fetchTradesErr = '';
        let since = undefined;
        if(this.fetchTradesInterval){
          clearInterval(this.fetchTradesInterval);
        }
        if (this.currExchange.has['fetchTrades']) {
          this.fetchTradesInterval = setInterval(
            async () => {
              try {
                this.allTrades = await this.currExchange.fetchTrades (this.pair, since, this.limit);
                if(this.allTrades.length == 0){
                  this.$store.state.fetchTradesErr = 'There is no data available.';
                }
                else {
                  this.allTrades.reverse();
                }
                this.dateNow = new Date();
              } catch(err) {
                this.$store.state.fetchTradesErr = "Failed to fetch the trades info, please try another pair or exchange."
                this.allTrades = [];
                if(this.fetchTradesInterval){
                  clearInterval(this.fetchTradesInterval);
                }
              }
            },
          2000);
        }
        else {
          this.$store.state.fetchTradesErr = "There is no data available."
        }

      }
    },
    // use clickTradesHeader to trigger click event, this event is used
    // by Golden-Layout contayner to sync store.state values across windows 
    // with localStorageStore(single source of truth), it can be removed,  
    // but in this case 'loadMarkets' method should be moved to 'Pair' component
    // and triggered twice: in Pair and Trade components or find some way to pass 
    // exchange object after 'loadMarkets' method triggered to 'Trades' component 
    clickTradesHeader() {
      const elem = this.$refs.tradesHeader
      elem.click()
    }
  },
  watch: {
    exchangeID: {
      handler: "loadMarkets",
      immediate: true
    },
    pair: {
      handler: "fetchTrades",
      immediate: true
    }
  },
};
</script>

<style scoped>

th, td{
  padding: 0 10px;
}

tbody > tr:hover{
  background-color: gray;
}


</style>
