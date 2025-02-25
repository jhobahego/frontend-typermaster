<script setup lang="ts">
import { useGameStore } from '../stores/game';
import { onMounted } from 'vue';

const store = useGameStore();

onMounted(() => {
  store.fetchGameHistory();
});
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="flex items-center justify-center mb-8 space-x-4">
      <img src="../assets/logo.svg" alt="TyperMaster Logo" class="h-12 w-12 text-blue-500" />
      <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        TyperMaster
      </h1>
    </div>
    
    <div v-if="store.showHistory" class="space-y-6">
      <div class="text-center">
        <button
          @click="store.startGame"
          class="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
        >
          Start Game
        </button>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-2xl font-bold mb-4">Game History</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="border-b dark:border-gray-700">
                <th class="py-2 px-4 text-left">Username</th>
                <th class="py-2 px-4 text-left">WPM</th>
                <th class="py-2 px-4 text-left">Accuracy</th>
                <th class="py-2 px-4 text-left">Real Accuracy</th>
                <th class="py-2 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="game in store.gameHistory" :key="game.id" class="border-b dark:border-gray-700">
                <td class="py-2 px-4">{{ game.username }}</td>
                <td class="py-2 px-4">{{ game.wpm }}</td>
                <td class="py-2 px-4">{{ game.accuracy }}%</td>
                <td class="py-2 px-4">{{ game.real_accuracy }}%</td>
                <td class="py-2 px-4">{{ new Date(game.created_at).toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-4 flex justify-center space-x-2">
          <button
            v-for="page in store.totalPages"
            :key="page"
            @click="store.fetchGameHistory(page)"
            :class="[
              'px-3 py-1 rounded',
              store.currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700'
            ]"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="store.isGameStarted" class="space-y-6">
      <div class="flex justify-between items-center mb-4">
        <span class="text-lg">Player: {{ store.username }}</span>
      </div>

      <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <p class="text-xl leading-relaxed font-mono">
          <span
            v-for="(char, index) in store.text"
            :key="index"
            :class="{
              'text-green-500': store.userInput[index] === char,
              'text-red-500': store.userInput[index] !== undefined && store.userInput[index] !== char,
              'bg-yellow-200 dark:bg-yellow-800': store.userInput.length === index
            }"
          >{{ char }}</span>
        </p>
      </div>

      <textarea
        :value="store.userInput"
        @input="e => store.handleInput((e.target as HTMLTextAreaElement).value)"
        class="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
        :disabled="store.isGameFinished"
        placeholder="Start typing here..."
        rows="3"
      ></textarea>
    </div>

    <div v-if="store.isGameFinished" class="space-y-4">
      <h2 class="text-2xl font-bold">Results</h2>
      <div class="grid grid-cols-4 gap-4">
        <div class="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
          <p class="text-sm">WPM</p>
          <p class="text-2xl font-bold">{{ store.wpm }}</p>
        </div>
        <div class="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
          <p class="text-sm">Accuracy</p>
          <p class="text-2xl font-bold">{{ store.accuracy }}%</p>
        </div>
        <div class="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
          <p class="text-sm">Real Accuracy</p>
          <p class="text-2xl font-bold">{{ store.realAccuracy }}%</p>
        </div>
        <div class="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
          <p class="text-sm">Words</p>
          <p class="text-2xl font-bold">{{ store.words }}</p>
        </div>
      </div>
      <div class="flex space-x-4">
        <button
          @click="store.startGame"
          class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Play Again
        </button>
        <button
          @click="store.resetGame"
          class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  </div>
</template>