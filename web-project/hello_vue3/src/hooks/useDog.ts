import { reactive, onMounted } from 'vue'
import axios from 'axios'

export default function () {
    let dogList = reactive(['https://images.dog.ceo/breeds/pembroke/n02113023_5006.jpg'])
    async function getPic() {
        try {
            let result = await axios.get('https://dog.ceo/api/breed/pembroke/images/random')
            dogList.push(result.data.message)
        } catch (error) {
            alert(error)
        }
    }
    onMounted(()=>{
        getPic()
    })
    return {dogList, getPic}
}