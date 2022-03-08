<template>
  <div class="not-found-container">
    <div class="not-found-status">404</div>
    <div class="not-found">
      <h1>Страница не найдена</h1>
      <p>К сожалению, страница, которую Вы запросили, не существует.</p>
      <p>
        Вы можете перейти на <router-link :to="{ name: 'main' }">главную страницу</router-link>.
      </p>
    </div>

  </div>
</template>

<style>
.not-found-container {
  display: flex;
  width: 50%;
  background-color: white;
  color: #404040;
  vertical-align: middle;
  margin-top: 40px;
  padding: 20px;
}
.not-found {
  display: block;
  color: #666;
}
.not-found h1 {
  margin: 30px 0 20px 0;
}

.not-found p {
  font-size: 20px;
  line-height: normal;
}

.not-found-status {
  color: #bbb;
  width: 30%;
  font-size: 140px;
  font-weight: bold;
  text-align: center;
}
</style>
