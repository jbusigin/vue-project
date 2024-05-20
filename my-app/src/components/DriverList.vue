<template>

  <div v-if="error">{{ $t('driver_list-loading-error') }}</div>
  <div v-else-if="loading">{{ $t('driver_list-loading') }}</div>

  <v-card :title="$t('driver_list-title')" flat>

    <template v-slot:text>
      <DriverAdd />
      <v-btn @click="loadDrivers" size="small">
        {{ $t('action-import') }}
      </v-btn>

      <v-btn size="small" :disabled="!driversAvailable">
        {{ $t('action-export') }}
        <v-tooltip
          activator="parent"
          location="top"
          >{{ $t('tooltip-export-msg') }}</v-tooltip>
      </v-btn>

    </template>

    <div v-if="!driversAvailable">
      {{ $t('driver_list-nothing-to-display') }}
    </div>

    <div id="driver-list-table" v-else>
      <v-data-table 
        :items="drivers"
        :headers="headers"
        :search="search"
        :hide-default-footer="drivers.length < 10"
        :items-per-page-text="$t('driver_list-items-per-page')"
        loading-text="{{ $t('driver_list-loading') }}"
        >

        <template v-slot:top>
          <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
          ></v-text-field>
        </template>

        <template v-slot:item.email="{ item }">
          <a :href="'mailto:' + item.email">{{ item.email }}</a>
        </template>
        <template v-slot:item.phone="{ item }">
          <a :href="'tel:' + item.phone">{{ item.phone }}</a>
        </template>
        <template v-slot:item.phone_type="{ item }">
          {{ item.phone_type ? item.phone_type : $t('driver_list-phone_type_unknown') }}
        </template>
        <template v-slot:item.assignment="{ item }">
          {{ item.assignment ? item.assignment : $t('driver_list-driver_unassigned') }}
        </template>
        <template v-slot:item.activity="{ item }">
          <v-sparkline
            :auto-line-width="sparkline.autoLineWidth"
            :fill="sparkline.fill"
            :line-width="sparkline.width"
            :model-value="sparkline.value"
            :padding="sparkline.padding"
            :smooth="true"
            :stroke-linecap="sparkline.lineCap"
            :type="sparkline.type"
            auto-draw
            ></v-sparkline>
        </template>

        <template v-slot:item.action="{ item }">

  <v-icon
  color="green-darken-2"
  icon="mdi-domain"
  size="large"
  ></v-icon>
  <v-icon icon="mdi-alert-circle" size="small"></v-icon>
  <v-icon icon="mdi-pencil" size="small"></v-icon>
  <v-icon @click="removeDriver(item.id)">mdi-home</v-icon>

  <DriverDetails :driverData="item"/>


        </template>

      </v-data-table>
    </div>

  </v-card>
</template>
  

<script setup>
  // Pinia is using the Composition API
  import { storeToRefs } from 'pinia'
  import { useDriverStore } from '../stores/drivers'
  const { drivers, loading, error, driversAvailable } = storeToRefs(useDriverStore())
  const { loadDrivers, addDriver, removeDriver } = useDriverStore()
</script>
<script>
  import DriverDetails from './DriverDetails.vue'

  export default {
    name: 'DriverList',
    data (vm) {
      return {
        search: '',
        headers: [
          // { title: vm.$t('driver_list-thead_id'), key: 'id' },
          { key: 'last_name', title: vm.$t('driver_list-thead_lname') },
          { key: 'first_name', title: vm.$t('driver_list-thead_fname') },
          { key: 'email', title: vm.$t('driver_list-thead_email'), sortable: false },
          { key: 'phone', title: vm.$t('driver_list-thead_phone'), sortable: false },
          { key: 'phone_type', title: vm.$t('driver_list-thead_ptype') },
          { key: 'assignment', title: vm.$t('driver_list-thead_assigned') },
          { key: 'activity', title: vm.$t('driver_list-thead_activity'), sortable: false },
          { key: 'action', title: '', sortable: false },
        ],
        sparkline: {
          width: 2,
          radius: 10,
          padding: 8,
          lineCap: 'round',
          value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
          fill: false,
          type: 'trend',
          autoLineWidth: false,
        }
      }
    },
    components: {
      DriverDetails
    }
  }
</script>
<style lang="scss" scoped>
  #driver-list-table {
    &:deep(table tr:nth-of-type(odd) td) {
      background-color: rgba(0, 0, 0, .02);
    }
  }
</style>
  