import mitt from "mitt";

const emitter = mitt()

// // 绑定事件
// emitter.on('test1',()=>{
//   console.info('test1')
// })
// emitter.on('test2',()=>{
//   console.info('test2')
// })

// setInterval(() => {
//   emitter.emit('test1')
//   emitter.emit('test2')
// }, 1000);

// setTimeout(()=>{
//   // emitter.off('test2')
//   emitter.all.clear()
// }, 3000)

export default emitter

