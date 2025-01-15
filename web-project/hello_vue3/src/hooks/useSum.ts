import {ref,onMounted,computed} from 'vue'

export default function(){
    let num = ref(0)
    let bigNum = computed(()=>{
        return num.value * 10
    })
    function sumUp() {
        num.value += 1
    }
    onMounted(()=>{
        sumUp()
    })
    return {num,bigNum,sumUp}
}

