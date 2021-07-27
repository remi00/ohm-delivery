<template>
    <div class="actions">
      <header>Update the status:</header>
      <form @submit.prevent="update">
        <div class="options">
          <div class="option">
            <input type="radio" id="refused" value="REFUSED" v-model="status" /> <label for="refused">REFUSED</label>
          </div>
          <div class="option">
            <input type="radio" id="delivered" value="DELIVERED" v-model="status" /> <label for="delivered">DELIVERED</label>
          </div>
        </div>
        <input class="reason" type="text" v-model="reason" :disabled="status !== 'REFUSED'" placeholder="Specify the reason">
        <button type="submit">Update Status</button>
      </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    id: String,
  },
  data() {
    return {
      status: null,
      reason: '',
    };
  },
  methods: {
      async update() {
        try {
          this.$emit('updating');
          const payload = { status: this.status };
          if (this.status === 'REFUSED') payload.reason = this.reason;
          const { data } = await axios.patch(`/api/ohms/${this.id}`, payload);
          this.$emit('updated', data);
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
.options {
  display: flex;
  justify-content: center;
  flex-flow: row nowrap;
}
.option + .option {
  margin-left: 20px;
}
button, header {
  display: block;
  margin: 0 auto;
}
input.reason {
  display: block;
  margin: .5em auto;
  width: 50%;
}
header {
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
}
</style>
