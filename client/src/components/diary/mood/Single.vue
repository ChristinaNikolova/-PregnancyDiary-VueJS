<script setup>
const props = defineProps({
  mood: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <li class="week-details-mood">
    {{ props.mood }}
  </li>
</template>

<style scoped>
.week-details-mood {
  position: relative;
  width: 300px;
  height: 100px;
  border-radius: 100px / 50px;
  background-color: var(--clr-white);
  line-height: 100px;
  text-align: center;
  margin-bottom: 80px;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.08);
  box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.08);
}

.week-details-mood::before {
  position: absolute;
  content: "";
  top: -60px;
  left: 120px;
  width: 120px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--clr-white);
  line-height: 75px;
  text-align: center;
}

.week-details-mood::after {
  position: absolute;
  content: "";
  top: -20px;
  left: 60px;
  width: 100px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--clr-white);
  line-height: 75px;
  text-align: center;
}
</style>
