import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official"
import moment from 'moment';


const Timelinechart = () => {
  const baseURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C%2024h%2C%207d%2C%2014d%2C%2030d%2C%20200d%2C%2https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C%2024h%2C%207d%2C%2014d%2C%2030d%2C%20200d%2C%2"

  const [data, setData] = useState([])

  const getData = async () => {
    const res = await axios.get(baseURL);
    
    setData(res.data);
    console.log(res.data);
  };

  // const startTime = moment().day(-4).format("YYYY"-"MM"-"DD") ///  start day 
  // const endTime =moment().format("YYYY-MM-DD")
  const timeline = [];
  
  for (let i=-3;i<=3;i++){  
    timeline.push(moment().day(i).format("YYYY-MM-DD"))
  }
    console.log(timeline);


  useEffect(() => {
    getData();
   }, [])
  const wallet = {
    btc: 5,
    eth: 4,
  }
  const btcarray = data.btc[0].map(price => {
    return price / 1 * wallet.btc 
  })
  const etharray = data[1]?.sparkline_in_7d.price.map(price => {
  return price / 1 * wallet.eth});

  const arr=[]
  for(let i=0;i<btcarray?.length;i++){
   arr[i]=btcarray[i]+etharray[i];
  }

  const options1 = {
    title: {
      text: "CoinGecko APP"
    },
    xAxis: {
      date: "data"
    },
    series: [
      { 
        name:"BTC",
        data: arr,
        color: "red"
    },
    ],

    // rangeSelector: {
    //   buttons: [{
    //     type: 'hour',
    //     count: 1,
    //     text: '1h',
    //   }, 
    //   {
    //     type: 'hour',
    //     count: 24,
    //     text: '24h'
    //   }, 
    //   {
    //     type: 'day',
    //     count: 7,
    //     text: '7d'
    //   }, 
    //   {
    //     type: 'day',
    //     count: 14,
    //     text: '14d'
    //   },
    //   {
    //     type: 'day',
    //     count: 30,
    //     text: '30d'
    //   },
    //   {
    //     type: 'day',
    //     count: 200,
    //     text: '200d'
    //   },
    //   {
    //     type: 'year',
    //     count: 1,
    //     text: '1y'
    //   },    
    // ]}
  };

  // let now = moment()
  // console.log('now ' + now.toISOString())
  // console.log('start ' + now.startOf('-7day').toISOString())
  // console.log('end ' + now.endOf('day').toISOString())







  return (
  <>
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={options1}
    />
  
  



  </>
  );
}

export default Timelinechart;

