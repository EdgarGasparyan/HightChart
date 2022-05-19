import './App.css';
import React,{useState, useEffect,useMemo} from 'react';
import axios from 'axios';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official"
const Intervalchart = () => {
  const [data, setData] = useState({})
  const btcURL = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max"    
  const eterURL = "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=max"    
  const makerUrl = "https://api.coingecko.com/api/v3/coins/maker/market_chart?vs_currency=usd&days=max"
  const moneroUrl = "https://api.coingecko.com/api/v3/coins/monero/market_chart?vs_currency=usd&days=max"
  const ltcUrl = "https://api.coingecko.com/api/v3/coins/litecoin/market_chart?vs_currency=usd&days=max"

  const getData = useMemo(async () => {
    const btc = await axios(btcURL);
    const eth = await axios(eterURL);
    const maker = await axios(makerUrl);
    const monero = await axios(moneroUrl);
    const litecoin = await axios(ltcUrl);
  return {
      btc: btc.data.prices,
      eth: eth.data.prices,
      maker: maker.data.prices,
      monero: monero.data.prices,
      ltc: litecoin.data.prices,
    }
}, [])
useEffect(() => {
  getData.then((res) => setData(res))
})

const wallet = {
  btc: 1,
  eth: 1.3,
  maker: 5.7,
  monero: 3.8,
  ltc: 8.9,
} 
const datatime = data?.btc?.map(time => {
  return time[0]
})

const btcarray = data?.btc?.map(price => {
  return price[1] / 1 * wallet.btc 
});
const etharray = data?.eth?.map(price => {
  return price[1] / 1 * wallet.eth 
});
const makerarray = data?.eth?.map(price => {
  return price[1] / 1 * wallet.maker 
});
const moneroarray = data?.eth?.map(price => {
  return price[1] / 1 * wallet.monero 
})
const ltcarray = data?.eth?.map(price => {
  return price[1] / 1 * wallet.ltc 
})
const arr=[]
for(let i=0;i<data?.btc?.length;i++){
  arr[i]=btcarray?.[i] + makerarray?.[i] + moneroarray?.[i] + ltcarray?.[i] + etharray?.[i]
}
console.log(data);

const Total=[]
for(let i = 0 ; i < arr.length-1; i++){
Total[i]=new Array(datatime[i],arr[i])
}
const options = {
  title: {
    text: "CoinGecko APP"
  },
  Date: {
    date: 'datatime'
  },
  series: [
    { 
      name:"Total",
      data: arr,
      color: 'red',
  },
  ]
}
return (
  <>
  <h1>
    HEllo World
  </h1>
  <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
  </>
  );
}

export default Intervalchart;

