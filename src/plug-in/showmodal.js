import modalComponent from '../components/Del'
var showModal = {}
showModal.install =  (Vue)=> {
  const modalConstructor = Vue.extend(modalComponent)
  const modal = new modalConstructor() // 创建toast子实例
  modal.$mount() // 挂载实例到我们创建的DOM上
  document.body.appendChild(modal.$el)

  /**
   * @method 提示框
   * @param {object} msg  text title/cancer/confirm
   */
  // 添加实例方法，以供全局调用
  Vue.prototype.$showModal = (msg) => {
    let obj = {
      title: '确认要将这个地址删除吗',
      cancer: '取消',
      confirm: '确认'
    }
    for(let key in msg){
      obj[key] = msg[key]
    }
    modal.dialogText.title = msg.title
    modal.dialogText.cancer = msg.cancer
    modal.dialogText.confirm = msg.confirm
    modal.toggle = true
    return false
  }
  Vue.prototype.$success = (toggle)=> {
    modal.toggle = toggle
  }

  // Vue.cancerDel = function () {
  //   // 逻辑...
  //   modal.toggle = true
  // }
  // 混入
  Vue.mixin({
    // method: {
    //   cancerDel() {
    //     modal.toggle = true
    //   },
      // confirmDel() {
      //   modal.toggle = true
      // }
    // }
  })
}

export default showModal
