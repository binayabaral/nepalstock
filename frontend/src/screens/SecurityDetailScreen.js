import axios from 'axios';
import React, { useEffect, useState } from 'react';

import SecurityPriceHistoryChart from '../components/SecurityPriceHistoryChart';

const SecurityDetailScreen = ({ match }) => {
  const getFormattedDate = date => {
    const dateObj = new Date(date);
    return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })}-${dateObj.getDate().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })}`;
  };

  const [startDate, setStartDate] = useState(getFormattedDate(new Date().setDate(new Date().getDate() - 364)));
  const [endDate, setEndDate] = useState(getFormattedDate(new Date()));
  const [prices, setPrices] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stockName, setStockName] = useState('');
  const [companyData, setCompanyData] = useState();

  const simplifyData = data => {
    let simplifiedData = { prices: [], labels: [], transactions: [] };
    data.forEach(element => {
      simplifiedData.prices.push(element.ClosingPrice);
      simplifiedData.labels.push(element.Date);
    });
    return simplifiedData;
  };

  useEffect(() => {
    const getStockDetails = async () => {
      setLoading(true);
      const { data } = await axios.post('https://api.sheezh.com/nepse/v1/history', {
        symbol: match.params.symbol,
        start_date: startDate,
        end_date: endDate
      });

      const simplifiedData = simplifyData(data);
      setPrices(simplifiedData.prices);
      setLabels(simplifiedData.labels);
      setLoading(false);
    };
    getStockDetails();
  }, [match, startDate, endDate]);

  useEffect(() => {
    const getCompanyInfo = async () => {
      const { data: companyData } = await axios.post('https://api.sheezh.com/nepse/v1/company', {
        symbol: match.params.symbol
      });
      setCompanyData(companyData[0]);
      setStockName(companyData[0].companyName);
    };
    getCompanyInfo();
  }, [match]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Price',
        data: prices,
        fill: true,
        borderColor: '#01bf71',
        pointRadius: '0',
        lineTension: '0'
      }
    ]
  };

  const changeDuration = event => {
    const startDateObj = new Date();
    setEndDate(getFormattedDate(startDateObj));

    const endDateObj = new Date();
    endDateObj.setDate(new Date().getDate() - Number(event.target.value));
    setStartDate(getFormattedDate(endDateObj));
  };

  return (
    <>
      <section className="security-details">
        <div className="container">
          <h1>Details for {stockName ? stockName : match.params.symbol}</h1>
          <select name="time-select" id="time-select" onChange={changeDuration}>
            <option value="364" defaultValue>
              1 year
            </option>
            <option value="180">6 months</option>
            <option value="90">3 months</option>
            <option value="30">1 month</option>
          </select>
          <div className="security-details__chart-wrapper">
            {loading ? (
              <div className="loader"></div>
            ) : (
              <SecurityPriceHistoryChart
                data={data}
                startDate={startDate}
                endDate={endDate}
                security={match.params.symbol}
              />
            )}
          </div>
        </div>
      </section>
      {companyData && (
        <section className="security-details-info">
          <div className="container">
            <h4>Additional Information on {stockName ? stockName : match.params.symbol}</h4>
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <tr>
                    <td className="table-heading">Company Email</td>
                    <td>
                      {companyData.companyEmail && (
                        <a href={`mailto:${companyData.companyEmail}`}>{companyData.companyEmail}</a>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-heading">Company Name</td>
                    <td>{companyData.companyName && companyData.companyName}</td>
                  </tr>
                  <tr>
                    <td className="table-heading">Instrument Type</td>
                    <td>{companyData.instrumentType && companyData.instrumentType}</td>
                  </tr>
                  <tr>
                    <td className="table-heading">Regulatory Body</td>
                    <td>{companyData.regulatoryBody && companyData.regulatoryBody}</td>
                  </tr>
                  <tr>
                    <td className="table-heading">Sector Name</td>
                    <td>{companyData.sectorName && companyData.sectorName}</td>
                  </tr>
                  <tr>
                    <td className="table-heading">Security Name</td>
                    <td>{companyData.securityName && companyData.securityName}</td>
                  </tr>
                  <tr>
                    <td className="table-heading">Status</td>
                    <td>{companyData.status && companyData.status}</td>
                  </tr>
                  <tr>
                    <td className="table-heading">Symbol</td>
                    <td>{companyData.symbol && companyData.symbol}</td>
                  </tr>
                  <tr>
                    <td className="table-heading">Website</td>
                    <td>
                      {companyData.website && (
                        <a href={companyData.website} target="__blank">
                          {companyData.website}
                        </a>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SecurityDetailScreen;
