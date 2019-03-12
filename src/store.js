import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editIndex: null,
    delIndex: null,
    addressList:[
      {
        check: true,
        name: '测试',
        tel: '15910012002',
        zone: '浙江省 杭州市',
        address: '浙江省 杭州市',
        postalCode: '716000'
      },
      {
        check: false,
        name: 'lk',
        tel: '15910012002',
        zone: '浙江省 杭州市',
        address: '浙江省 杭州市',
        postalCode: '716000'
      },
    ],
    showAddressDialog: false,
    showEditDialog: false,
    showConfirmDialog: false
  },
  mutations: {
    add(sta, newAddress) {
      console.log(newAddress,'$store')
      sta.addressList.push(newAddress)
    },
    edit(sta, editAddress){
      for(let key in sta.addressList[sta.editIndex]){
        if(key !== 'check'){
          if(sta.addressList[sta.editIndex][key] !== editAddress[key]){
            sta.addressList[sta.editIndex][key] = editAddress[key]
          }
        }

        // console.log(key,'commit')
      }
    },
    del(sta, delIndex){
      sta.showConfirmDialog = true
      sta.delIndex = delIndex
    },
    delConfirm(sta){
      sta.addressList.splice(sta.delIndex, 1)
      sta.showConfirmDialog = false
    },
    delEdit(sta){
      sta.addressList.splice(sta.editIndex, 1)
      sta.showAddressDialog = false
    },
    /**
     * 新建 / 编辑
     * @param sta
     * @param arr toggle index
     */
    handleAddressDialog(sta, arr){
      if (arr instanceof Array && arr.length === 1) {
        sta.showAddressDialog = arr[0]
      }
      else {
        sta.showAddressDialog = arr[0]
        sta.editIndex = arr[1]
      }
    },
    handleDelDialog(sta, toggle){
      sta.showConfirmDialog = toggle
    },
    showEditDialog(sta, arr){
      sta.showEditDialog = arr[0]
      sta.editIndex = arr[1]
    }
  },
  actions: {

  },
  getters: {
    showAddressDialog: state => state.showAddressDialog,
    showConfirmDialog: state => state.showConfirmDialog,
    showEditDialog: state => state.showEditDialog,
    addressList: state => state.addressList
  }
})
