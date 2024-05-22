import { defineStore } from 'pinia'

export const useVehicleStore = defineStore({
    id: 'vehicles',
    state: () => ({
        vehicles: [
            {
                "id": 1,
                "name": "Clark A13 Forklift",
                "type": "Forklift",
                "manufacturer": "Clark"
            },
            {
                "id": 2,
                "name": "Toyota ForkMaster",
                "type": "Forklift",
                "manufacturer": "Toyota"
            },
            {
                "id": 3,
                "name": "Cat T5 Forklift",
                "type": "Forklift",
                "manufacturer": "Cat"
            },
            {
                "id": 4,
                "name": "Cart 1",
                "type": "Golf Cart",
                "manufacturer": "Yuanhai"
            },
            {
                "id": 5,
                "name": "Cart 2",
                "type": "Golf Cart",
                "manufacturer": "Yuanhai"
            },
            {
                "id": 6,
                "name": "Toyo-Ace Truck",
                "type": "Light Truck",
                "manufacturer": "Toyo"
            },
            {
                "id": 7,
                "name": "Toyota Light Truck w/ Tailgate",
                "type": "Light Truck",
                "manufacturer": "Toyota"
            }
        ],
        vehicle: null,
        vehiclesAvailable: true,
        loading: false,
        error: null
    }),
    getters: {},
    actions: {
        getVehicleByID(id) {
            return this.vehicles.find((e) => String(e.id) === String(id));
        }
    }
})
