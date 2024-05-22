<template>

  <div v-if="error">{{ $t('location_list-loading-error') }}</div>
  <div v-else-if="loading">{{ $t('location_list-loading') }}</div>

  <v-card flat>

    <template v-slot:title>
      <v-row align="center">
        <v-col>
          {{ $t('location_list-title') }}
        </v-col>
        <v-spacer />
        <v-col align="right">
        </v-col>
      </v-row>
    </template>

    <div v-if="!locationsAvailable" class="no-locations-msg">
      {{ $t('location_list-nothing-to-display') }}
    </div>
    <v-data-table
      v-else
      class="location-list-table"
      :items="locations"
      :headers="headers"
      :density="isMobile ? 'compact' : 'default'"
      :hide-default-footer="locations.length < 10"
      :items-per-page-text="$t('location_list-items-per-page')"
      loading-text="{{ $t('location_list-loading') }}"
      :fixed-header="true"
      :mobile="isMobile"
    >
    </v-data-table>
  </v-card>
</template>

<script setup>
  // Pinia is using the Composition API
  import { storeToRefs } from 'pinia'
  import { useLocationStore } from '@/stores/locations'
  const { locations, loading, error, locationsAvailable } = storeToRefs(useLocationStore())
</script>
<script>
  export default {
    name: 'LocationList',
    data () {},
    computed: {
      headers (vm) {
        // Headers are computed to allow for translations
        return [
          { key: 'name', title: vm.$t('location_list-thead_name') },
          { key: 'type', title: vm.$t('location_list-thead_type') },
          { key: 'location', title: vm.$t('location_list-thead_location') },
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