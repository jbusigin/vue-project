<template>
  <main>
    <v-card>
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="tab1">{{ $t('assignments-tab-one') }}</v-tab>
        <v-tab value="tab2">{{ $t('assignments-tab-two') }}</v-tab>
      </v-tabs>
      <v-card-text>
        <v-tabs-window v-model="tab">

          <v-tabs-window-item value="tab1">
            <DriverList></DriverList>
          </v-tabs-window-item>

          <v-tabs-window-item value="tab2">
            Two
          </v-tabs-window-item>

        </v-tabs-window>
      </v-card-text>
    </v-card>
</main>
</template>

<script>
  import DriverList from '../components/DriverList.vue';

  export default {
    data: () => ({
      tab: null,
    })
  }
</script>
