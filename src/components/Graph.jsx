import React, { useRef, useEffect, useState } from "react";
import Chartjs from "chart.js";
import { historyOptions } from "../chartConfigs/chartConfigs";
import coinGecko from "../apis/coinGecko";
import dropdownImg from '../Images/greenDropdown.png';
import istGraph from '../Images/istGraph.png';
import secGraph from '../Images/sndGraph.png';


//css
import './css/graph.css'
import axios from "axios";
const HistoryChart = ({ data }) => {
  const chartRef = useRef();
  const chartRef2 = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [timeFormat, setTimeFormat] = useState("24h");
  const [coinData, setCoinData] = useState({});
  const [detail, setDetail] = useState('');
  const [WhichGraphState, setWhichGraphState] = useState('first');

  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(2),
      };
    });
  };


  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
        return coinData.day;
      case "7d":
        return coinData.week;
      case "1m":
        return coinData.month;
      case "1y":
        return coinData.year;
      default:
        return coinData.day;
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [day, week, month, year, detail] = await Promise.all([
        coinGecko.get(`/coins/bitcoin/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "1",
          },
        }),
        coinGecko.get(`/coins/bitcoin/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "7",
          },
        }),
        coinGecko.get(`/coins/bitcoin/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "30",
          },
        }),
        coinGecko.get(`/coins/bitcoin/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "365",
          },
        }),
        axios.get("https://api.coingecko.com/api/v3/coins/markets/", {
          params: {
            vs_currency: "usd",
            ids: 'bitcoin',
          },
        }),
      ]);
      // console.log(day);

      setCoinData({
        day: formatData(day.data.prices),
        week: formatData(week.data.prices),
        month: formatData(month.data.prices),
        year: formatData(year.data.prices),
        detail: detail.data[0],
      });
      setIsLoading(false);
    };

    fetchData();
  }, []);


  useEffect(() => {

    // FIRST CHART GRAPH
    // if (chartRef && chartRef.current && coinData.detail) {
    if (chartRef && chartRef.current) {
      const chartInstance = new Chartjs(chartRef.current, {
        type: "line",
        data: {
          datasets: [
            {
              labels: ["Red"],
              label: 'bitocin',
              data: determineTimeFormat(),
              color: "#00ff00",
              backgroundColor: [
                // 'rgba(255, 99, 132, 0.2)',
                // 'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: "#00FF00",
              pointBorderColor: 'yellow',
              pointRadius: 0,
              fill: true,
              tension: 0.1,
              borderCapStyle: "butt"
            },
          ],
        },
        options: {
          legend: {
            display: false
          },
          ...historyOptions,
          font: '25',
          color: '#fff',
          defaultColor: 'white'
        },
      });
    }

    // FIRST CHART GRAPH

    if (chartRef2 && chartRef2.current) {
      const chartInstance = new Chartjs(chartRef2.current, {
        type: "bar",
        data: {
          datasets: [
            {
              labels: ["Red"],
              label: 'bitocin',
              data: determineTimeFormat(),
              color: "#00ff00",
              backgroundColor: [
                // 'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: "#00FF00",
              pointBorderColor: 'yellow',
              pointRadius: 0,
              fill: true,
              tension: 0.1,
              borderCapStyle: "butt"
            },
          ],
        },
        options: {
          legend: {
            display: false
          },
          ...historyOptions,
          font: '25',
          color: '#fff',
          defaultColor: 'white'
        },
      });
    }
  });

  const renderPrice = () => {
    if (coinData.detail) {
      return (
        <>
          <p className="my-0">${coinData.detail.current_price.toFixed(2)}</p>
          <p
            className={
              coinData.detail.price_change_24h < 0
                ? "text-danger my-0"
                : "text-success my-0"
            }
          >
            {/* heloosssssssss */}
            {coinData.detail.price_change_percentage_24h.toFixed(2)}%
          </p>
        </>
      );
    }
  };
  let internationalNumberFormat = new Intl.NumberFormat('en-US')

  let currentPrice
  // console.log('coinData.detail', coinData.detail);
  if (coinData.detail) {
    currentPrice = internationalNumberFormat.format(coinData.detail.current_price.toFixed(2))
  }
  else {
    currentPrice = 'undefined'
  }

  let priceChangePercentage24
  if (coinData.detail) {
    priceChangePercentage24 = <span
      className={
        coinData.detail.price_change_24h < 0
          ? "text-danger my-0"
          : "text-success my-0"
      }
    >
      {coinData.detail.price_change_percentage_24h.toFixed(2)}%
    </span>
  }
  else {
    priceChangePercentage24 = 'undefined'
  }

  let hourVolume24
  if (coinData.detail) {
    hourVolume24 = internationalNumberFormat.format(coinData.detail.total_volume)
  }
  else {
    hourVolume24 = 'undefined'
  }

  let marketCap
  if (coinData.detail) {
    marketCap = internationalNumberFormat.format(coinData.detail.market_cap)
  }
  else {
    marketCap = 'undefined'
  }

  let whichGraph
  if (WhichGraphState === 'first') {
    whichGraph = chartRef
  } else if (WhichGraphState === 'second') {
      whichGraph = chartRef2      
  }

  return (
    <>
      <div className='bottomHeader'>
        <div className='row'>
          <div className="col-6">
            <div className="row" style={{ fontSize: '13px' }}>
              <div className="col-3">
                <img className='bottomHeaderLogo' src="https://fairtrader.io/wp-content/uploads/2021/08/cropped-favicon-192x192.png" width='30px' alt="" /></div>
              <div className="col-3">
                <p>
                  <span className='bottomHeaderTxt marginLeft' style={{ color: '#1dccff' }}>
                    {/* <b>bFTP</b> */}
                    <b>Bitcoin</b>
                  </span>
                  <br />
                  <b className='bottomHeaderTxt marginLeft'>${currentPrice}</b>
                </p>
              </div>
              <div className="col-3">
                <p className='bottomheaderDrop marginLeftt'>
                  <img src={dropdownImg} alt="dropdownImg" />
                  <br />
                  <b className='bottomHeaderTxt'>{priceChangePercentage24}</b>
                </p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className='row' style={{ fontSize: '13px' }}>
              <div className="col-6"><p style={{ float: 'right' }}>
                <span className='colorBlueBold bottomHeaderTxt fontTwelveHeading'>24hr<span style={{ color: 'black' }}>_</span>Volume</span>
                <br />
                <span>
                  <b className='bottomHeaderTxt fontTwelve'>${hourVolume24}</b>
                </span>
              </p>
              </div>
              <div className="col-6"><p style={{ float: 'right' }}><span className='colorBlueBold bottomHeaderTxt fontTwelveHeading'>Marketcap</span> <br /><span>
                <b className='bottomHeaderTxt fontTwelve'>${marketCap}</b></span></p></div>
            </div>
          </div>
        </div>
        <p className="text-right" style={{ color: '#18C7C7', fontSize: '14px', fontWeight: 'bold', marginRight: '30px', zIndex: '9999' }}>
          Select Period: <span style={{ color: 'black' }}><span className="graphFormats">__</span></span>
          <span className="graphFormats" onClick={() => setTimeFormat("24h")} style={{ cursor: 'pointer' }}>1D<span style={{ color: 'black' }} >__</span></span>
          <span className="graphFormats" onClick={() => setTimeFormat("7d")} style={{ cursor: 'pointer' }}>7D<span style={{ color: 'black' }} >__</span></span>
          <span className="graphFormats" onClick={() => setTimeFormat("1m")} style={{ cursor: 'pointer' }}>1M<span style={{ color: 'black' }} >__</span></span>
          <span className="graphFormats" onClick={() => setTimeFormat("1y")} style={{ cursor: 'pointer' }}>1Y<span style={{ color: 'black' }} >___</span></span>
          <span><img onClick={() => setWhichGraphState("first")} src={istGraph} /></span><span style={{ color: 'black' }}><span className="graphFormats">_</span></span>
          <span><img onClick={() => setWhichGraphState("second")} src={secGraph} /></span>
        </p>
      </div>
      <div className='graph'>
        <div style={{ color: 'white !important' }}>

        <canvas ref={whichGraph} id="myChart"></canvas>
        </div>

      </div>
    </>


  );
};

export default HistoryChart;
