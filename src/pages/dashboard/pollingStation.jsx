import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Papa from 'papaparse'; // CSV parsing library
import ghanaRegions from './ghanaRegionx'; // File with regions & constituencies

// Validation schema for the form
const PollingStationSchema = Yup.object().shape({
  name: Yup.string().required('Polling station name is required'),
  constituency: Yup.string().required('Constituency is required'),
  numberOfVoters: Yup.number().positive('Must be a positive number').required('Number of voters is required')
});

export default function PollingStation() {
  const [region, setRegion] = useState('');
  const [constituencyOptions, setConstituencyOptions] = useState([]);
  const [stations, setStations] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Update constituencies based on selected region
  useEffect(() => {
    if (region) {
      const selectedRegion = ghanaRegions.find((r) => r.region === region);
      setConstituencyOptions(selectedRegion?.constituencies || []);
    } else {
      setConstituencyOptions([]);
    }
  }, [region]);

  // Handle CSV upload and parsing
  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setStations([...stations, ...results.data]);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        }
      });
    }
  };

  // Handle form submission
  const handleSubmit = (values, { resetForm }) => {
    setStations([...stations, values]);
    resetForm();
    setFormVisible(false);
  };

  // Search functionality
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = stations.filter((station) => station.name.toLowerCase().includes(query));
    setStations(filtered);
  };

  // Pagination logic
  const paginatedStations = stations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(stations.length / itemsPerPage);

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="w-full max-w-7xl mx-auto py-10 px-4">
        <div className="flex justify-start items-center mb-4 gap-8">
          <button className="bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600" onClick={() => setFormVisible(!isFormVisible)}>
            Add Single Polling Station
          </button>

          <input
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            className="bg-green-500 text-white px-4 py-3 rounded-md hover:bg-green-600"
          />
        </div>

        {/* Main content: Flex container */}
        <div className="flex gap-6">
          {/* Sidebar Form (Visible on Add Button Click) */}
          {isFormVisible && (
            <div className="w-1/3 bg-gray-50 p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">Add Polling Station</h2>
              <Formik
                initialValues={{ name: '', constituency: '', numberOfVoters: '' }}
                validationSchema={PollingStationSchema}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block mb-1">
                        Polling Station Name
                      </label>
                      <Field name="name" type="text" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-300" />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div>
                      <label htmlFor="region" className="block mb-1">
                        Region
                      </label>
                      <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full px-3 py-2 border rounded-md">
                        <option value="">Select Region</option>
                        {ghanaRegions.map((r) => (
                          <option key={r.region} value={r.region}>
                            {r.region}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="constituency" className="block mb-1">
                        Constituency
                      </label>
                      <Field as="select" name="constituency" className="w-full px-3 py-2 border rounded-md">
                        <option value="">Select Constituency</option>
                        {constituencyOptions.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="constituency" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div>
                      <label htmlFor="numberOfVoters" className="block mb-1">
                        Number of Voters
                      </label>
                      <Field
                        name="numberOfVoters"
                        type="number"
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                      />
                      <ErrorMessage name="numberOfVoters" component="div" className="text-red-500 text-sm" />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormVisible(false)}
                      className="w-full mt-2 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          )}

          {/* Table Section */}
          <div className={`flex-grow overflow-x-auto`}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search polling stations"
                onChange={handleSearch}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Constituency</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">No.(#) of Voters</th>
                </tr>
              </thead>
              <tbody>
                {paginatedStations.map((station, index) => (
                  <tr key={index} className={index % 2 === 0 ? '' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-2">{station.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{station.constituency}</td>
                    <td className="border border-gray-300 px-4 py-2">{station.numberOfVoters}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={`px-3 py-1 border rounded-md hover:bg-gray-200 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              <span className="px-3 py-1">{currentPage}</span>
              <button
                onClick={() => setCurrentPage((prev) => (prev * itemsPerPage < stations.length ? prev + 1 : prev))}
                className={`px-3 py-1 border rounded-md hover:bg-gray-200 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
