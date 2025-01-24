import { reactive } from 'vue'
import {defineStore} from 'pinia'
import axios from 'axios'
import {nanoid} from 'nanoid'

export const useTalkStore = defineStore('talk', () => {

    const talkList = reactive(JSON.parse(localStorage.getItem('talkList') as string) || [])

    async function getATalk(){
        // let {data:{content:title}} = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
        let obj = {id:nanoid(),title:'I love you'}
        talkList.unshift(obj)
    }
    return {talkList, getATalk}
})

// export const useTalkStore = defineStore('talk', {
//     actions: {
//         async getATalk(){
//             // let {data:{content:title}} = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
//             let obj = {id:nanoid(),title:'I love you'}
//             this.talkList.unshift(obj)
//         }
//     },
//     state(){
//         return {
//             talkList:
//         }
//     }
// })