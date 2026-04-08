import React, { useEffect, useState, useMemo, useContext } from "react";
import { BsExclamationTriangle } from "react-icons/bs";
import { GoCheckCircle } from "react-icons/go";
import { GiConverseShoe } from "react-icons/gi";


import LiveChart from "../blocks/LiveChart";
import { DContext } from "../../context/Datacontext";
import { Loading } from "../blocks/Loading";
import { THINGSPEAK_URL } from "../../utils/thinkSpeak";




const CHART_CONFIG = [
  { key: "field1", label: "Distance", color: "red" },
  { key: "field2", label: "Toe", color: "blue" },
  { key: "field3", label: "Arch", color: "orange" },
  { key: "field4", label: "Heel", color: "violet" },
];

const CONTROLS = {
  show: true,
  download: true,
  zoomin: true,
  zoomout: true,
  pan: true,
  reset: true,
  zoomEnabled: true,
};

function Home() {
  const { BeURL } = useContext(DContext)
  const [feeds, setFeeds] = useState([]);
  const [latest, setLatest] = useState(null)



  const url = THINGSPEAK_URL;

  //Fetch Logic
  useEffect(() => {
    if (!url) return;

    let interval;

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();

        if (!json?.feeds?.length) return;

        setFeeds(json.feeds);
        setLatest(json.feeds.at(-1))

      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchData();
    interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, [url]);



  // Transform Data (Memoized)
  // const chartData = useMemo(() => {
  //   if (!feeds.length) return [];

  //   const xAxis = feeds.map((f) =>
  //     new Date(f.created_at).getTime()
  //   );

  //   return CHART_CONFIG.map(({ key, label, color }) => {
  //     const yAxis = feeds.map((f) => {
  //       const val = f[key];
  //       return val !== null && val !== undefined ? Number(val) : null;
  //     });

  //     return {
  //       "x-axis": xAxis,
  //       "y-axis": yAxis,
  //       color,
  //       seriesName: label,
  //     };
  //   });
  // }, [feeds]);


  // Transform Data (Memoized)
  const chartData = useMemo(() => {
    if (!feeds.length) return [];

    // 1. Create a shared X-Axis (timestamps)
    const xAxis = feeds.map((f) => new Date(f.created_at).getTime());

    // 2. Map through your config to create a series for each field
    return CHART_CONFIG.map(({ key, label, color }, index) => ({
      "x-axis": xAxis,
      "y-axis": feeds.map((f) => {
        // Split the "10,20,50" string into an array
        const values = f.field1 ? f.field1.split(",") : [];
        // Extract the value based on the index (0 for field1, 1 for field2, etc.)
        return Number(values[index]) || 0;
      }),
      color,
      seriesName: label,
    }));
  }, [feeds]);



  useEffect(() => {
    fetch(`${BeURL}/feed-values`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feeds })
    })
      .then(res => res.json())
      .then(data => {
        console.log("data", data)
      })
      .catch(err => {
        console.log("Error in feeds", err)
      })
  }, [feeds, BeURL])


  const separatedValues = latest?.field1
    ? latest.field1.split(",").map(val => val.trim())
    : [];

  const Distance = latest?.field1
  const Toe = latest?.field2
  const Arach = latest?.field3
  const Heel = latest?.field4
  const isWater = latest?.field5
  const Logntiturde = latest?.field6
  const Latntiturde = latest?.field7

  const metrics = [
    { label: "Toe", value: Toe, color: "bg-blue-500", icon: GiConverseShoe },
    { label: "Arch", value: Arach, color: "bg-green-500", icon: GiConverseShoe },
    { label: "Heel", value: Heel, color: "bg-orange-500", icon: GiConverseShoe },
    { label: "Distance", value: Distance, color: "bg-purple-500", icon: GiConverseShoe }
  ];

  // Loading State
  if (!chartData.length) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white p-6 max-w-7xl mx-auto">
      {/* Wind Direction Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg mb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Shoe Monitoring System</h2>
            <p className="text-gray-600">Real-time monitoring dashboard</p>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border-2 ${isWater && isWater === "0" ? 'bg-red-900/20 border-red-500/50 text-red-800' : 'bg-green-900/20 border-green-500/50 text-green-800'}`}>
            {isWater && isWater === "0" ? (
              <>
                <BsExclamationTriangle className="w-4 h-4 text-red-500 drop-shadow-lg" />
                Water Detected
              </>
            ) : (
              <>
                <GoCheckCircle className="w-4 h-4 text-green-500 drop-shadow-lg" />
                No Water Detected
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((item, index) => (
            <div
              key={index}
              className={`${item.color} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl"><item.icon /></div>
                <div className="text-sm opacity-80">{item.label}</div>
              </div>
              <p className="text-3xl font-bold mb-1">
                {item.value || "-"}
              </p>
              <p className="text-sm opacity-80">{item.unit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">System Analytics</h2>
          <a
            href={`https://www.google.com/maps?q=${Logntiturde},${Latntiturde}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
            Live Tracking
          </a>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {chartData.map((chart, index) => (
            <div key={index} className="transform hover:-translate-y-1 transition-all duration-300">
              <LiveChart
                data={[chart]}
                title={chart.seriesName}
                controls={CONTROLS}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;