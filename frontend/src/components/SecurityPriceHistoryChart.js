import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const CurrencyChart = props => {
  const dataFormat = {
    labels: [],
    datasets: []
  };
  const [data, setData] = useState(dataFormat);

  const options = {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: `Prices from ${props.startDate && props.startDate} to ${props.endDate && props.endDate} for ${
        props.security && props.security
      }`,
      position: 'bottom'
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            fontSize: 20,
            labelString: 'Price in NPR'
          },
          ticks: {
            beginAtZero: false
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }
        }
      ]
    },
    responsive: true
  };

  const getChartData = canvas => {
    var ctx = canvas.getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#dff7eb');
    gradient.addColorStop(1, '#ffffff');
    for (var i = 0; i < data.datasets.length; i++) {
      data.datasets[i].backgroundColor = gradient;
    }
    return data;
  };

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <div className="currency-chart-wrapper">
      {data.datasets.length && <Line data={getChartData} options={options} />}
    </div>
  );
};

export default CurrencyChart;
