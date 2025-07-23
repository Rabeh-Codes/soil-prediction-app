// src/pages/GraphingPage.tsx

import { useState } from 'react';

const GraphingPage = () => {
  const [visualization, setVisualization] = useState('');
  const [community, setCommunity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [parameter, setParameter] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can handle the form submission here (e.g. call API)
    console.log({ visualization, community, latitude, longitude, startDate, endDate, parameter });
  };

  return (
    <div className="p-6 text-white bg-[#1e1e2f] min-h-screen overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-2">Graphing</h1>
      <p className="text-sm text-gray-300 mb-6 max-w-3xl">
        The Graphing tool provides single point location-based visualizations of solar-radiation or meteorology 
        from POWER project’s datastore. Providing capabilities to explore and assess data products.
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        
        <div>
          <label className="block mb-1 text-sm">Visualization Name</label>
          <select
            value={visualization}
            onChange={(e) => setVisualization(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
          >
            <option value="">Select a Visualization</option>
            <option value="solar">Solar Radiation</option>
            <option value="temperature">Temperature</option>
            <option value="wind">Wind Speed</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm">User Community</label>
          <select
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
          >
            <option value="">Select Community</option>
            <option value="agriculture">Agriculture</option>
            <option value="education">Education</option>
            <option value="energy">Energy</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm">Latitude</label>
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Enter or click on map"
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Longitude</label>
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Enter or click on map"
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-sm">Parameter</label>
          <select
            value={parameter}
            onChange={(e) => setParameter(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
          >
            <option value="">Select Parameter</option>
            <option value="precipitation">Precipitation</option>
            <option value="temperature-max">Max Temperature</option>
            <option value="temperature-min">Min Temperature</option>
          </select>
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default GraphingPage;
