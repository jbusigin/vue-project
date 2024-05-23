import { defineStore } from 'pinia'

export const useLocationStore = defineStore({
    id: 'locations',
    state: () => ({
        locations: [
            {
                "id": "1",
                "name": "Greenwood Shipping Center",
                "type": "Warehouse",
                "map": "",
                "city": "Seattle",
                "state": "WA"
            },
            {
                "id": "2",
                "name": "Container Storage",
                "type": "Yard",
                "map": "",
                "city": "Industry",
                "state": "CA"
            },
            {
                "id": "3",
                "name": "Municipal Airport",
                "type": "Airport",
                "map": "",
                "city": "Boulder",
                "state": "CO"
            },
            {
                "id": "4",
                "name": "Redrock Warehouse",
                "type": "Warehouse",
                "map": "",
                "city": "Sedona",
                "state": "AZ"
            },
            {
                "id": "5",
                "name": "Pacific Studios",
                "type": "Campus",
                "map": "",
                "city": "Los Angeles",
                "state": "CA"
            },
            {
                "id": "6",
                "name": "City University",
                "type": "Campus",
                "map": "",
                "city": "San Francisco",
                "state": "CA"
            },
            {
                "id": "7",
                "name": "Operations Logistics",
                "type": "Warehouse",
                "map": "",
                "city": "Las Vegas",
                "state": "NV"
            }
        ],
        location: null,
        locationsAvailable: true,
        loading: false,
        error: null
    }),
    getters: {
        getAllLocations: (state) => {
            return state.locations;
        }
    },
    actions: {
        getLocationByID (id) {
            return this.locations.find((e) => String(e.id) === String(id));
        }
    }
})
