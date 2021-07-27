<template>
    <div>
      <form @submit.prevent="query">
        <input id="tracking" type="text" v-model="trackingId" placeholder="Enter your tracking id"/>
        <button type="submit">Submit</button>
      </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      trackingId: null,
    };
  },
  methods: {
      async query() {
        if (!this.trackingId) {
          this.$emit('error', { message: 'Please provide tracking id' });
          return;
        }
        try {
          this.$emit('loading');
          const { data } = await axios.get(`/api/ohms/${this.trackingId}`);
          this.$emit('found', data);
        } catch (error) {
          this.$emit('error', error.response && error.response.data);
        }
      },
  }
};
</script>

<style scoped>
form {
  text-align: center;

}
button, input {
  display: block;
  margin: 0 auto;
}
input {
    margin: 2em auto 1em;
    width: 50%;
}
</style>
