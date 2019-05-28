import Vue from 'vue'
export default {
  name: 'sortApp',
  components: {},
  data() {
    return {
      sortObject: {
        sortkeys: [{
            name: 'Airline',
            value: 'acn'
          },
          {
            name: 'Depart',
            value: 'ddm'
          }, {
            name: 'Arrive',
            value: 'adm'
          }, {
            name: 'Duration',
            value: 'tdum'
          }, {
            name: 'PRICE PER ADULT',
            value: 'tf'
          }
        ],
        sort: 'tf',
        reverse: false
      }
    }
  },
  watch: {
    count: function _count(params) {
      console.log('changed');
      this.sort(this.sortObject.sort,true);
    }
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
    // Or return basket.getters.fruitsCount
    // (depends on your design decisions).
  },
  methods: {
    sort: function _sort (type,filter) {
      if (this.sortObject.sort == type && !filter) {
        this.sortObject.reverse = !this.sortObject.reverse;
      } else if (filter){
        this.sortObject.reverse = this.sortObject.reverse
      }

      this.sortObject.sort = type;
      let sortedData = this.$store.state.flights.sort((a, b) => {
        var ret = this.sortObject.reverse ? a[type] - b[type] < 0 : a[type] - b[type] >= 0;
        if (type == "acn") {
          ret = this.sortObject.reverse ? a[type] < b[type] : a[type] > b[type];
        }
        return ret ? 1 : -1;
      });
      this.$store.dispatch('updatesort', {
        flights: sortedData,
        sort: {
          sortkey: this.sortObject.sort,
          reverse: this.sortObject.reverse
        }
      });
    }
  },
  mounted: function () {
    console.log('hello sort');
  }
}