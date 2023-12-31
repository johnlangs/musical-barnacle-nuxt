<template>
    <div>
      <Pie :data="chartData" :options="chartOptions"/>
    </div>
</template>
  
<script setup lang="ts">
    import { Pie } from 'vue-chartjs'
    import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

      const chartData = useState<any>('chartData', () => ({
          labels: [
                'Bank fees',
                'Entertainment',
                'Food & Drink',
                'General merchandise',
                'General services',
                'Government & non-profit',
                'Home improvement',
                'Income',
                'Loan payments',
                'Medical',
                'Personal care',
                'Rent & utilities',
                'Transfer in',
                'Transfer out',
                'Transportation',
                'Travel'
            ],
          datasets: [
            {
              label: 'Spending',
              backgroundColor: [
                '#9c27b0',
                '#2196f3',
                '#009688',
                '#cddc39',
                '#ff9800',
                '#e81e63',
                '#3f51b5',
                '#00bcd4',
                '#8bc34a',
                '#ffc107',
                '#f44336',
                '#673ab7',
                '#03a9f4',
                '#4caf50',
                '#ffeb3b',
                '#ff5722'
            ],
              data: []
            }
          ]
        }));
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false
      };
  
      const fetchData = async () => {
        const { data } = await useFetch("/api/categorySpending");
  
        chartData.value = {
          labels: [
                'Bank fees',
                'Entertainment',
                'Food & Drink',
                'General merchandise',
                'General services',
                'Government & non-profit',
                'Home improvement',
                'Income',
                'Loan payments',
                'Medical',
                'Personal care',
                'Rent & utilities',
                'Transfer in',
                'Transfer out',
                'Transportation',
                'Travel'
            ],
          datasets: [
            {
              label: 'Spending',
              backgroundColor: [
                '#9c27b0',
                '#2196f3',
                '#009688',
                '#cddc39',
                '#ff9800',
                '#e81e63',
                '#3f51b5',
                '#00bcd4',
                '#8bc34a',
                '#ffc107',
                '#f44336',
                '#673ab7',
                '#03a9f4',
                '#4caf50',
                '#ffeb3b',
                '#ff5722'
            ],
              data: Object.values(data.value!)
            }
          ]
        };
        console.log(chartData.value)
      };

      onBeforeMount(() => {
        ChartJS.register(ArcElement, Tooltip, Legend)
      })
  
      onMounted(() => {
        fetchData();
      });
  </script>