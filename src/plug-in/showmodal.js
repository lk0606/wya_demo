import modalComponent from '../components/Confirm'
let showModal = {}
let modal = null
let handleDel = null
showModal.install =  (Vue)=> {
  const modalConstructor = Vue.extend(modalComponent)
  const modal = new modalConstructor() // 创建toast子实例
  modal.$mount() // 挂载实例到我们创建的DOM上
  document.body.appendChild(modal.$el)

  // Vue.component(modalComponent.name,modalComponent)
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
    modal.dialogText.title = msg.title
    modal.dialogText.cancer = msg.cancer
    modal.dialogText.confirm = msg.confirm
    modal.toggle = true
    modal.cb = defaultCallBack
    return new Promise((resolve, reject)=>{
      handleDel = {
        resolve,
        reject
      }
    })
  }
  // 全局方法
  // Vue.cancerDel = function () {
  //   // 逻辑...
  // }
}
function defaultCallBack(del) {
  if(del === 'yes'){
    handleDel.resolve()
  }else{
    handleDel.reject()
  }
}
export default showModal
