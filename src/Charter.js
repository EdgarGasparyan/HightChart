import './App.css';
import React, {useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official"
// import Moment from 'moment';
const Charter = () => {
    

  

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

  
    // const historyPrice = () => {
    //   const date = btc?.find(item => Moment(item).format("YYYY-MM-DD"))
    //   console.log(value);

    //   if(date === value){
    //     console.log("du gtar ayn");
    //   }     
    // }

    // historyPrice()
  // console.log(btc);
  // const pp =  btc?.map(item => item);

  // const bb = pp?.[1100][1];
  // const aa=pp?.[1100][0];

  // console.log(bb);

  // console.log(Moment(aa).format("YYYY-MM-DD"));

  // const balace = wallet.count * bb
  // console.log(balace);

const [data, setData] = useState({})
const [loading, setLoading] = useState(true)


useEffect(() => {
  if(loading){
    getData.then((res) => setData(res))
    .catch((e) => console.log(e))
    .finally(() => setLoading(false))
  }
})


const options = {
    title: {
      text: "CoinGecko APP"
    },
    xAxis: {
      date: "datatime"
    },
    series: [
      { 
        name:"BTC",
        data: data.btc,
    },
    { 
      name:"ETH",
      data: data.eth,
    },
    { 
      name:"MAKER",
      data: data.maker,
    },
    { 
      name:"Monero",
      data: data.monero,
    },
    { 
      name:"Litecoin",
      data: data.ltc,
    },

    ]
  };

  const [value, setValue] = useState({});

  const handleChange = (dateValue) => {
    const date = new Date(dateValue).getTime()
    let currentValue
    Object.entries(data).forEach(([key, value]) => {
      currentValue = {
        ...currentValue,
        [key]: value.filter(v => v[0] === date)
      }
    })    
    setValue(currentValue)
  }

  // const wallet = {
  //   id:"BTC",
  //   name: "bitcoin",
  //   count: 2,
  // };

  
  
  const [coinValue, setCoinValue] = useState({})
  const [total, setTotal] = useState()
  useEffect(() => {
    const count = {
      btc: 2,
      eth: 3,
      maker: 5,
      monero: 7,
      ltc: 14,

    }
    if(Object.keys(value).length){
      let coinsValues = {}
      Object.entries(value).forEach(([key, value]) => {
        coinsValues = {...coinsValues, [key]: value[0][1] * count[key]}
      })
      setCoinValue(coinsValues)
      console.log( coinsValues);
      let sum = 0;
      for (let key in coinsValues) {
      setTotal(sum += coinsValues[key]);
}
    } 


  }, [value])
  
  

  return (
  <>
  <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
  <div className='box'>
  {
    loading ? <p style={{position: "absolute", top: 0, left: 0, bottom: 0, right: 0, backgroundColor: "rgba(0,0,0,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px"}}>Loading ...</p> :
    <>
      <input type="date" onChange={(e) => handleChange(e.target.value)}/>
      {Object.keys(coinValue).length ? Object.entries(coinValue).map(([key, value], index) => (
        <div key={key + index}>
          <span style={{textTransform: "capitalize"}}>{key}: &nbsp; &nbsp; &nbsp;</span>
          <span>{value.toFixed(2) }$</span>
        </div>
      )) : null}
    </>
   
  }
  <div>
    <p> Total: {total} $</p>
  </div>
  </div>

  </>
  );
}

export default Charter;

