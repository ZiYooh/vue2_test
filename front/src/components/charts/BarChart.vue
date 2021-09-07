<script>
import { Bar, mixins } from 'vue-chartjs';

export default{
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: ['chartoptions'],
  mounted() {
    this.renderChart(this.chartData, this.chartoptions);
  },

  data() {
    return {
      options: {
        scales: {
          yAxes: [{
            // display: false, // y축 기준 표시 여부
            ticks: { // y축 기준 데이터 변경
              min: 0, // y축 최소값
            },
          }],
        }, // scales 끝
      },
    };
  },
};
</script>

<style>

</style>
