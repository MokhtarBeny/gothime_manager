import { defineStore } from 'pinia'
import { Vite_API_URL } from '@/services/url';
import axios from "axios"
export const useClockStore = defineStore("clock", {
    state: () => ({
        clocks: [],
    }),
    getters: {
      getClocks(state){
          return state.clocks
        }
    },
    actions: {
      setClocks(clocks) {
        this.clocks = clocks;
      },
      async fetchClocks() {
        try {
          const response = await axios.get(Vite_API_URL + 'clocks')
          this.clocks = response.data.data
            
          }
          catch (error) {
            alert(error)
            console.log(error)
        }
      }
    },
})