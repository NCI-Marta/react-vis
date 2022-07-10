import { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";

function PieVis() {
  const [movies, setMovies] = useState([]);

  const config = {
    credits: {
      enabled: false,
    },
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Favorite Types of Movies",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
        data: movies,
      },
    ],
  };

  useEffect(() => {
    const Effect = async function () {
      //    {
      //        name: "Other",
      //        y: 2.61,
      //      }

      var data = await axios.get("http://localhost:8080/movies");
      var formattedData = data.data.map(function (movie) {
        return {
          name: movie.name,
          y: movie.favouriteMovie,
        };
      });
      setMovies(formattedData);
    };

    Effect();
  }, []);

  if (movies.length) {
    return (
      <div>
        <PieChart highcharts={Highcharts} options={config} />
      </div>
    );
  } else {
    return <div />;
  }
}

export default PieVis;
