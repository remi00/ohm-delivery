<template>
  <div>
    <div class="banner">
        <h1>Ohm Delivery</h1>
        <h2>Get shocked by the power</h2>
    </div>

    <ohm-search
      @found="presentItem"
      @error="displayError"
    />

    <p>
        <span v-if="errorMessage">{{ errorMessage }}</span>
    </p>

  </div>
</template>

<script>
import OhmSearch from './components/OhmSearch';

export default {
  components: {
    OhmSearch,
  },
  data() {
    return {
      trackingId: null,
      errorMessage: null,
    };
  },
  methods: {
    presentItem() {
      this.errorMessage = null;
    },
    displayError(error) {
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
p {
    text-align: center;
    margin: auto;
    line-height: 2.0;
}
</style>
