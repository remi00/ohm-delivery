<template>
  <div>
    <div class="banner">
        <h1>Ohm Delivery</h1>
        <h2>Get shocked by the power</h2>
    </div>

    <ohm-search
      @loading="processing = true"
      @found="presentItem"
      @error="displayError"
    />

    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
    <ohm-spinner v-else-if="processing" class="spinner"/>
    <div v-else>
      <ohm-item :item="item" />
      <ohm-delivery-actions
        v-if="item && item.status === 'IN_DELIVERY'"
        :id="item.id"
        class="actions"
        @updating="processing = true"
        @updated="presentItem"
      />
    </div>

  </div>
</template>

<script>
import OhmSearch from './components/OhmSearch';
import OhmItem from './components/OhmItem';
import OhmSpinner from './components/OhmSpinner';
import OhmDeliveryActions from './components/OhmDeliveryActions';

export default {
  components: {
    OhmSearch,
    OhmItem,
    OhmSpinner,
    OhmDeliveryActions,
  },
  data() {
    return {
      item: null,
      errorMessage: null,
      processing: false,
    };
  },
  methods: {
    presentItem(item) {
      this.processing = false;
      this.errorMessage = null;
      this.item = item;
    },
    displayError(error) {
      this.processing = false;
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
.actions {
  margin-top: 30px;
}
</style>
