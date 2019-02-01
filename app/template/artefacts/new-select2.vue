<template lang="html">
    <select class="new-select2">
      <!-- <option value=""></option> -->
      <option value="bf">the buzz of the future</option>
      <option value="cf">the connections of the future</option>
      <option value="fg">the future of governance</option>
      <!-- <option value="ft">the future of technology</option> -->
    </select>
</template>

<script>
import $ from 'jquery';
import select2 from 'select2';

export default {
  created() {
    var _this = this;
    var valuesStatesSelect = {
      'initial': 0,
      'bf': 0,
      'cf': 0,
      'fg': 0,
      'ft': 0
    };
    this.$nextTick(function() {
      $(".new-select2").select2({
        // width: '100%',
        placeholder: "Select an option",
        minimumResultsForSearch: -1,
        // allowClear: true
      }).on('change.select2', function(e, d) {
        if ($(this).val()) {
          valuesStatesSelect[$(this).val()] = 1;
        } else {
          valuesStatesSelect.initial = 1;
        }
        _this.$store.commit('pushResponse', valuesStatesSelect);
        valuesStatesSelect.initial = 0;
        valuesStatesSelect.bf = 0;
        valuesStatesSelect.cf = 0;
        valuesStatesSelect.fg = 0;
        valuesStatesSelect.ft = 0;
      });
    });
  }
}
</script>

<style lang="scss">
// @import url('select2/dist/css/select2');
@import '~select2/src/scss/core';

// .select2-results {
//     max-height: 160px !important;
// }
// .select2-container .select2-choice {
//     background-color: #FFF200 !important;
// }
// .select2-results .select2-highlighted {
//     color: #333333 !important;
//     background-color: #FFF200 !important;
// }

.select2-container--default.select2-container--open .select2-selection--single {
    .select2-selection__arrow {
        height: 60px;
        b {
            border-color: transparent transparent #A23116 transparent;
        }
    }
}

.select2-container--default .select2-selection--single {
    height: 60px;
    .select2-selection__arrow {
        b {
            border-color: #A23116 transparent transparent transparent;
        }
    }

}

.select2-container--default .select2-selection--single {
    border-radius: 0;
    border: none;
    border-bottom: 1px solid #A23116;
}
.select2-container {
    max-width: 562px;
    .select2-selection {
        height: 60px;
        .select2-selection__rendered {
            line-height: 1.5;
            font-size: 40px;
        }
    }

}
.select2-container--default .select2-selection--single .select2-selection__arrow {
    height: 60px;
}
.select2-container--default .select2-results__option--highlighted[aria-selected] {
    background-color: #FB9067;
}
.select2-container--default .select2-results__option[aria-selected=true] {
    background-color: #DBDBCC;

}
.select2-results__options {
    color: #333;
}
</style>
