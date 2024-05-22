import { defineStore } from 'pinia'
import mockData from '@/static/mock_data.json'

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
                // simple "guid" for demo
                const guid = Math.floor(Math.random() * 1000000000); 

                // fake activity for demo
                const dataPoints = 10;
                const dataArray = [];
                for(let i= 0; i < dataPoints; i++){
                    dataArray.push(Math.floor(Math.random() * 11));
                }
            
                this.drivers.push({
                    "id": guid,
                    "first_name": newData.first_name,
                    "last_name": newData.last_name,
                    "full_name": newData.first_name +' '+ newData.last_name,
                    "email": newData.email,
                    "activity": dataArray
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
            this.drivers = this.drivers.concat(mockData);
            this.driversAvailable = true;
        }
    }
})
