<template>
  <section class="diary-details-weeks">
    <h3 class="section-title">
      Pregnancy Week by Week
    </h3>
    <p class="diary-details-weeks-content">
      Get Excited for Every Milestone: Our "Pregnancy Week by Week" articles provide an in-depth look at the incredible journey of nurturing new life inside your body. Each week, we’ll take you through the developmental milestones your baby is reaching, as well as the physical and emotional changes you can expect.
    </p>
    <slot name="first" />
    <slot name="second" />
    <slot name="third" />
    <button type="button" class="btn btn-primary">
      <router-link to="/diary">
        Go back to my diaries
      </router-link>
    </button>
  </section>
</template>

<style scoped>
.diary-details-weeks {
  background-color: var(--clr-cream-bl);
  color: var(--clr-dark-grey);
  padding-top: 60px;
  padding-bottom: 60px;
}

.diary-details h3.section-title {
  font-size: 36px;
  margin-bottom: 40px;
}

.diary-details-weeks-content {
  text-align: center;
  font-size: 18px;
  text-transform: lowercase;
  line-height: 2;
  letter-spacing: 1.1px;
  margin-bottom: 80px;
  padding-left: 50px;
  padding-right: 50px;
}

.diary-details-weeks a {
  color: var(--clr-white);
}
</style>
