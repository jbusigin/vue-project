<template>

  <div v-if="error">{{ $t('vehicle_list-loading-error') }}</div>
  <div v-else-if="loading">{{ $t('vehicle_list-loading') }}</div>

  <v-card flat>

    <template v-slot:title>
      <v-row align="center">
        <v-col class="page-title">
          {{ $t('vehicle_list-title') }}
        </v-col>
        <v-spacer />
        <v-col align="right">
        </v-col>
      </v-row>
    </template>

    <div v-if="!vehiclesAvailable" class="no-vehicles-msg">
      {{ $t('vehicle_list-nothing-to-display') }}
    </div>
    <v-data-table
      v-else
      class="vehicle-list-table"
      :items="vehicles"
      :headers="headers"
      :density="isMobile ? 'compact' : 'default'"
      :hide-default-footer="vehicles.length < 10"
      loading-text="{{ $t('vehicle_list-loading') }}"
      :fixed-header="true"
      :mobile="isMobile"
    >
    </v-data-table>
  </v-card>
</template>

<script setup>
  // Pinia is using the Composition API
  import { storeToRefs } from 'pinia'
  import { useVehicleStore } from '@/stores/vehicles'
  const { vehicles, loading, error, vehiclesAvailable } = storeToRefs(useVehicleStore())
</script>
<script>
  export default {
    name: 'VehicleList',
    computed: {
      headers (vm) {
        // Headers are computed to allow for translations
        return [
          { key: 'name', title: vm.$t('vehicle_list-thead_name') },
          { key: 'type', title: vm.$t('vehicle_list-thead_type') },
          { key: 'manufacturer', title: vm.$t('vehicle_list-thead_manufacturer') },
        ]
      },
      isMobile (vm) {
        return vm.$vuetify.display.smAndDown
      }
    }
  }
</script>

<style lang="scss" scoped>

  .vehicle-list-table {
    &:deep(tr:nth-of-type(odd) td) {
      background-color: rgb(var(--v-theme-lighter-gray));
    }
    @media screen and (max-width: 959px) {
      &:deep(.v-data-table__tr--mobile .v-data-table__td) {
        grid-template-columns: 30% 70%;
        height: auto;
        padding-top: 10px;
        padding-bottom: 10px;
      }
      &:deep(.v-data-table__tr--mobile .v-data-table__td-value) {
        text-align: left;
      }
    }
  }

</style>