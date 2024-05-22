<template>

  <div v-if="error">{{ $t('vehicle_list-loading-error') }}</div>
  <div v-else-if="loading">{{ $t('vehicle_list-loading') }}</div>

  <v-card flat>

    <template v-slot:title>
      <v-row align="center">
        <v-col>
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
      :items-per-page-text="$t('vehicles_list-items-per-page')"
      loading-text="{{ $t('vehicles_list-loading') }}"
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
  const { loadVehicles, addVehicle, removeVehicle } = useVehicleStore()

//   console.error('Remove loadVehicles');
//   loadVehicles();

</script>
<script>
  export default {
    name: 'VehicleList',
    data () {
      return {

      }
    },
    computed: {
      headers (vm) {
        return [
          // Headers are computed to allow for translations
          { key: 'name', title: vm.$t('vehicles_list-thead_name') },
          { key: 'type', title: vm.$t('vehicles_list-thead_type') },
          { key: 'manufacturer', title: vm.$t('vehicles_list-thead_manufacturer') },
          { key: 'action', title: '', value: null, sortable: false },
        ]
      },
      isMobile (vm) {
        return vm.$vuetify.display.smAndDown
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>