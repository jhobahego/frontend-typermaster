import axios from '../config/axios';

export const apiService = {
  async fetchText(options: { language: string; length: string } = { language: 'en', length: 'medium' }) {
    const response = await axios.get(`/texts?language=${options.language}&length=${options.length}`);
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
