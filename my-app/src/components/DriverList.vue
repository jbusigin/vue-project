<template>

  <div v-if="error">{{ $t('driver_list-loading-error') }}</div>
  <div v-else-if="loading">{{ $t('driver_list-loading') }}</div>

  <v-card flat>

    <template v-slot:title>
      <v-row align="center">
        <v-col class="page-title pr-0">
          {{ $t('driver_list-title') }}
        </v-col>
        <v-spacer />
        <v-col align="right" class="pl-0">

          <v-toolbar
            density="compact"
            class="utility-bar"
          >
            <v-spacer />
            <DriverAdd />
            <v-btn
              @click="loadDrivers"
              prepend-icon="mdi-import"
              :stacked="isMobile"
              :size="isMobile ? 'x-small' : 'small'"
            >
              {{ $t('action-import') }}
            </v-btn>
            <v-btn
              :disabled="!driversAvailable"
              prepend-icon="mdi-export"
              :stacked="isMobile"
              :size="isMobile ? 'x-small' : 'small'"
            >
              {{ $t('action-export') }}
              <v-tooltip
                activator="parent"
                location="top"
              >
                {{ $t('tooltip-export-msg') }}
              </v-tooltip>
            </v-btn>
            <v-spacer />
          </v-toolbar>

        </v-col>
      </v-row>
    </template>

    <div v-if="!driversAvailable" class="no-drivers-msg">
      <DriverAdd iconActivator="true" />
    </div>
    <v-data-table
      v-else
      class="driver-list-table"
      :items="drivers"
      :headers="headers"
      :search="search"
      :density="isMobile ? 'compact' : 'default'"
      :hide-default-footer="drivers.length <= 10"
      :items-per-page-text="$t('driver_list-items-per-page')"
      loading-text="{{ $t('driver_list-loading') }}"
      :fixed-header="true"
      :mobile="isMobile"
    >

      <template v-slot:top>
        <v-row>
          <v-col :align="isMobile ? 'center' : 'right'">
            <v-text-field
              class="search-field"
              v-model="search"
              :label="$t('action-search')"
              prepend-inner-icon="mdi-magnify"
              variant="underlined"
              hide-details
              single-line
            ></v-text-field>
          </v-col>
        </v-row>
      </template>

      <template v-slot:item.full_name="{ item }">
        <span class="nowrap">{{ item.first_name }} {{ item.last_name }}</span>
      </template>

      <template v-slot:item.contact="{ item }">
        <span class="nowrap phone">
          <a :href="'tel:' + item.phone" :style="item.prefer_contact === 'phone' ? 'font-weight: 700;' : ''">{{ item.phone }}</a>
        </span>
        <span class="nowrap email">
          <a :href="'mailto:' + item.email" :style="item.prefer_contact === 'email' ? 'font-weight: 700;' : ''">{{ item.email }}</a>
        </span>
      </template>

      <template v-slot:item.assignment="{ item }">
        {{ item.assignment ? v_Store.getVehicleByID(item.assignment).name : '--' /* user data - not translated */ }}
        <span class="small">{{ item.assignment ? v_Store.getVehicleByID(item.assignment).type : '' /* user data - not translated */ }}</span>
      </template>

      <template v-slot:item.location="{ item }">
        {{ item.location ? l_Store.getLocationByID(item.location).name : '--' /* user data - not translated */ }}
        <span class="small">{{ item.location ? l_Store.getLocationByID(item.location).type : '' /* user data - not translated */ }}</span>
      </template>

      <template v-slot:item.activity="{ item }">
        <div class="activity-spark">
          <v-sparkline
            class="activity-svg"
            auto-line-width
            fill="fill"
            line-width="0"
            :model-value="item.activity"
            padding="5"
            smooth
            stroke-linecap="round"
            type="trend"
            color="#bbb"
          ></v-sparkline>
        </div>
        <div class="activity-label">
          {{ $t('driver_list-thead_activity') }}:
          <v-icon v-for="n in activityStatus(item.activity)" icon="mdi-square" size="x-small" :class="'activity-indicator-' + activityStatus(item.activity)"></v-icon>
        </div>
      </template>

      <template v-slot:item.action="{ item }">
        <div class="d-flex justify-end">
          <DriverDetails :driverData="item"/>
        </div>
      </template>

    </v-data-table>
  </v-card>
</template>
  

<script setup>
  // Pinia is using the Composition API
  import { storeToRefs } from 'pinia'
  import { useDriverStore } from '@/stores/drivers'
  import { useVehicleStore } from '@/stores/vehicles'
  import { useLocationStore } from '@/stores/locations'
  const { drivers, loading, error, driversAvailable } = storeToRefs(useDriverStore())
  const { loadDrivers, addDriver, removeDriver } = useDriverStore()
  const v_Store = useVehicleStore()
  const l_Store = useLocationStore()
</script>
<script>
  import DriverDetails from '@/components/DriverDetails.vue'
  import DriverAdd from '@/components/DriverAdd.vue'

  export default {
    name: 'DriverList',
    data () {
      return {
        search: ''
      }
    },
    methods: {
      activityStatus (arr) {
        const level = arr.reduce((partialSum, a) => partialSum + a, 0);
        if(level >= 50){
          return 3;
        } else if(level >= 30) {
          return 2;
        } else {
          return 1;
        }
      }
    },
    computed: {
      headers (vm) {
        // Headers are computed to allow for translations
        return [
          { key: 'full_name', title: vm.$t('driver_list-thead_fullname'), sortable: false },
          { key: 'last_name', title: vm.$t('driver_list-thead_lname') },
          { key: 'first_name', title: vm.$t('driver_list-thead_fname') },
          { key: 'contact', title: vm.$t('driver_list-thead_contact'), sortable: false },
          { key: 'assignment', title: vm.$t('driver_list-thead_assigned') },
          { key: 'location', title: vm.$t('driver_list-thead_location') },
          { key: 'activity', title: vm.$t('driver_list-thead_activity'), sortable: false },
          { key: 'action', title: '', value: null, sortable: false },
        ]
      },
      isMobile (vm) {
        return vm.$vuetify.display.smAndDown
      }
    },
    components: {
      DriverDetails,
      DriverAdd,
    }
  }
</script>

<style lang="scss" scoped>

  .utility-bar {
    width: auto;
    display: inline-block;
    border-radius: 5px;
    padding: 5px;
    background-color: rgb(var(--v-theme-light-gray));
    &:deep(.v-toolbar__content) {
      height: 40px !important;
    }
  }

  .search-field {
    max-width: 270px;
    width: auto;
    margin: 0 15px 15px 0;
  }

  .no-drivers-msg {
    text-align: center;
  }

  .driver-list-table {
    &:deep(th span) {
      white-space: nowrap;
    }

    &:deep(tr:nth-of-type(odd) td) {
      background-color: rgb(var(--v-theme-lighter-gray));
    }

    &:deep(tr td span) {
      display: block;
    }

    &:deep(tr td .nowrap) {
      white-space: nowrap;
    }

    &:deep(tr td .small) {
      font-size: 0.7rem;
      font-weight: 400;
    }

    &:deep(tr td .phone a),
    &:deep(tr td .email a) {
      font-size: 0.75rem;
      text-decoration: none;
      color: rgb(var(--v-theme-anchor));
    }

    &:deep(tr:not(.expanded-row) th:first-child),
    &:deep(tr:not(.expanded-row) td:first-child) { // hide first for !isMobile
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 1px;
    }

    .activity-spark {
      border: 1px solid #eaeaea;
      border-radius: 1px;
      padding: 0px;
      background: #fff;
    }
    .activity-label {
      margin: 0;
      font-size: 0.7rem;
      white-space: nowrap;

      .activity-indicator- {
        &1 {
          color: #edaa53;
        }
        &2 {
          color: #5a8eee;
        }
        &3 {
          color: #1fbe1f;
        }
      }
    }
  }

  @media screen and (max-width: 959px) {

    .utility-bar {
      min-width: 200px;
      .v-btn,
      &:deep(.v-btn) {
        width: 33.3%;
      }
    }

    .search-field {
      max-width: calc(100% - 30px);
      margin: 0;
    }

    .driver-list-table { 
      
      &:deep(thead > tr > th) { // add some space after sorting
        height: auto !important;
        padding-bottom: 20px !important;
      }

      &:deep(tr:not(.expanded-row) th:first-child),
      &:deep(tr:not(.expanded-row) td:first-child) { // show first 
        border: inherit;
        clip: unset;
        height: auto;
        margin: 0;
        position: static;
        padding: 0 16px;
        width: auto;
      }
      &:deep(tr:not(.expanded-row) td:nth-child(2)),
      &:deep(tr:not(.expanded-row) td:nth-child(3)) { // hide various data fields
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
      }

      &:deep(tr td span.phone a),
      &:deep(tr td span.email a) {
        font-size: 0.875rem;
      }

      &:deep(.v-data-table__tr--mobile .v-data-table__td) {
        grid-template-columns: 30% 70%;
        height: auto;
        padding-bottom: 15px;
      }

      &:deep(.v-data-table__tr--mobile .v-data-table__td-value) {
        text-align: left;
      }

    }

  }

  @media screen and (max-width: 500px) {
    .page-title {
      font-size: 1.1rem;
    }

    .utility-bar {
      padding: 0px;
      min-width: 0;
      &:deep(.v-btn) {
        padding: 0 6px;
        min-width: 50px;
      }
    }
  }

</style>
  