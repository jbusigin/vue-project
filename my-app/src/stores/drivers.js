import { defineStore } from 'pinia'
import mockData from '../static/mock_data.json'

export const useDriverStore = defineStore({
    id: 'drivers',
    state: () => ({
        drivers: [],
        driver: null,
        driversAvailable: false,
        loading: false,
        error: null
    }),
    getters: {},
    actions: {
        addDriver(newData) {
            if(Object.keys(newData).length){
                this.drivers.push({
                    "id": Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), // quick guid
                    "first_name": newData.first_name,
                    "last_name": newData.last_name,
                    "email": newData.email,
                });
            }
        },
        removeDriver(id) {
            this.drivers = this.drivers.filter((driver) => String(driver.id) !== String(id));
        },
        updateDriver(updateData) {
            const id = updateData.id;
            let key = -1;
            let driverData = (this.drivers).find(function(e, idx) {
                if(String(e.id) === String(id)){
                    key = idx;
                    return e;
                }
            });
            if(driverData){
                this.drivers[key] = {
                    "id": updateData.id,
                    "first_name": updateData.first_name,
                    "last_name": updateData.last_name,
                    "email": updateData.email,
                }
            }else{
                console.error(`Driver ID ${id} not found`);
            }
        },
        loadDrivers() {
            this.loading = false;
            // this.drivers = mockData;
            this.drivers = this.drivers.concat(mockData);
            this.driversAvailable = true;
        }
    }
})
