import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    exchangeSearch: '',
    exchangeID: '',
    pairSearch: '',
    symbols: [],
    loadMarketsErr: '',
    pair: '',
    fetchTradesErr: '',
    NoCORSExchanges: ['acx', 'bitbank', 'bitbay', 'bithumb', 'bitso', 'bitstamp', 'bitz', 'bleutrade',
                      'braziliex', 'btctradeua', 'chilebit', 'cobinhood', 'coinbaseprime', 'coinbasepro',
                      'coinfalcon', 'coinone', 'foxbit', 'gdax', 'gemini', 'indodax', 'kuna', 'liqui',
                      'mercado', 'negociecoins', 'paymium', 'poloniex', 'quadrigacx', 'rightbtc', 'southxchange',
                      'surbitcoin', 'theocean', 'tidebit', 'tidex', 'urdubit', 'vaultoro', 'vbtc']
  }
})