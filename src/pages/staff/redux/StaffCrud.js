import axios from 'axios';
import { API_URL } from '../../../../globals';

export const BASE_STAFF_URL = `${API_URL}/staff`;

// API functions
export const getAllStaff = () => axios.get(BASE_STAFF_URL);

export const getStaffById = (staffId) =>
  axios.get(`${BASE_STAFF_URL}/${staffId}`);

export const createStaff = (staffDetails) =>
  axios.post(BASE_STAFF_URL, staffDetails);

export const updateStaff = (staffId, staffDetails) =>
  axios.put(`${BASE_STAFF_URL}/${staffId}`, staffDetails);

export const deleteStaff = (staffId) =>
  axios.delete(`${BASE_STAFF_URL}/${staffId}`);

export const updateStaffStatus = (staffId, status) =>
  axios.put(`${BASE_STAFF_URL}/${staffId}/status`, { status });
