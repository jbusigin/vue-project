<template>
  <main>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-tabs v-model="tab" bg-color="primary">
              <v-tab value="tab1">{{ $t('assignments-tab-one') }}</v-tab>
              <v-tab value="tab2">{{ $t('assignments-tab-two') }}</v-tab>
            </v-tabs>
            <v-card-text>
              <v-tabs-window v-model="tab">

                <v-tabs-window-item value="tab1">
                  <DriverList />
                </v-tabs-window-item>

                <v-tabs-window-item value="tab2">
                  <VehicleList />
                </v-tabs-window-item>

              </v-tabs-window>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
  import DriverList from '@/components/DriverList.vue';
  import VehicleList from '@/components/VehicleList.vue';

  export default {
    name: 'assignments',
    data (vm) {
      return {
        tab: null,
      }
    },
    components: {
      DriverList,
      VehicleList
    }
  }
</script>

<style lang="scss" scoped>
  .v-container {
    max-width: 1200px;
  }
  .v-tab {
    &[aria-selected="true"] {
      background-color: rgb(var(--v-theme-anchor));
    }
    &:deep(.v-tab__slider) {
      display: none;
    }
  }

</style>
