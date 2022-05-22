import axios from 'axios';
import React, { useState, useEffect } from 'react';

import DataTable, { createTheme } from 'react-data-table-component';

const AllStocksScreen = ({ history }) => {
  const [allStocksPrices, setAllStockPrices] = useState([]);
  const [filteredStocksPrices, setFilteredStockPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  const dataTableColumns = [
    { name: 'Symbol', selector: 'StockSymbol', sortable: true },
    // { name: 'Name', selector: 'securityName', sortable: true, grow: 4 },
    { name: 'High Price', selector: 'MaxPrice', sortable: true },
    { name: 'Low Price', selector: 'MinPrice', sortable: true },
    { name: 'Closing Price', selector: 'ClosingPrice', sortable: true },
    { name: 'Previous Closing Value', selector: 'PreviousClosing', sortable: true },
    { name: 'Difference', selector: 'Difference', sortable: true },
    { name: 'Percent Difference', selector: 'PercentDifference', sortable: true }
  ];

  createTheme('solarized', {
    text: {
      primary: '#000000',
      secondary: '#000000'
    },
    background: {
      default: '#eff7f7'
    },
    divider: {
      default: 'transparent'
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)'
    }
  });

  const customStyles = {
    rows: {
      style: {
        fontSize: 'inherit'
      }
    },
    headCells: {
      style: {
        fontSize: 'inherit',
        background: '#dff7eb',
        color: '#01bf71',
        minHeight: '80px'
      }
    }
  };

  const conditionalRowStyles = [
    {
      when: row => row.ClosingPrice < row.PreviousClosing,
      style: {
        backgroundColor: '#ffcccb',
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: '#fe9f9d'
        }
      }
    },
    {
      when: row => row.ClosingPrice > row.PreviousClosing,
      style: {
        backgroundColor: '#70dbaf',
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: '#33cc8d'
        }
      }
    },
    {
      when: row => row.ClosingPrice === row.PreviousClosing,
      style: {
        backgroundColor: '#eff7f7',
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: '#bedede'
        }
      }
    }
  ];

  const formatData = stockPrices => {
    stockPrices.forEach(stock => {
      stock.Difference = parseFloat(stock.ClosingPrice - stock.PreviousClosing).toFixed(2);
      stock.PercentDifference = parseFloat((stock.Difference / stock.PreviousClosing) * 100).toFixed(2);
    });
    return stockPrices;
  };

  useEffect(() => {
    const getRates = async () => {
      const url = 'https://api.sheezh.com/nepse/v1/live';
      const { data } = await axios.get(url);
      const formattedData = formatData(data.live);
      setAllStockPrices(formattedData);
      setFilteredStockPrices(formattedData);
      setLoading(false);
    };
    getRates();
    // eslint-disable-next-line
  }, []);

  const filterInputs = e => {
    const filtered = allStocksPrices.filter(element =>
      element.StockSymbol.toUpperCase().includes(e.target.value.toUpperCase())
    );
    setFilteredStockPrices(filtered);
  };

  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <section className="all-stock-prices">
          <div className="container">
            <h1>Current Stock Prices</h1>
            <div className="search-input-wrapper">
              <span>Search by Symbol:</span>
              <input type="text" onChange={filterInputs} />
            </div>
            <DataTable
              columns={dataTableColumns}
              data={filteredStocksPrices}
              striped="true"
              pagination="true"
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 20, 30, 40, 50, 300]}
              theme="solarized"
              customStyles={customStyles}
              conditionalRowStyles={conditionalRowStyles}
              onRowClicked={row => history.push(`/all-stocks/company/${row.StockSymbol}`)}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default AllStocksScreen;
