<template>
  <div class="item">
    <div v-if="item">
      <p v-if="item.id">Tracking ID: <strong>{{ item.id }}</strong></p>
      <p v-if="item.status">Status: <strong>{{ item.status }}</strong></p>
      <p v-if="item.comment">Comment: <strong>{{ item.comment }}</strong></p>
      <p v-if="item.client">
        Client info:
        <strong v-if="item.client.name">{{ item.client.name }}</strong>
        /
        <strong v-if="item.client.address">{{ item.client.address }}</strong>
      </p>
      <section v-if="item.history">
        <p>Status history:</p>
        <ul v-if="item.history">
          <li v-for="({ state, at }) in item.history" :key="state+at">
            <strong>{{state}}</strong> @ <span>{{formatDate(at)}}</span>
          </li>
        </ul>
      </section>
    </div>
    <div v-else class="placeholder">Your Ohm will be presented here once tracking id is provided...</div>
  </div>
</template>


<script>
import { format } from 'date-fns';

export default {
  props: {
    item: Object,
  },
  methods: {
    formatDate(timestamp) {
      return format (new Date(Number(timestamp)), 'yyy-MM-dd HH:mm');
    }
  }
};
</script>

<style scoped>
.item {
  width: 50%;
  margin: 10px auto;
}
.placeholder {
  text-align: center;
  font-size: 2em;
  color: #d1e8ff;
}
</style>
