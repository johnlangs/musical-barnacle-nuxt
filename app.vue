<script setup lang="js">
import Header from './components/Header.vue';
</script>

<template>
  <div>
    <Header></Header>
    <div class="global">
      
    </div>
  </div>
</template>

<style>
/*Inter Font*/
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap');

/* Style sheet for MyApp.jsx */

/* padding should be applyed around all cards, 15px*/
.global {
  padding:15px;
}

.cardTitle {
  font-size: 1.5em;
  font-weight: 400;
  margin: inherit;
}

html,body { height: 100%; margin: 0px}
body {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
</style>
