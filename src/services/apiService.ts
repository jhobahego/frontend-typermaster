import axios from '../config/axios';

export const apiService = {
  async fetchText() {
    const response = await axios.get('/texts');
    return response.data;
  },
  
  async saveResults(data: {
    username: string;
    wpm: number;
    accuracy: number;
    real_accuracy: number;
    text: string;
  }) {
    return await axios.post('/results', data);
  },
  
  async fetchGameHistory(page = 1) {
    const response = await axios.get(`/results?page=${page}`);
    return response.data;
  }
};
