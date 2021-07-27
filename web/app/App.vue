<template>
  <div>
    <div class="banner">
        <h1>Ohm Delivery</h1>
        <h2>Get shocked by the power</h2>
    </div>

    <ohm-search
      @loading="loadingStarted"
      @found="presentItem"
      @error="displayError"
    />

    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
    <ohm-spinner v-else-if="loading" class="spinner"/>
    <ohm-item v-else :item="item" />

  </div>
</template>

<script>
import OhmSearch from './components/OhmSearch';
import OhmItem from './components/OhmItem';
import OhmSpinner from './components/OhmSpinner';

export default {
  components: {
    OhmSearch,
    OhmItem,
    OhmSpinner,OhmSpinner
  },
  data() {
    return {
      item: null,
      errorMessage: null,
      loading: false,
    };
  },
  methods: {
    loadingStarted() {
      this.loading = true;
    },
    presentItem(item) {
      this.loading = false;
      this.errorMessage = null;
      this.item = item;
    },
    displayError(error) {
      this.loading = false;
      this.errorMessage = error.message || 'Unknown application error occurred. But no worries, our hamster are already reported';
    },
  }
};
</script>

<style scoped>
body {
    margin: 0px 0px 0px 0px;
    font-size: 16px;
    font-family: "Open Sans",serif;
}

.banner {
    background-color: dodgerblue;
}

h1 {
    font-family: Arial, sans-serif;
    margin: 0 auto;
    padding-top: 10px;
    text-align: center;
}

h2 {
    font-family: Arial, sans-serif;
    margin: 0 auto;
    padding-top: 0px;
    padding-bottom: 10px;
    text-align: center;
    font-style: italic;
}
.error {
    text-align: center;
    margin: 10px auto;
    line-height: 2.0;
    color: #c00;
}
.placeholder {
  text-align: center;
  font-size: 40px;
}
.spinner {
  margin-top: 50px;
}
</style>
