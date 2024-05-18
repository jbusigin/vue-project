<template>



  <v-card>
    <v-tabs
      v-model="tab"
      bg-color="primary"
    >
      <v-tab value="one">Item One</v-tab>
      <v-tab value="two">Item Two</v-tab>
      <v-tab value="three">Item Three</v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one">
          One
        </v-tabs-window-item>

        <v-tabs-window-item value="two">
          Two
        </v-tabs-window-item>

        <v-tabs-window-item value="three">
          Three
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>



  <div>
    <h1></h1>
  </div>

<!--
  <v-btn @click="addDriver({first_name: 'Elvis'})">{{ $t('action-add') }}</v-btn>
  <v-btn @click="removeDriver(1)">{{ $t('action-delete') }}</v-btn>
--> 

  <main>
  

    <div>

      <div v-if="loading">{{ $t('driver_list-loading') }}</div>
      <div v-if="error">{{ $t('driver_list-loading-error') }}</div>

      <div v-if="!drivers && !loading && !error">
        {{ $t('driver_list-nothing-to-display') }}
      </div>

      <v-card v-else id="driver-list-table">

        <v-card-title>
          {{ $t('driver_list-title') }}
          
          <v-spacer/>

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>

        </v-card-title>

          <v-data-table
            :items="drivers"
            :headers="headers"
            :hide-default-footer="drivers.length < 3"
            :items-per-page-text="$t('driver_list-items-per-page')"
            loading-text="{{ $t('driver_list-loading') }}"
            >

            <template v-slot:top>
              <div>
                <v-btn @click="addDriver({first_name: 'Flavis'})">{{ $t('action-add') }}</v-btn>
                <v-btn>{{ $t('action-import') }}</v-btn>
                <v-btn>{{ $t('action-export') }}</v-btn>
              </div>
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
              {{ item.activity }}
            </template>

            <template v-slot:item.action="{ item }">
              {{ item.id }}

    <v-icon
      color="green-darken-2"
      icon="mdi-domain"
      size="large"
    ></v-icon>
    <v-icon icon="mdi-alert-circle" size="small"></v-icon>
    <v-icon icon="mdi-pencil" size="small"></v-icon>
    <v-icon>mdi-home</v-icon>

            </template>

          </v-data-table>



        </v-card>

    </div>


  </main>

</template>
  

<script setup>
  ///////will execute every time an instance of the component is created.

  import { storeToRefs } from 'pinia'
  import { useDriverStore } from '../stores/drivers'
  import {useI18n} from 'vue-i18n'
  const i18n = useI18n()


  const { drivers, loading, error } = storeToRefs(useDriverStore())
  const { loadDrivers, addDriver, removeDriver } = useDriverStore()

  const headers = [
    { title: i18n.t('driver_list-thead_id'), key: 'id' },
    { title: i18n.t('driver_list-thead_fname'), key: 'last_name' },
    { title: i18n.t('driver_list-thead_tname'), key: 'first_name' },
    { title: i18n.t('driver_list-thead_email'), key: 'email', sortable: false },
    { title: i18n.t('driver_list-thead_phone'), key: 'phone', sortable: false },
    { title: i18n.t('driver_list-thead_ptype'), key: 'phone_type' },
    { title: i18n.t('driver_list-thead_assigned'), key: 'assignment' },
    { title: i18n.t('driver_list-thead_activity'), key: 'activity' },
    { title: '', key: 'action' },
  ];

  // export default {
  //   data () {
  //     parsedDrivers: []
  //   },
  //   methods: {
  //     parseDrivers(){
  //     }
  //   },
  // }

  loadDrivers()
  
</script>
<script>
  export default {
    data: () => ({
      tab: null,
      search: '',
    }),
  }
</script>





<style lang="scss" scoped>

  #driver-list-table {
    tr:nth-of-type(odd) td {
      background-color: rgba(0, 0, 0, .01);
    }
  }




</style>
  