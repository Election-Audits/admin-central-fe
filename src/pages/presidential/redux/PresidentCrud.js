import axios from 'axios'
import { API_URL } from '../../../../globals'

export const BASE_PRESIDENTIAL_URL = `${API_URL}/candidates`

// Server should return AuthModel

export function getAllPresidentialCandidates(candidateId) {
    return axios.get(`${BASE_PRESIDENTIAL_URL},${candidateId}`)
}

export function getPresidentialCandidateById(candidateId) {
    return axios.get(`${BASE_PRESIDENTIAL_URL}/${candidateId}`)
}
export function createPresidentialCandidate(presidentialDetails) {
  return axios.post(BASE_PRESIDENTIAL_URL, presidentialDetails)
}

export function updatePresidentialCandidate(candidateId, presidentialDetails) {
    return axios.put(`${BASE_PRESIDENTIAL_URL}/${candidateId}`, presidentialDetails)
}

export function deletePresidentialCandidate(candidateId) {
    return axios.delete(`${BASE_PRESIDENTIAL_URL}/${candidateId}`)
}

export function updatePresidentialCandidateStatus(candidateId, status) {
    return axios.put(`${BASE_PRESIDENTIAL_URL}/${candidateId}`, status)
}
