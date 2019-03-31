import modalComponent from '../components/Confirm'
let showModal = {}
let modal = null
let handleDel = null
showModal.install =  (Vue)=> {
  const modalConstructor = Vue.extend(modalComponent)
  modal = new modalConstructor().$mount() // 创建toast子实例
  // modal.$mount() // 挂载实例到我们创建的DOM上
  document.body.appendChild(modal.$el)


  // $mount 另一种写法
  // let vm = new modalConstructor({
  //   el: document.createElement('div'),
  //   data: {
  //       title: '确认要将这个地址删除吗',
  //       cancer: '取消',
  //       confirm: '确认'
  //   }
  // })
  // document.body.appendChild(vm.$el)
  /**
   * @method 提示框
   * @param {object} msg  text title/cancer/confirm
   */
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
    modal.dialogText.title = modalText.title
    modal.dialogText.cancer = modalText.cancer
    modal.dialogText.confirm = modalText.confirm
    modal.toggle = true
    modal.cb = defaultCallBack
    return new Promise((resolve, reject)=>{
      handleDel = {
        resolve,
        reject
      }
    })
  }
}
function defaultCallBack(del) {
  modal.toggle = false
  if(del === 'yes'){
    handleDel.resolve()
  }else{
    handleDel.reject()
  }
}
export default showModal
