// register the grid component
Vue.component('demo-grid', {
  template: '#grid-template',
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
/*
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
*/
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
})

// bootstrap the demo
var demo = new Vue({
  el: '#demo',
  data: {
    searchQuery: '',
    gridColumns: ['branch', 'bin_start','bin_end'],
    gridData: [
      { branch: 'Chuck1 Norris', power: Infinity },
    ]
  },
  created: function(){
      // GET request
      var self = this
      // GET /someUrl
      this.$http.get('http://localhost:8000/list.php').then(response => {
        // success callback
       self.gridData = response.body
      }, response => {
        // error callback
        console.log(response)
      });
  },
  methods: {
    addEvent: function(e){
      var self = this
      this.$http.post('http://localhost:8000/list.php',self.gridData).then(response => {
        // success callback
        console.log(response)
      }, response => {
        // error callback
      });

    }
  }

})

