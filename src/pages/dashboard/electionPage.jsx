import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'; // Slider package
import { Tabs, Tab, Box } from '@mui/material';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ghanaRegions from './ghanaRegionx'; // Update your file import as needed

const defaultParliamentaryCandidates = [
  { name: 'Doe', party: 'Independent', image: '/images/doe.jpg' },
  { name: 'Jane', party: 'CPP', image: '/images/jane.jpg' }
];

const presidentialCandidates = [
  { name: 'Bawumia', party: 'NPP', image: './bawumia.jpeg' },
  { name: 'Mahama', party: 'NDC', image: './mahama.jpeg' }
];

const ElectionPage = () => {
  const [region, setRegion] = useState('');
  const [constituency, setConstituency] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [parliamentaryCandidates, setParliamentaryCandidates] = useState(defaultParliamentaryCandidates);
  const [selectedConstituency, setSelectedConstituency] = useState([]);

  useEffect(() => {
    if (region) {
      const selectedRegion = ghanaRegions.find((r) => r.region === region);
      setSelectedConstituency(selectedRegion?.constituencies || []);
    } else {
      setSelectedConstituency([]);
    }
  }, [region]);

  useEffect(() => {
    if (constituency) {
      // Example: Fetch or update parliamentary candidates based on region & constituency
      const candidates = [
        { name: 'John', party: 'NPP', image: '/images/john.jpg' },
        { name: 'Mary', party: 'NDC', image: '/images/mary.jpg' }
      ];
      setParliamentaryCandidates(candidates);
    } else {
      setParliamentaryCandidates(defaultParliamentaryCandidates);
    }
  }, [constituency]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: <LeftOutlined />,
    nextArrow: <RightOutlined />
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="w-full max-w-7xl mx-auto py-10 px-4">
        {/* Tabs for Election Types */}
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} className="py-3">
          <Tab label="Presidential" />
          <Tab label="Parliamentary" />
          <button className="ml-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">+</button>
        </Tabs>

        {/* Dropdowns for Region and Constituency */}
        <div className="flex space-x-4 my-4">
          <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full px-3 py-2 border rounded-md">
            <option value="">Select Region</option>
            {ghanaRegions.map((r) => (
              <option key={r.region} value={r.region}>
                {r.region}
              </option>
            ))}
          </select>

          <select value={constituency} onChange={(e) => setConstituency(e.target.value)} className="w-full px-3 py-2 border rounded-md">
            <option value="">Select Constituency</option>
            {selectedConstituency.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Candidate Carousel */}
        <div className="my-6">
          <Slider {...sliderSettings}>
            {(activeTab === 0 ? presidentialCandidates : parliamentaryCandidates).map((candidate, index) => (
              <div key={index} className="p-4">
                <div className="p-4 rounded-md shadow-md text-center">
                  <img src={candidate.image} alt={candidate.name} className="w-40 h-40 mx-auto rounded-full object-cover" />
                  <div className="text-lg font-semibold mt-2">{candidate.name}</div>
                  <div className="text-sm text-gray-600">{candidate.party}</div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* View/Edit Buttons */}
        <div className="flex space-x-4">
          <button className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">View/Edit Polling Stations</button>
          <button className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">View/Edit Polling Station Agents</button>
        </div>

        {/* Polling Stations / Agents Tables */}
        <div className="mt-6">
          {activeTab === 0 ? (
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">Polling Stations</h2>
              {/* Polling stations table goes here */}
            </div>
          ) : (
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">Polling Station Agents</h2>
              {/* Polling station agents table goes here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectionPage;
