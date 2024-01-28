<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import diariesService from '../../services/diaries';

const route = useRoute();
const diaryId = route.params.id;
const diary = ref({});

onMounted(() => {
  diariesService
    .getById(diaryId)
    .then((res) => {
      diary.value = res;
      console.log(diary.value);
    })
    .catch(err => console.error(err));
});
</script>

<template>
  <div>Details</div>
</template>

<style scoped>

</style>
