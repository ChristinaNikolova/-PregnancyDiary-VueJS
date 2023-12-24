<script setup></script>

<template>
  <footer class="footer">
    <div class="footer-nav-wrapper">
      <nav class="footer-left-nav">
        <ul class="footer-nav-ul">
          <li class="footer-nav-li">
            Home
          </li>
          <li class="footer-nav-li">
            Create new diary
          </li>
          <li class="footer-nav-li">
            Diaries
          </li>
          <li class="footer-nav-li" />
        </ul>
      </nav>
      <nav class="footer-right-nav">
        <ul class="footer-nav-ul">
          <li class="footer-nav-li">
            Blog
          </li>
          <li class="footer-nav-li">
            Favourites
          </li>
          <li class="footer-nav-li">
            Logout
          </li>
        </ul>
      </nav>
    </div>
    <p class="footer-text">
      &copy;{{ new Date().getFullYear() }},
      <a href="https://github.com/ChristinaNikolova/PregnancyDiary-VueJS" rel="noreferrer" target="_blank">Pregnancy Diary by Christina Nikolova</a>
    </p>
  </footer>
</template>

<style scoped>
.footer {
  height: 22vh;
  font-size: 18px;
  padding: 60px 60px;
}

.footer-nav-wrapper {
  display: flex;
  gap: 400px;
  margin-bottom: 60px;
}

.footer-nav-ul {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-nav-li:hover {
  cursor: pointer;
  text-decoration: underline;
}

.footer-text {
  text-align: center;
  font-size: 18px;
}

.footer-text a {
  color: var(--clr-black);
}

.footer-text a:hover {
  text-decoration: underline;
}
</style>
