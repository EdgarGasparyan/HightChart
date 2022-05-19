import './App.css';
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official"

const App = () => {
  const [data, setData] = useState({})
  const [initialstate, setInitialstate] = useState({})
  const [interval, setInterval] = useState(1)

  const getData = async () => {
    const btc = await axios(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${interval}`); 
    const eth = await axios(`https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=${interval}`);
    const maker = await axios(`https://api.coingecko.com/api/v3/coins/maker/market_chart?vs_currency=usd&days=${interval}`);
    const monero = await axios(`https://api.coingecko.com/api/v3/coins/monero/market_chart?vs_currency=usd&days=${interval}`);
    const litecoin = await axios(`https://api.coingecko.com/api/v3/coins/litecoin/market_chart?vs_currency=usd&days=${interval}`);
    return {
        btc: btc.data.prices,
        eth: eth.data.prices,
        maker: maker.data.prices,
        monero: monero.data.prices,
        ltc: litecoin.data.prices,
      }
  }

  useEffect(() => {
    getData().then((res) => {
      setData(res)
    })
  }, [interval]) 
  
  // useEffect(() => {
    
  // },[interval])

//   const handlerGetTotal = (data, wallet) => {
//     const total = Object.entries(data).map(([key, value]) => value.map((v) => v[1] * wallet[key]))
//     console.log(total, "5555555555555555555555555");
//   }

// useEffect(() => {
//   if(Object.keys(data).length){
//     handlerGetTotal(data, wallet)
//   }
// }, [data])

const wallet = {
  btc: 0.5,
  eth: 1.3,
  maker: 5.7,
  monero: 3.8,
  ltc: 8.9,
}
  
  
const btca = data?.btc?.map(price => {
  return price[1] * wallet.btc 
});
const etha = data?.eth?.map(price => {
  return price[1] * wallet.eth 
});
const makera = data?.maker?.map(price => {
  return price[1] * wallet.maker 
});
const moneroa = data?.monero?.map(price => {
  return price[1]* wallet.monero 
})
const ltca = data?.litecoin?.map(price => {
  return price[1] * wallet.ltc 
})
const arr = [];

const btcarray = btca?.reverse()
const etharray = etha?.reverse()
const makerarray = makera?.reverse()
const moneroarray = moneroa?.reverse()
const ltcarray = ltca?.reverse()


for(let i=0;i<data?.btc?.length;i++){
  arr[i]=(btcarray?.[i]?? 0) + (makerarray?.[i] ?? 0) + (moneroarray?.[i] ?? 0) + (ltcarray?.[i] ?? 0) + (etharray?.[i] ?? 0)
}


const datatime = data?.btc?.map(time => {
  return time[0]
})
const arr1 = arr.reverse()

const Total=[]
for(let i = 0 ; i < arr1.length; i++){
Total[i]=new Array(datatime[i],arr1[i])
}
useEffect(() => {
setInitialstate(Total)
},[data]);

// const fff = new Date().getTime() / 1000
// const bbbb=new Array()
// bbbb.push(Math.floor(fff))
// for(let i=1;i<365;i++){
//   bbbb.push((fff-86400*i))
// }
// console.log(bbbb)
// for(let i = 0 ; i < arr.length-1; i++){
//   Total[i]=new Array(bbbb[i],arr[i])
// }

// // fff.moment().unix()
// // console.log(Math.floor(fff)-604800);
// console.log(Total);
// const handlerGetTotal = (coin, amount) => {
// }
useEffect(() => {
setInitialstate(Total)
},[data] )


const handleClick =(day) => { 
  switch(day){
    case 'max': if(interval == "max" );
    break;
    case 1: if(day > interval){ setInterval(1)} console.log("1");;
    break;
    case 7: if(day > interval){ setInterval(7)}console.log("7");
    break;
    case 14: if(day > interval){ setInterval(14)} console.log("14");
    break;
    case 30: if(day > interval){ setInterval(30)};
    break;
    case 200: if(day > interval){ setInterval(200)};
    break;
    case 365: if(day > interval){ setInterval(365)};
    break;
  }
}

useEffect(() => {
localStorage.setItem('key',JSON.stringify(Total));
},[data]

)
const options = {
  // chart: {
  //   events: {
  //     load() {
  //       this.showLoading();
  //       setTimeout(this.hideLoading.bind(this), 5000)  
  //     }
  //   }
  // },
  title: {
    text: "CoinGecko APP"
  },
  Date: {
    date: 'datatime'
  },
  series: [
    { 
      name:"Total",
      data:  Total ? Total : initialstate,
      color: 'red',
  },
  ],
  navigator: {
    enabled: false,
    
  },
  rangeSelector: {
    selected: true,
    allButtonsEnabled: true, 
    buttons: [{
      type: 'day',
      count:1,
      text: '1d',
      events: {
        click: () => {
          // setInterval(1)
          console.log('1');
        }         
      }
    }, 
    {
      type: 'day',
      count: 7,
      text: '7d',
      events: {
        click: () => handleClick(7)
      }
    }, 
    {
      type: 'day',
      count: 14,
      text: '14d',
      events: {
        click: () => handleClick(14)
        
      }
    },
    {
      type: 'day',
      count: 30,
      text: '30d',
      events: {
        click: () => handleClick(30)
      }
    },
    {
      type: 'day',
      count: 200,
      text: '200d',
      events: {
        click: () => handleClick(200)        
      
    }
    },
    {
      type: 'year',
      count: 1,
      text: '1y',
      events: {
        click: () => handleClick(365)
        
        }
    },  
    {
      type: 'max',
      text: 'Max',
      events: {
        click: () => setInterval('max')
        
      }
    }, 
  
  ]
}
}


return (
  <> 
  <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart" }
      options={options}     
  />


  </>
  );
}

export default App;