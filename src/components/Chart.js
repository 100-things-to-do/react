/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
var Highcharts = require('highcharts/highstock');
// Load Highcharts Maps as a module
require('highcharts/modules/map')(Highcharts);

const Binance = require('node-binance-api');
const binance = new Binance().options({
    'APIKEY': 'kfZriXtkRzHcxBnECfS4in9QEDwmJL636vOSuVClPuDhjVfdByLWD5tzVPWZ3Nzs',
    'APISECRET': 'lQUq5Nd34Dgcv8UsGZlD9YMAKCctEySkvZhBWlshxCrCCkuERrSXQiMD1NqwHj6n'
});

function Chart() {
    const [ohlc, setOhlc] = useState([]);
    const [volume, setVolume] = useState([]);
    const [ready, setReady] = useState(false);
    const [groupingUnits, setGroupingUnits] = useState([]);
    const [data, setData] = useState([
        [1553088600000, 186.23, 189.49, 184.73, 188.16, 31035200],
        [1553175000000, 190.02, 196.33, 189.81, 195.09, 51034200],
        [1553261400000, 195.34, 197.69, 190.78, 191.05, 42407700],
        [1553520600000, 191.51, 191.98, 186.6, 188.74, 43845300],
        [1553607000000, 191.66, 192.88, 184.58, 186.79, 49800500],
        [1553693400000, 188.75, 189.76, 186.55, 188.47, 29848400],
        [1553779800000, 188.95, 189.56, 187.53, 188.72, 20780400],
        [1553866200000, 189.83, 190.08, 188.54, 189.95, 23548400]
    ]);



    useEffect(() => {
        setGroupingUnits([
            [
                "week", // unit name
                [1] // allowed multiples
            ],

            ["month", [1, 2, 3, 4, 6]]
        ]);

        const tempOhlc = [];
        const tempVolume = [];
        for (let i = 0; i < data.length; i += 1) {
            tempOhlc.push([
                data[i][0], // the date
                data[i][1], // open
                data[i][2], // high
                data[i][3], // low
                data[i][4] // close
            ]);

            tempVolume.push([
                data[i][0], // the date
                data[i][5] // the volume
            ]);
        }
        setOhlc([...tempOhlc]);
        setVolume([...tempVolume]);

        binance.candlesticks("BNBBTC", "12h", function (error, ticks) {
            if (error) {
                console.log(error)
            } else {
                console.log("candlesticks()", ticks);
                let last_tick = ticks[ticks.length - 1];
                const temp = ticks.map(item => {
                    let [time, open, high, low, close, volume] = last_tick;
                    return [time, open, high, low, close, volume];
                });
                console.log("candlesticks()", temp);

            }
        });
    }, [data]);



    useEffect(() => {
        if (ohlc.length > 0 && volume.length > 0 && groupingUnits.length > 0) {
            setReady(true);
        }
    }, [ohlc, volume, groupingUnits])



    const options = {
        rangeSelector: {
            selected: 1
        },

        title: {
            text: "AAPL Historical"
        },

        yAxis: [
            {
                labels: {
                    align: "right",
                    x: -3
                },
                title: {
                    text: "OHLC"
                },
                height: "60%",
                lineWidth: 2,
                resize: {
                    enabled: true
                }
            },
            {
                labels: {
                    align: "right",
                    x: -3
                },
                title: {
                    text: "Volume"
                },
                top: "65%",
                height: "35%",
                offset: 0,
                lineWidth: 2
            }
        ],

        tooltip: {
            split: true
        },

        series: [
            {
                type: "candlestick",
                name: "AAPL",
                data: ohlc,
                dataGrouping: {
                    units: groupingUnits
                }
            },
            {
                type: "column",
                name: "Volume",
                data: volume,
                yAxis: 1,
                dataGrouping: {
                    units: groupingUnits
                }
            }
        ]
    };



    return (
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={options}
        />

    )

}





export default Chart;