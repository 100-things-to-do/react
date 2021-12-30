/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
var Highcharts = require('highcharts/highstock');
// Load Highcharts Maps as a module
require('highcharts/modules/map')(Highcharts);
const axios = require('axios');

function Chart() {
    const [ohlc, setOhlc] = useState([]);
    const [volume, setVolume] = useState([]);
    const [groupingUnits, setGroupingUnits] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api').then(resp => {
            setData(resp.data);
        });
    }, [])

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

        console.log("dataa", data)
    }, [data]);



    useEffect(() => {
        if (ohlc.length > 0 && volume.length > 0 && groupingUnits.length > 0) {
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