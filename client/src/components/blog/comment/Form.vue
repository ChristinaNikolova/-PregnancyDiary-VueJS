<script setup></script>

<template>
  <form class="form" @submit.prevent="onSubmitHandler">
    <AppTextarea name="comment" label="Comment" />
    <button type="submit" class="btn btn-primary">Comment</button>
    <!-- <FormButton form-name="Login" :is-disabled="isDisabled" @on-cancel-form-handler="onCancelFormHandler" /> -->
  </form>
</template>

<style scoped></style>
