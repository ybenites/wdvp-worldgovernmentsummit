<template>
<div class="container-poll">
  <div class="active-poll" v-if="polls">
    <h2>Today's Poll </h2>
    <div class="content-active-poll">
      <div class="question-poll">
        {{polls[0].title}} <span>{{getDateFormat(polls[0].publishedDate)}}</span>
      </div>
      <div class="content-graphic-poll">
        <div class="choose-option">
          <div class="option1 option">
            YES
          </div>
          <div class="option2 option">
            NO
          </div>
        </div>
        <div class="content-piechart">
          <pie-chart :percent="80" label="%" :stroke-width="3" label-small="" color="#22456D" :opacity="1"></pie-chart>
        </div>
      </div>
      <div class="total-votes-description">
        Total numer of votes recorded 182
      </div>
      <div class="line-dot">

      </div>
    </div>
  </div>
  <div class="list-remaing-poll" v-for="(poll,index)  in polls" v-if="index!==0">
    <div class="question-poll">
      <div class="small-donut-pie">

      </div>
      <div class="">
        <span>{{getDateFormat(poll.publishedDate)}}</span>
        <div class="question-poll">
          {{poll.title}}
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {
  mapState
} from 'vuex'
const PieChart = require('vue-pie-chart');

export default {
  computed: mapState(['fullWidth', 'polls']),
  components: {
    'pie-chart': PieChart.default
  },
  watch: {},
  methods: {
    getDateFormat(timestampDate) {
      var monthsAbbv = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
      let fDate = new Date(timestampDate * 1000),
        day = fDate.getDate(),
        month = monthsAbbv[fDate.getMonth()],
        year = fDate.getFullYear();
      return `${day} ${month} ${year}`;
    }
  },
  mounted() {
    var _this = this;
  }

}
</script>
<style lang="scss">
.container-poll {
    @include container;
    .active-poll {
        padding: 10px;
        background-color: #DBDBDB;
        h2 {
            color: #26648d;
            font-size: 30px;
            font-family: $Roboto;
            font-weight: 700;
        }
    }
    .list-remaing-poll {}
}
.total-votes-description {
    color: #333;
    font-family: $Roboto;
    font-weight: 300;
    padding: 20px 0;
}
.question-poll {
    color: #333;
    font-size: 16px;
    font-family: $Roboto;
    font-weight: 500;
    span {
        color: #26648d;
        font-size: 16px;
        font-family: $Roboto;
        font-weight: 700;
    }
}
.choose-option {
    @include breakpoint($d_medium) {
        float: left;
    }
    .option {
        color: #fff;
        font-size: 15px;
        padding: 3px 10px;
        font-family: $Roboto;
        font-weight: 700;
        text-align: center;
        margin: 5px;
        max-width: 50px;
    }
    .option1 {
        background-color: #E57435;
    }
    .option2 {
        background-color: #123B6A;
    }

}

.content-graphic-poll {
    @include clearfix;
}
.line-dot {
    border-top: 1px dotted #666;
    padding: 20px 0;
}
.content-piechart {
    width: 200px;
    @include breakpoint($d_medium) {
        float: right;
        margin-top: -45px;
    }
    circle {
        stroke: #E57435;
    }
}
</style>
