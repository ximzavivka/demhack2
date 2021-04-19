<script>
import {Doughnut} from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  watch: {
    chartdata: function () {
         //  this.data.datasets[0].data = newData
      this.renderChart(this.chartdata, this.options)
    }
  },
  mounted() {
    const plugin = function (chart, options) {
      let width = chart.chart.width,
          height = chart.chart.height ,
          ctx = chart.chart.ctx;

      ctx.save();
      let fontSize = (height / 200).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "middle";
      let text = chart.data.datasets[0].percentage,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2 ;

      ctx.fillText(text, textX, textY);
      ctx.alignText = 'center'
      ctx.fillText(text, textX, textY);
      ctx.save();
    }
    this.addPlugin({
      id: 'myPlugin',
      beforeDraw: plugin
    })
    this.renderChart(this.chartdata, this.options)
  },
}
</script>

<style scoped>

</style>