import { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts/highstock";
import Barchart from "highcharts-react-official";

function BarVis() {
  const [movies, setMovies] = useState([]);

  const config = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Historic World Population by Region",
    },
    subtitle: {
      text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>',
    },
    xAxis: {
      categories: formattedMovieCatData,
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Population (millions)",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " millions",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Year 1800",
        data: [107, 31, 635, 203, 2],
      },
      {
        name: "Year 1900",
        data: [133, 156, 947, 408, 6],
      },
      {
        name: "Year 2000",
        data: [814, 841, 3714, 727, 31],
      },
      {
        name: "Year 2016",
        data: [1216, 1001, 4436, 738, 40],
      },
    ],
  };

  useEffect(async function () {
    var data = await axios.get("http://localhost:8080/movies");
    var formattedMovieData = data.data.map(function (movie) {
      return movie.name;
    });

    var formattedMovieData = data.data.map(function (movie) {
      return movie.favouriteMovie;
    });
    setMovieCats(formattedMovieCatData);
    setMovies(formattedMovieData);
  });

  return (
    <div>
      <Barchart highcharts={Highcharts} options={config} />
    </div>
  );
}

export default BarVis;
