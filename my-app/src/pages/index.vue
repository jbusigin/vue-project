<template>
  <AppLoading />
  <div style="text-align: center;">
    <v-btn to="assignments" variant="plain" size="small">skip</v-btn>
  </div>
</template>

<script setup>

  import {useRouter} from 'vue-router';
  const router = useRouter();

  // simulate loading of app by waiting 4.5 sec
  setTimeout(() => {                      
    router.push('assignments');
  }, 4500);

</script>
