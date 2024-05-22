<template>
  <AppLoading />

  Redirecting in 5 seconds...
  <v-btn to="assignments">Go now</v-btn>
</template>

<script setup>

  import {useRouter} from 'vue-router';
  const router = useRouter();

  // simulate loading of app by waiting 5 sec
  setTimeout(() => {                      
    router.push('assignments');
  }, 5000);

</script>
