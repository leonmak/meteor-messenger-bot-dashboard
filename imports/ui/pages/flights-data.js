import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import DocumentsList from '../containers/documents-list.js';
import BarChart from "../containers/bar-chart.js";
import SentimentChart from "../containers/sentiment-chart.js";
import Feedbacks from "../containers/feedback-table.js";
import { AddDocument } from '../components/add-document.js';
import {Chart} from 'react-google-charts'
import moment from 'moment';

var LineChart = require("react-chartjs").Line;
var chartData =  {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
        }
    ]
};

var chartOptions = {
  options: {
    responsive: false
  }
};


export const FlightsData = props => {

  const getTime = () => `${moment().format('MMMM Do YYYY, h a')} to ${moment().add(1,'d').format('MMMM Do YYYY, h a')}`

  return (
    <div>
    <h2 className="text-center page-header">Active Flights from {getTime()}</h2>
    <SentimentChart />
    </div>
  )
}

