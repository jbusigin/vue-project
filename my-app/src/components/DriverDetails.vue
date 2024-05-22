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



      <v-card
        prepend-icon="mdi-account"
        title="User Profile"
      >
        <v-card-text>

          <v-form>

            <v-row dense>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                :label="$t('driver_details-label_fname') + '*'"
                v-model="first_name"
                required
                ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                hint="example of helper text only on focus"
                label="Middle name"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                hint="example of persistent helper text"
                :label="$t('driver_details-label_lname') + '*'"
                v-model="last_name"
                persistent-hint
                required
                ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
              :label="$t('driver_details-label_email')"
              v-model="email"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Password*"
                type="password"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Confirm Password*"
                type="password"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <v-select
                :items="['0-17', '18-29', '30-54', '54+']"
                label="Age*"
                required
              ></v-select>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <v-autocomplete
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                label="Interests"
                auto-select-first
                multiple
              ></v-autocomplete>
            </v-col>
            </v-row>

          </v-form>



          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        
        
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="plain"
            @click="resetModel(); dialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="updateDriver(getUpdate); dialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>
  

<script setup>
  import { useDriverStore } from '../stores/drivers'
  const { updateDriver } = useDriverStore()
</script>
<script>
  export default {
    props: {
      driverData: {}
    },
    data () {
      return {
        dialog: false,
        first_name: this.driverData.first_name,
        last_name: this.driverData.last_name,
        email: this.driverData.email,
      }
    },
    computed: {
      getUpdate() {
        return {
          "id": this.driverData.id,
          "first_name": this.first_name,
          "last_name": this.last_name,
          "email": this.email,
        }
      }
    },
    methods: {
      resetModel() {
        this.first_name = this.driverData.first_name;
        this.last_name = this.driverData.last_name;
        this.email =this.driverData.email;
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
  