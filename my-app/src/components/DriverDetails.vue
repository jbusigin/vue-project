<template>

  <v-dialog
    v-model="dialog"
    max-width="600"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        prepend-icon="mdi-pencil"
        :text="$t('action-edit')"
        v-bind="activatorProps"
        variant="text"
        size="small"
      ></v-btn>
    </template>

    <v-form ref="form" lazy-validation v-model="valid">
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
                  variant="outlined"
                  v-model="fieldData.first_name"
                  :rules="nameValidation"
                  :density="isMobile ? 'compact' : 'default'"
                ></v-text-field>

              </v-col>
              <v-col cols="12" md="6" sm="6">

                <v-text-field
                  :label="$t('driver_add-field_lname') +'*'"
                  required
                  variant="outlined"
                  v-model="fieldData.last_name"
                  :rules="nameValidation"
                  :density="isMobile ? 'compact' : 'default'"
                ></v-text-field>

              </v-col>
              <v-col cols="12" md="6" sm="6">

                <v-text-field
                  :label="$t('driver_add-field_phone') +'*'"
                  required
                  variant="outlined"
                  v-model="fieldData.phone"
                  :rules="phoneValidation"
                  :density="isMobile ? 'compact' : 'default'"
                ></v-text-field>

              </v-col>
              <v-col cols="12" md="6" sm="6">

                <v-text-field
                  :label="$t('driver_add-field_email') +'*'"
                  required
                  variant="outlined"
                  v-model="fieldData.email"
                  :rules="emailValidation"
                  :density="isMobile ? 'compact' : 'default'"
                ></v-text-field>

              </v-col>
              <v-col cols="12" md="12" sm="12">

                <v-radio-group
                  :label="$t('driver_add-field_prefered_contact')"
                  v-model="fieldData.prefer_contact"
                  inline
                  :density="isMobile ? 'compact' : 'default'"
                >
                  <v-radio :label="$t('driver_add-field_phone')" value="phone"></v-radio>
                  <v-radio :label="$t('driver_add-field_email')" value="email"></v-radio>
                </v-radio-group>

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
                  variant="outlined"
                  v-model="defaultLocation"
                  :density="isMobile ? 'compact' : 'default'"
                ></v-select>

              </v-col>
              <v-col cols="12" sm="12">

                <v-select
                  :items="v_Store.getAllVehicles"
                  item-title="name"
                  item-value="id"
                  :label="$t('driver_add-field_vehicle')"
                  variant="outlined"
                  v-model="defaultAssignment"
                  :density="isMobile ? 'compact' : 'default'"
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
            @click="submitForm"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
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
  import { mapState, mapActions } from 'pinia'
  import { useDriverStore } from '@/stores/drivers'
  import { useVehicleStore } from '@/stores/vehicles'
  import { useLocationStore } from '@/stores/locations'

  export default {
    props: {
      driverData: {}
    },
    data (vm) {
      return {
        dialog: false,
        valid: false,
        fieldData: {
          id: this.driverData.id,
          first_name: this.driverData.first_name,
          last_name: this.driverData.last_name,
          phone: this.driverData.phone,
          email: this.driverData.email,
          prefer_contact: 'phone',
          location: this.driverData.location,
          assignment: this.driverData.assignment,
          activity: this.driverData.activity,
        },
        defaultAssignment: {
          id: this.driverData.assignment,
          name: this.getVehicleByID(this.driverData.assignment).name,
        },
        defaultLocation: {
          id: this.driverData.location,
          name: this.getLocationByID(this.driverData.location).name,
        },
        nameValidation: [
          (v) => !!v || vm.$t('validation-name_required'),
          (v) => v.length >= 3 || vm.$t('validation-name_length')
        ],
        phoneValidation: [
          (v) => !!v || vm.$t('validation-phone_required')
        ],
        emailValidation: [
          (v) => !!v || vm.$t('validation-email_required'),
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || vm.$t('validation-email_format')
        ],
      }
    },
    methods: {
      ...mapActions(useDriverStore, ['updateDriver']),
      ...mapActions(useVehicleStore, ['getVehicleByID']),
      ...mapActions(useLocationStore, ['getLocationByID']),
      async submitForm(){
        const isVaild = await this.$refs.form.validate();
        if(isVaild.valid){
          await this.updateDriver(this.fieldData);
          this.dialog = false;
        }
      },
      resetModel() {
        this.fieldData = {
          id: this.driverData.id,
          first_name: this.driverData.first_name,
          last_name: this.driverData.last_name,
          phone: this.driverData.phone,
          email: this.driverData.email,
          prefer_contact: 'phone',
          location: this.driverData.location,
          assignment: this.driverData.assignment,
          activity: this.driverData.activity,
        };
      }
    },
    computed: {
      isMobile (vm) {
        return vm.$vuetify.display.smAndDown
      }
    },
    watch: {
      dialog(status) {
        if (status) { // clear form on open
          this.resetModel();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  fieldset {
    padding: 20px 20px 10px 20px;
    border-radius: 5px;
    border: 1px solid #ddd;
    margin-bottom: 30px;

    @media screen and (max-width: 959px) {
      padding: 10px 10px 0px 10px;
      margin-bottom: 20px
    }
  }
</style>
  