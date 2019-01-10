<template>
<section class="credits-section" v-if="credits">
  <div class="st-sources" v-if="credits.source">
    <span v-if="lang!=='zh-CN'" class="credits-label"> Source:&nbsp;</span>
    <span v-if="lang==='zh-CN'" class="credits-label">来源:&nbsp;</span>
    <span>{{credits.source}}</span>
  </div>
  <div v-if="credits.produced_by">
    <span v-if="lang!=='zh-CN'" class="credits-label">Produced by:</span>
    <span v-if="lang==='zh-CN'" class="credits-label">制作:</span>
    <span itemprop="author" v-for="item in credits.produced_by">{{item}}</span>
  </div>
</section>
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  computed: mapState(['credits', 'lang'])
}
</script>

<style lang="scss" scoped>
.credits-section {
    lost-center: $d_large;
    color: #666;
    font-size: 13px;
    margin-top: 70px;
    padding: 20px 15px 30px;
    border-top: dotted #ccc 1px;
    box-sizing: border-box;
    font-family: $font-Curator-Regular;

    .credits-label {
        font-family: $font-Curator-Bold;
    }

    [itemprop="author"]::after {
        content: ", ";
    }

    [itemprop="author"]:last-child::after {
        content: ".";
    }

    [itemprop=“author”]:nth-last-child(2)::after {
        content: " ";
    }

    [itemprop="author"]:last-child::before {
        content: "and ";
    }
}
</style>
