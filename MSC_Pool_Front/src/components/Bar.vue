<template>
  <div class="container">
    <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'BarChart',
  components: { Bar },
  data: () => ({
    loaded: false,
    chartData: null,
  }),
  computed: {
    chartOptions() {
      return {
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 100,
            ticks: {
              callback: function (value) {
                return value + '%';
              },
            },
          },
        },
      };
    },
  },
  async mounted() {
    this.loaded = false;

    try {
      // Effectuez une requête Axios pour obtenir les données de vos horloges depuis l'API
      const response = await axios.get('http://localhost:4000/api/clocks/=?');
      const clocks = response.data.data;
      const PRESENT = clocks.filter(clock => clock.status === true);
      const ABSENT = clocks.filter(clock => clock.status === false);

      // Calcul des pourcentages
      const total = clocks.length;
      const presentPercentage = (PRESENT.length / total) * 100;
      const absentPercentage = (ABSENT.length / total) * 100;

      // Adaptez les données de vos horloges pour correspondre au format attendu
      this.chartData = {
        labels: ['ABSENT', 'PRESENT'], // Remplacez "label" par le nom de la propriété qui contient les libellés
        datasets: [
          {
            label: 'Status',
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 2,
            data: [absentPercentage, presentPercentage], // Remplacez "status" par le nom de la propriété qui contient les données
          },
        ],
      };

      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>
