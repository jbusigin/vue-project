<template>

  <div v-if="error">{{ $t('driver_list-loading-error') }}</div>
  <div v-else-if="loading">{{ $t('driver_list-loading') }}</div>

  <v-card flat>

    <template v-slot:title>
      <v-row align="center">
        <v-col>
          {{ $t('driver_list-title') }}
        </v-col>
        <v-spacer />
        <v-col align="right">

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
                >{{ $t('tooltip-export-msg') }}</v-tooltip>
            </v-btn>
            <v-spacer />
          </v-toolbar>

        </v-col>
      </v-row>
    </template>

    <div v-if="!driversAvailable" class="no-drivers-msg">
      {{ $t('driver_list-nothing-to-display') }}
    </div>
    <v-data-table
      v-else
      class="driver-list-table"
      :items="drivers"
      :headers="headers"
      :search="search"
      :density="isMobile ? 'compact' : 'default'"
      :hide-default-footer="drivers.length < 10"
      :items-per-page-text="$t('driver_list-items-per-page')"
      loading-text="{{ $t('driver_list-loading') }}"
      v-model:expanded="expanded"
      :fixed-header="true"
      :mobile="isMobile"
      show-expand
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
          <v-icon
            :icon="item.prefer_contact === 'phone' ? 'mdi-check-circle' : 'mdi-checkbox-blank-circle-outline'"
            :color="item.prefer_contact === 'phone' ? 'anchor' : 'mid-gray2'"
            size="x-small"
          /> &nbsp;
          <a :href="'tel:' + item.phone">{{ item.phone }}</a>
        </span>
        <span class="nowrap email">
          <v-icon
            :icon="item.prefer_contact === 'email' ? 'mdi-check-circle' : 'mdi-checkbox-blank-circle-outline'"
            :color="item.prefer_contact === 'email' ? 'anchor' : 'mid-gray2'"
            size="x-small"
          /> &nbsp;
          <a :href="'mailto:' + item.email">{{ item.email }}</a>
        </span>
      </template>

      <template v-slot:item.phone_type="{ item }">
        {{ item.phone_type ? item.phone_type : $t('driver_list-phone_type_unknown') }}
      </template>

      <template v-slot:item.assignment="{ item }">
        {{ vehicleStore.getVehicleByID(item.assignment).name /* user data - not translated */ }}
        {{ vehicleStore.getVehicleByID(item.assignment).type /* user data - not translated */ }}
      </template>

      <template v-slot:item.activity="{ item }">
        <v-sparkline
          class="activity-spark"
          :auto-line-width="sparkline.autoLineWidth"
          :fill="sparkline.fill"
          :line-width="sparkline.width"
          :model-value="item.activity"
          :padding="sparkline.padding"
          :smooth="sparkline.smoothing"
          :stroke-linecap="sparkline.lineCap"
          :type="sparkline.type"
          auto-draw
        ></v-sparkline>
        <div class="activity-label" :class="'activity-indicator-' + activityStatus(item.activity).toLowerCase() ">
          {{ activityStatus(item.activity) }}
        </div>
      </template>

      <template v-slot:item.action="{ item }">
        <div class="d-flex justify-end">
          <DriverDetails :driverData="item"/>
        </div>
      </template>

      <template v-slot:expanded-row="{ columns, item }">
        <tr class="expanded-row">
          <td :colspan="columns.length">
            More info about {{ item.name }}
          </td>
        </tr>
      </template>

    </v-data-table>
  </v-card>
</template>
  

<script setup>
  // Pinia is using the Composition API
  import { storeToRefs } from 'pinia'
  import { useDriverStore } from '@/stores/drivers'
  import { useVehicleStore } from '@/stores/vehicles'
  const { drivers, loading, error, driversAvailable } = storeToRefs(useDriverStore())
  const { loadDrivers, addDriver, removeDriver } = useDriverStore()
  const vehicleStore = useVehicleStore()

  console.error('Remove loadDrivers');
  loadDrivers();

</script>
<script>
  import DriverDetails from '@/components/DriverDetails.vue'
  import DriverAdd from '@/components/DriverAdd.vue'

  export default {
    name: 'DriverList',
    data () {
      return {
        search: '',
        expanded: [],
        sparkline: {
          width: 3,
          radius: 10,
          padding: 8,
          lineCap: 'round',
          smoothing: false,
          fill: false,
          type: 'trend',
          autoLineWidth: false,
        }
      }
    },
    methods: {
      activityStatus (arr) {
        const level = arr.reduce((partialSum, a) => partialSum + a, 0);
        if(level >= 50){
          return 'High';
        } else if(level >= 30) {
          return 'Low';
        } else {
          return 'Inactive';
        }
      }
    },
    computed: {
      headers (vm) {
        return [
          // Headers are computed to allow for translations
          { key: 'full_name', title: vm.$t('driver_list-thead_fullname'), sortable: false },
          { key: 'last_name', title: vm.$t('driver_list-thead_lname') },
          { key: 'first_name', title: vm.$t('driver_list-thead_fname') },
          { key: 'contact', title: vm.$t('driver_list-thead_contact'), sortable: false },
          { key: 'assignment', title: vm.$t('driver_list-thead_assigned') },
          { key: 'activity', title: vm.$t('driver_list-thead_activity'), sortable: false },
          { key: 'action', title: '', value: null, sortable: false },
          { title: '', key: 'data-table-expand' },
        ]
      },
      isMobile (vm) {
        return vm.$vuetify.display.smAndDown
      }
    },
    components: {
      DriverDetails,
      DriverAdd
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
    color: #ccc;
  }


  .driver-list-table {
    &:deep(tr:nth-of-type(odd) td) {
      background-color: rgb(var(--v-theme-lighter-gray));
    }

    &:deep(tr td span.nowrap) {
      white-space: nowrap;
      display: block;
    }

    &:deep(tr td .phone a),
    &:deep(tr td .email a) {
      font-size: 0.75rem;
      text-decoration: none;
      color: rgb(var(--v-theme-anchor));
    }

    &:deep(tr:not(.expanded-row) th:first-child),
    &:deep(tr:not(.expanded-row) td:first-child),
    &:deep(tr:not(.expanded-row) th:last-child),
    &:deep(tr:not(.expanded-row) td:last-child) { // hide first -and- last for !isMobile
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
      height: 15px;
      width: 100%;
      box-shadow: 0 0 0 1px #ddd;
    }
    .activity-label {
      margin: 4px 0 0 0;
      font-size: 0.75rem;
      font-weight: bold;

      &.activity-indicator- {
        &inactive {
          color: gray;
        }
        &high {
          color: green;
        }
        &low {
          color: red;
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
      &:deep(tr:not(.expanded-row) td:first-child),
      &:deep(tr:not(.expanded-row) th:last-child),
      &:deep(tr:not(.expanded-row) td:last-child)  { // show first -and- last
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




  //     &:deep(thead) {
  //       border: none;
  //       clip: rect(0 0 0 0);
  //       height: 1px;
  //       margin: -1px;
  //       overflow: hidden;
  //       padding: 0;
  //       position: absolute;
  //       width: 1px;
  //     }

  //     &:deep(td) {
  //       border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  //       display: block;
  //       text-align: right;
  //       line-height: 48px;
  //     }

  //     &:deep(td::before) {
  //       content: attr(data-label);
  //       float: left;
  //       font-weight: bold;
  //     }

  //     &:deep(td:last-child) {
  //       border-bottom: 0;
  //     }

  //     &:deep(tr:not(:first-child) > td:first-child) {
  //       border-top: medium solid rgba(var(--v-border-color), var(--v-border-opacity));
  //     }

    }

  }








</style>
  