<template>
  <v-app-bar elevation="0" color="transparent">
    <v-row align="center">
      <v-col class="px-7">

        <router-link to="/">
          <v-img class="osg-logo" src="@/assets/onestepgps_color_logotype.svg"/>
        </router-link>

      </v-col>
      <v-col align="right" class="px-7">

        <v-select
          class="lang-switcher"
          @update:modelValue="changeLocale"
          density="compact"
          :items="lang_select_items"
          item-title="label"
          item-value="value"
          variant="outlined"
          v-model="lang_select_default"
          hide-details="auto"
        ></v-select>

      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'appheader',
    data (vm) {
      return {
        lang_select_default: {
          label: vm.$t('action-lang_en'), value: 'en'
        }
      }
    },
    computed: {
      // Options are computed to allow for translations
      lang_select_items (vm) {
        return [
          { label: vm.$t('action-lang_en'), value: 'en'},
          { label: vm.$t('action-lang_es'), value: 'es'},
          { label: vm.$t('action-lang_fr'), value: 'fr'}
        ]
      }
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
  .lang-switcher {
    max-width: 150px;
    &:deep(.v-field){
      font-size: 0.875rem !important;
    }
  }
</style>
