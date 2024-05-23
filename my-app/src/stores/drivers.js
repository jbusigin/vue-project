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
                newData.guid = Math.floor(Math.random() * 1000000000); 
                
                // fake activity for demo
                const dataPoints = 10;
                newData.activity = [];
                for(let i= 0; i < dataPoints; i++){
                    newData.activity.push(Math.floor(Math.random() * 11));
                }
            
                this.drivers.push(newData);
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
                this.drivers[key] = updateData;
            }else{
                console.error(`Driver ID ${id} not found`);
            }
        },
        loadDrivers() {
            this.loading = false;
            if(!Object.keys(this.drivers).length){
                this.drivers = this.drivers.concat(mockData);
            }
            this.driversAvailable = true;
        }
    }
})
