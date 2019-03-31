import modalComponent from '../components/Confirm'
let showModal = {}
let modal = null
let handleDel = null
showModal.install =  (Vue)=> {

  // 添加实例方法，以供全局调用
  Vue.prototype.$showModal = (msg) => {
    let modalText = {
      title: '确认要将这个地址删除吗',
      cancer: '取消',
      confirm: '确认'
    }
    for(let key in msg){
      modalText[key] = msg[key]
    }

    const modalConstructor = Vue.extend(modalComponent)


    // $mount 一种写法
    // modal = new modalConstructor().$mount() // 创建toast子实例
    // document.body.appendChild(modal.$el)
    // modal.dialogText.title = modalText.title
    // modal.dialogText.cancer = modalText.cancer
    // modal.dialogText.confirm = modalText.confirm


    // $mount 另一种写法
    modal = new modalConstructor({
      el: document.createElement('div'),
      data() {
        return {
          dialogText: {
            title: modalText.title || '确认要将这个地址删除吗',
            cancer: modalText.cancer || '取消',
            confirm: modalText.confirm || '确认'
          }
        }
      },
      methods: {
        handleDel(del) {
          modal.toggle = false
          if(del === 'yes'){
            handleDel.resolve()
          }else{
            handleDel.reject()
          }
        }
      }
    })
    document.body.appendChild(modal.$el)


    modal.toggle = true
    // modal.cb = (del) => {
    //   modal.toggle = false
    //   if(del === 'yes'){
    //     handleDel.resolve()
    //   }else{
    //     handleDel.reject()
    //   }
    // }


    return new Promise((resolve, reject)=>{
      handleDel = {
        resolve,
        reject
      }
    })
  }
}
// function defaultCallBack(del) {
//   modal.toggle = false
//   if(del === 'yes'){
//     handleDel.resolve()
//   }else{
//     handleDel.reject()
//   }
// }
export default showModal
