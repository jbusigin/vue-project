import { defineStore } from 'pinia'
import mockData from '../static/mock_data.json'
// import { useMockData } from "composables/mockData";

export const useDriverStore = defineStore({
    id: 'drivers',
    state: () => ({
        drivers: [],
        driver: null,
        loading: false,
        error: null
    }),
    getters: {
        getDriverByID: (state) => {
            return;
            // return (authorId) => state.posts.filter((post) => post.userId === authorId)
            // return state.comments.filter((post) => post.postId === postSore.post.id)
        }
    },
    actions: {
        addDriver(driver) {
            if(Object.keys(driver).length){
                this.drivers.push(driver);
            }
        },
        removeDriver(id) {
            // this.drivers = this.drivers.filter((driver) => driver.id !== id);
            this.drivers.splice(id, 1);
        },
        loadDrivers() {
            this.loading = false;
            this.resetMockData();
            return this.drivers;
        },
        resetMockData(){
            this.drivers = mockData;
        }
    }
})
