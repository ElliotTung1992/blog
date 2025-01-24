import {defineStore} from 'pinia'

export const useCountStore = defineStore('count',{
    actions:{
        increment(value:number){
            if(this.sum < 20){
                this.sum += value,
                this.address = 'new york'
            }
        }
    },
    state() {
        return {
            sum: 6,
            address: 'ningbo'
        }
    },
    getters:{
        bigSum:state => state.sum * 10,
        addressToUpperCase():String{
            return this.address.toUpperCase()
        }
    }
})
