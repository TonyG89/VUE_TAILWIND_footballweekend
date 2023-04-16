<template>
  <ul class="flex">
    <li>{{ props.match.start }}</li>
    <li>{{ props.match.teamHost }}</li>
    <li>{{ props.match.score }}</li>
    <li>{{ props.match.teamGuest }}</li>
    <li>{{ props.match.gameTime }}</li>
    <li class>
      <button @click="onEditCard">*</button>
      <button @click="onRemoveCard">x</button>
    </li>
  </ul>
</template>

<script setup>
import { reactive } from 'vue';

const props = defineProps({
  match: {
    type: Object,
    required: true,
    default: {
      start: '10:00',
      teamHost: 'team 1',
      teamGuest: 'team 2',
      score: '0:0',
      gameTime: 7,
    },
  },
});

const emit = defineEmits({
  editCard: null,
  removeCard: null,
});

const onEditCard = () => {
  emit('editCard', {
    start: props.match.start,
    teamHost: props.match.teamHost,
    teamGuest: props.match.teamGuest,
    score: props.match.score,
    gameTime: props.match.gameTime,
  });
};

const onRemoveCard = () => {
  if (confirm('Удалить матч?')) {
    emit('removeCard', {
      id: props.match.id,
    });
    console.log('Удалил матч');
  }
};
</script>

<style scoped>
li {
  border: 1px solid black;
  flex: 1 1 0%;
}
</style>
