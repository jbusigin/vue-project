<template>

  <v-dialog
    v-model="dialog"
    max-width="600"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        prepend-icon="mdi-account-plus"
        :stacked="$vuetify.display.smAndDown"
        :text="$t('action-add')"
        v-bind="activatorProps"
        :size="$vuetify.display.smAndDown ? 'x-small' : 'small'"
      ></v-btn>
    </template>

      <v-card
        prepend-icon="mdi-account"
        :title="$t('driver_add_dialog-title')"
      >
        <v-card-text>

          <fieldset>
            <legend>{{ $t('driver_add_section-driver') }}</legend>
            <v-row dense>
              <v-col cols="12" md="6" sm="6">

                <v-text-field
                  :label="$t('driver_add-field_fname') +'*'"
                  required
                ></v-text-field>

              </v-col>
              <v-col cols="12" md="6" sm="6">

                <v-text-field
                  :label="$t('driver_add-field_lname') +'*'"
                  required
                ></v-text-field>

              </v-col>
              <v-col cols="12" md="4" sm="6">

                <v-text-field
                  :label="$t('driver_add-field_phone') +'*'"
                  required
                ></v-text-field>

              </v-col>
              <v-col cols="12" md="4" sm="6">

                <v-text-field
                  :label="$t('driver_add-field_email') +'*'"
                  required
                ></v-text-field>

              </v-col>
              <v-col cols="12" md="4" sm="6">

                <v-text-field
                  :label="$t('driver_add-field_prefered_contact') +'*'"
                  required
                ></v-text-field>

              </v-col>
            </v-row>
          </fieldset>

          <fieldset>
            <legend>{{ $t('driver_add_section-assignments') }}</legend>
            <v-row dense>
              <v-col cols="12" sm="12">

                <v-select
                  :items="l_Store.getAllLocations"
                  item-title="name"
                  item-value="id"
                  :label="$t('driver_add-field_location')"
                ></v-select>

              </v-col>
              <v-col cols="12" sm="12">

                <v-select
                  :items="v_Store.getAllVehicles"
                  item-title="name"
                  item-value="id"
                  :label="$t('driver_add-field_vehicle')"
                ></v-select>

              </v-col>
            </v-row>
          </fieldset>

          <small class="text-caption text-medium-emphasis">*{{ $t('driver_add-required_message') }}</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            :text="$t('action-cancel')"
            variant="plain"
            @click="dialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            :text="$t('action-save')"
            variant="tonal"
            @click="dialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>

</template>
  
<script setup>
  // Pinia is using the Composition API
  import { storeToRefs } from 'pinia'
  import { useVehicleStore } from '@/stores/vehicles'
  import { useLocationStore } from '@/stores/locations'
  const v_Store = useVehicleStore()
  const l_Store = useLocationStore()
</script>
<script>
  export default {
    data: () => ({
      dialog: false,
    }),
  }
</script>

<style lang="scss" scoped>
  fieldset {
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid #ddd;
    margin-bottom: 30px
  }
</style>
  