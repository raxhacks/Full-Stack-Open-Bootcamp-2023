import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}


const createNew = async (content) => {
  const object = { content, id:(Math.random() * 100000).toFixed(0), votes:0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVotes = async (id, objectToUpdate) => {
  const response = await axios.put(`${baseUrl}/${id}`, objectToUpdate);
  return response.data;
}

export default {
  getAll,
  getOne,
  createNew,
  updateVotes
}