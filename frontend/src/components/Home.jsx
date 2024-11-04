import React from "react";
import SensorData from "./SensorData";
import '../styles/Home.css';
import { useState,useEffect } from "react";
import Plot from 'react-plotly.js';


function Home(){

    const [sensorData, setSensorData] = useState([]);
    const [prevSensorData, setPrevSensorData] = useState([]);

    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                const response = await fetch('http://localhost:3005/api/sensor');
                const data = await response.json();

                if (JSON.stringify(data) !== JSON.stringify(prevSensorData)) {
                    setSensorData(data);
                    setPrevSensorData(data);
                }
            } catch (error) {
                console.error("Error fetching sensor data:", error);
            }
        };

        const intervalId = setInterval(() => {
            fetchSensorData();
        }, 5000);
        return () => clearInterval(intervalId);
    }, [prevSensorData]);

    // useEffect(() => {
    //     const fetchSensorData = async () => {
    //         try {
    //             const response = await fetch('http://localhost:3005/api/sensor'); // Adjust the API endpoint as needed
    //             const data = await response.json();
    //             setSensorData(data);
    //         } catch (error) {
    //             console.error("Error fetching sensor data:", error);
    //         }
    //     };
    //     fetchSensorData();

    //     const intervalId = setInterval(() => {
    //         fetchSensorData();
    //     }, 5000);

    //     // Clean up the interval on component unmount
    //     return () => clearInterval(intervalId);
    // }, []);

    const timeData = sensorData.slice(0, 10).map(sensor => sensor.time);
    const temperatureData=sensorData.slice(0,10).map(sensor => sensor.temperature);
    const humidityData=sensorData.slice(0,10).map(sensor => sensor.humidity);


    return(
        <div className="containerg home">
            <div className="data"><SensorData/></div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 flex">
                <div className="card">
                <h4 className="title">Temperature Trend</h4>
                {sensorData.length > 0 ? (
                <Plot
                className="overflow-hidden w-full h-[350px] flex-auto"
                data={[
                    {
                    x: timeData,
                    y: temperatureData,
                    type: "scatter",
                    mode: "lines+markers",
                    marker: { color: "red" },
                    },
                ]}
                config={{
                    responsive: true,
                    displaylogo: false,
                    modeBarButtonsToRemove: [
                    "zoom2d",
                    "pan2d",
                    "select2d",
                    "lasso2d",
                    "zoomIn2d",
                    "zoomOut2d",
                    "autoScale2d",
                    "resetScale2d",
                    "hoverClosestCartesian",
                    "hoverCompareCartesian",
                    "toggleSpikelines",
                    ],
                }}
                layout={{
                    title: { text: "Temperature" },
                    xaxis: {
                    title: "Time",
                    showline:true,
                    showgrid: false,
                    showticklabels: true,
                    },
                    yaxis: { title: "Value in C", showline: true },
                    margin: { t: 50, b: 40, l: 50, r: 20 },
                    autosize: true,
                    showlegend: false,
                    dragmode: false,
                    hovermode: "closest",
                    plot_bgcolor: "white",
                    paper_bgcolor: "white",
                }}
                />
                ) : (
                        <p className="text-gray-100">No data available</p> // Optional message when no data
                )}
                </div>
            <div className="card">
            <h4>Humidity Trend</h4>
            <Plot
              className="overflow-hidden w-full h-[350px] flex-auto"
              data={[
                  {
                      x: timeData,
                      y: humidityData,
                      type: "scatter",
                      mode: "lines",
                      marker: { color: "#19a7ce" },
                    },
                ]}
                config={{
                    responsive: true,
                    displaylogo: false,
                    modeBarButtonsToRemove: [
                        "zoom2d",
                        "pan2d",
                        "select2d",
                        "lasso2d",
                        "zoomIn2d",
                        "zoomOut2d",
                        "autoScale2d",
                        "resetScale2d",
                        "hoverClosestCartesian",
                        "hoverCompareCartesian",
                        "toggleSpikelines",
                    ],
                }}
                layout={{
                    title: { text: "Humidity" },
                    xaxis: {
                        title: "Time",
                        showgrid: false,
                        showticklabels: true,
                    },
                    yaxis: { title: "Value in %", showline: false },
                    margin: { t: 50, b: 40, l: 50, r: 20 },
                    autosize: true,
                    showlegend: false,
                    dragmode: false,
                    hovermode: "closest",
                    plot_bgcolor: "white",
                    paper_bgcolor: "white",
                }}
                />
            </div>
        </div>
    </div>
    );
}

export default Home;