const Binance = require('node-binance-api');
const binance = new Binance().options({
    'APIKEY': 'kfZriXtkRzHcxBnECfS4in9QEDwmJL636vOSuVClPuDhjVfdByLWD5tzVPWZ3Nzs',
    'APISECRET': 'lQUq5Nd34Dgcv8UsGZlD9YMAKCctEySkvZhBWlshxCrCCkuERrSXQiMD1NqwHj6n'
});

binance.candlesticks("BNBBTC", "4h", function (error, ticks) {
    console.log("candlesticks()", ticks);
    let last_tick = ticks[ticks.length - 1];
    let [time, open, high, low, close, volume,] = last_tick;
    console.log("BNBBTC last close: " + close);
});