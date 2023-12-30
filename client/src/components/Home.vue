<template>
  <section class="home">
    <Jumbo image="/images/smiling-baby.jpg" text="smiling-baby" />
    <section class="home-content-wrapper">
      <h2 class="home-content-title">
        Memory Books. Made Online.
      </h2>
      <p class="home-content-text">
        A Baby Fills a Place in Your Heart That You Never Knew Was Empty!
      </p>
      <button class="btn btn-primary">
        Create your diary
      </button>
    </section>
    <section class="home-user">
      <div class="home-user-wrapper">
        <h2 class="home-user-title">
          Capture moments before they become blurry.
        </h2>
        <p class="home-user-content">
          Beautiful moments won't be ingrained in your memory forever.
          Ensure you document the wonderful moments before it's too late.
        </p>
        <div class="home-user-btns-wrapper">
          <button class="btn btn-secondary">
            Login
          </button>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
.home {
  text-align: center;
}

.home-content-wrapper {
  margin-bottom: 80px;
}

.home-content-title {
  font-size: 42px;
  font-weight: 400;
  color: var(--clr-black);
  margin-bottom: 26px;
}

.home-content-text {
  letter-spacing: 1.4px;
  margin-bottom: 40px;
}
.home-user {
  position: relative;
  background-image: url('/images/pregnant-woman.jpeg');
  background-repeat:no-repeat;
  background-position: center center;
  background-size: cover;
  height: 42vh;
  width: 100%;
}

.home-user-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 360px;
  width: 760px;
  background-color: var(--clr-brown);
  padding: 30px 50px;
}

.home-user-title {
  font-weight: 400;
  font-size: 42px;
  letter-spacing: 1.2px;
  color: var(--clr-white);
  margin-bottom: 30px;
}

.home-user-content {
  color: var(--clr-white);
  letter-spacing: 1.2px;
  line-height: 1.8;
  margin-bottom: 26px;
}
</style>
