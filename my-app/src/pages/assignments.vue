<template>
  <main>
    <v-container>
      <v-row>
        <v-col>
          <router-link to="/">
            <v-img class="osg-logo" src="@/assets/onestepgps_color_logotype.svg"/>
          </router-link>
        </v-col>
        <v-spacer/>
        <v-col align="right">
          <v-select
            @update:modelValue="changeLocale"
            :label="$t('action-switch_lang')"
            density="compact"
            :items="lang_select_items"
            item-title="label"
            item-value="value"
            variant="outlined"
            v-model="lang_select_default"
          ></v-select>
        </v-col>
      </v-row>
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
                  <DriverList></DriverList>
                </v-tabs-window-item>

                <v-tabs-window-item value="tab2">
                  Vehicles
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

  export default {
    name: 'assignments',
    data (vm) {
      return {
        tab: null,
        lang_select_default: {
          label: vm.$t('action-lang_en'), value: 'en'
        },
        lang_select_items: [
          { label: vm.$t('action-lang_en'), value: 'en'},
          { label: vm.$t('action-lang_es'), value: 'es'},
          { label: vm.$t('action-lang_fr'), value: 'fr'}
        ]
      }
    },
    components: {
      DriverList
    },
    methods: {
      changeLocale (locale) {
        this.$vuetify.locale.current = this.$i18n.locale = locale // vuetify ui & app ui elements
      },
    },
  }
</script>

<style lang="scss" scoped>
  .osg-logo {
    max-width: 200px;
  }
</style>
