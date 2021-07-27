<template>
  <div>
    <div class="banner">
        <h1>Ohm Delivery</h1>
        <h2>Get shocked by the power</h2>
    </div>

    <div>
      <form @submit.prevent="query">
          <p>
              <input id="tracking" type="text" v-model="trackingId" placeholder="Enter your tracking id"/>
          </p>
          <p>
              <button id="formBtn" type="submit">Submit</button>
          </p>
          <p>
              <span v-if="errorMessage">{{ errorMessage }}</span>
          </p>
      </form>
  </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      trackingId: null,
      errorMessage: null,
    };
  },
  methods: {
      async query() {
        try {
          const { data } = await axios.get(`/api/ohms/${this.trackingId}`);
          console.log(data);
        } catch (error) {
          console.log(error)
          this.errorMessage = 'Oops, this website is under construction, please come back later.';
        }
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

input {
    margin: 2em auto 1em;
    width: 50%;
}
p {
    text-align: center;
    margin: auto;
    line-height: 2.0;
}
</style>
