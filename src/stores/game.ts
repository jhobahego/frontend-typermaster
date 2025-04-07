import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { apiService } from '../services/apiService';
import type { GameHistory } from '../types';

function generateUsername() {
  const adjectives = ['Swift', 'Quick', 'Rapid', 'Nimble', 'Fast', 'Speedy'];
  const nouns = ['Typer', 'Writer', 'Racer', 'Typist', 'Scribe', 'Keymaster'];
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${randomNumber}`;
}

export const useGameStore = defineStore('game', () => {
  // State
  const state = ref({
    text: 'The quick brown fox jumps over the lazy dog.',
    userInput: '',
    startTime: 0,
    endTime: 0,
    isGameStarted: false,
    isGameFinished: false,
    username: '',
    totalKeystrokes: 0,
    correctKeystrokes: 0,
    gameHistory: [] as GameHistory[],
    currentPage: 1,
    totalPages: 1,
    showHistory: true
  });

  // Getters
  const words = computed(() => state.value.text.split(' ').length);
  
  const accuracy = computed(() => {
    if (state.value.userInput.length === 0) return 0;
    let correct = 0;
    const minLength = Math.min(state.value.userInput.length, state.value.text.length);
    
    for (let i = 0; i < minLength; i++) {
      if (state.value.userInput[i] === state.value.text[i]) correct++;
    }
    
    return Math.round((correct / state.value.userInput.length) * 100);
  });

  const realAccuracy = computed(() => {
    if (state.value.totalKeystrokes === 0) return 0;
    return Math.round((state.value.correctKeystrokes / state.value.totalKeystrokes) * 100);
  });

  const wpm = computed(() => {
    if (!state.value.startTime || !state.value.endTime) return 0;
    const timeInMinutes = (state.value.endTime - state.value.startTime) / 60000;
    return Math.round((words.value / timeInMinutes));
  });

  // Actions
  async function startGame() {
    if (!state.value.username) {
      state.value.username = generateUsername();
    }
    state.value.userInput = '';
    state.value.startTime = Date.now();
    state.value.isGameStarted = true;
    state.value.isGameFinished = false;
    state.value.endTime = 0;
    state.value.totalKeystrokes = 0;
    state.value.correctKeystrokes = 0;
    state.value.showHistory = false;
    
    try {
      const data = await apiService.fetchText();
      state.value.text = data.text;
    } catch (error) {
      console.error('Error fetching text:', error);
    }
  }

  async function finishGame() {
    if (state.value.isGameFinished) return;
    
    state.value.endTime = Date.now();
    state.value.isGameFinished = true;
    state.value.isGameStarted = false;

    try {
      await apiService.saveResults({
        username: state.value.username,
        wpm: wpm.value,
        accuracy: accuracy.value,
        real_accuracy: realAccuracy.value,
        text: state.value.text
      });
      await fetchGameHistory();
    } catch (error) {
      console.error('Error saving results:', error);
    }
  }

  function checkCompletion() {
    if (state.value.userInput.length >= state.value.text.length) {
      finishGame();
    }
  }

  function handleInput(newValue: string) {
    if (state.value.isGameFinished) return;
    
    const oldLength = state.value.userInput.length;
    const newLength = newValue.length;
    
    if (newLength > oldLength) {
      state.value.totalKeystrokes++;
      if (newValue[newLength - 1] === state.value.text[newLength - 1]) {
        state.value.correctKeystrokes++;
      }
    }
    
    state.value.userInput = newValue;
    checkCompletion();
  }

  async function fetchGameHistory(page = 1) {
    try {
      const data = await apiService.fetchGameHistory(page);
      state.value.gameHistory = data.results;
      state.value.currentPage = data.page;
      state.value.totalPages = data.total_pages;
    } catch (error) {
      console.error('Error fetching game history:', error);
    }
  }

  function resetGame() {
    state.value.isGameStarted = false;
    state.value.isGameFinished = false;
    state.value.showHistory = true;
    fetchGameHistory();
  }

  return {
    // Expose state properties
    text: computed(() => state.value.text),
    userInput: computed(() => state.value.userInput),
    isGameStarted: computed(() => state.value.isGameStarted),
    isGameFinished: computed(() => state.value.isGameFinished),
    username: computed(() => state.value.username),
    gameHistory: computed(() => state.value.gameHistory),
    currentPage: computed(() => state.value.currentPage),
    totalPages: computed(() => state.value.totalPages),
    showHistory: computed(() => state.value.showHistory),
    
    // Expose computed properties
    accuracy,
    realAccuracy,
    wpm,
    words,
    
    // Expose actions
    startGame,
    finishGame,
    checkCompletion,
    handleInput,
    fetchGameHistory,
    resetGame
  };
});