<script setup>
</script>

<template>
  <header class="header">
    <div class="header-logo-wrapper">
      <p class="header-logo">
        Pregnancy Diary
      </p>
    </div>
    <nav class="header-nav">
      <ul class="header-nav-ul">
        <li class="header-nav-li">
          <router-link to="/">
            Home
          </router-link>
        </li>
        <li class="header-nav-li">
          Administration
        </li>
        <li class="header-nav-li">
          Create new diary
        </li>
        <li class="header-nav-li">
          Diaries
        </li>
        <li class="header-nav-li">
          <router-link to="/blog?page=1&query=">
            Blog
          </router-link>
        </li>
        <li class="header-nav-li">
          Favourites
        </li>
        <li class="header-nav-li">
          Logout
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding-top: 50px;
  padding-bottom: 30px;
}

.header-logo {
  color: var(--clr-brown);
  font-weight: 800;
  font-size: 24px;
  letter-spacing: -.5px;
}

.header-nav-ul {
  display: flex;
  gap: 40px;
  font-size: 18px;
}

.header-nav-li a.router-link-active {
  text-decoration: underline;
}

.header-nav-li:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
