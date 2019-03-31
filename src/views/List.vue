<template>
    <div class="container">
        <div class="address-wrap" v-for="(item, index) in addressList" :key="index">
            <ul>
                <li class="address-one flex">
                    <div>收货人: <span>{{item.name}}</span></div>
                    <div>{{item.tel}}</div>
                </li>
                <li class="address-two flex">
                    <div>地址:<span>{{item.address}}</span></div>
                </li>
                <li class="address-three flex">
                    <div>
                        <em @click="handleRadio(index)">
                            <i v-show="item.check"></i>
                        </em>
                        <span @touchstart="test($event)">设为默认</span>
                    </div>
                    <div>
                        <button @click="edit(item,index)">编辑</button>
                        <i></i>
                        <!--<button @click="delAddressList(index)">删除</button>-->
                        <button @click="delAddressList(index)">删除</button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="add-address-wrap"
             @click="handleAddress">
            <button >添加新地址</button>
        </div>
        <transition name="slide">
            <handle-address v-if="showAddressDialog"
                  :editAddressData = 'editAddressData'
                  :title="title"/>
        </transition>
    </div>
</template>

<script>
import HandleAddress from '../components/HandleAddress'
import { mapGetters } from 'vuex'

export default {
    name: "List",
    data(){
        return {
          editAddressData: {},
          title: ''
        }
    },
    components: {
        HandleAddress
    },
    methods: {
        test(e){
          console.log(e)
        },
        delAddressList(index){
              this.$store.commit('del', index)
              this.$showModal({
                  title: '确认要将这个地址删除吗?',
                  cancer: '取消?',
                  confirm: '确认?'
              })
                .then(()=>{
                  this.$store.commit('delConfirm')
                  this.$store.commit('showEditDialog', [false])
              })
                .catch(()=>{
                })
        },
        edit(item, index){
            console.log(index, 'edit index')
            this.$store.commit('handleAddressDialog', [true, index])
            // this.$store.commit('edit', item)
            this.editAddressData = item
            this.title = '修改收货地址'
        },
        handleAddress(){
            this.title = '新建收货地址'
            this.$store.commit('handleAddressDialog', [true])
        },
        handleRadio(index) {
            for(let i in this.addressList) {
                if(parseInt(i) === parseInt(index)){
                    this.addressList[i].check = true
                } else {
                    this.addressList[i].check = false
                }
            }
        }
    },
    computed: {
        ...mapGetters(
            [
                'showAddressDialog',
                'showConfirmDialog',
                'addressList',
                'showEditDialog'
            ]
        )
    }
}
</script>

<style lang="scss" scoped>
.slide-enter-active {
  animation: slide .2s;
}
.slide-leave-active {
  animation: slide .2s reverse;
}
@keyframes slide {
  0% {
    transform-origin: bottom;
    transform: scaleY(0);
  }
  100% {
    transform-origin: bottom;
    transform: scaleY(1);
  }
}
.flex{
    display: flex;
}
.container {
    position: relative;
    height: 100%;
    border: 1px solid #e2e2e2;
    color:#393a59;
    background: #f4f4f4;
    .address-wrap {
        margin-bottom: .03rem;
        background: white;
        padding: .08rem .07rem 0;
        font-size: .07rem;
        line-height: 1.5;
        border-bottom: 1px solid #eaeaea;
        .address-one{
            align-items: center;
            justify-content: space-between;
        }
        .address-two{
            margin-bottom: .05rem;
            align-items: center;
            color: #a5a6a8;
        }
        .address-three{
            margin-top: .01rem;
            border-top: 1px solid #eaeaea;
            align-items: center;
            justify-content: space-between;
            padding: .03rem 0;
            >div:nth-of-type(1){
                display: flex;
                align-items: center;
                >em{
                    margin-right: .06rem;
                    width: .13rem;
                    height: .13rem;
                    border-radius: 50%;
                    border: 1px solid #dfdbda;
                    position: relative;
                    /*flex: 1;*/
                    >i{
                        position: absolute;
                        left: calc(50% - .035rem);
                        top: calc(50% - .034rem);
                        width: .07rem;
                        height: .07rem;
                        border-radius: 50%;
                        background: #fb7c49;
                    }
                }
            }
            >div:nth-of-type(2){
                display: flex;
                align-items: center;
                >button{
                    padding: .02rem .07rem;
                }
                >i{
                    width: 1px;
                    height: .14rem;
                    background: #cacaca;
                }
            }
        }
    }
    .add-address-wrap {
        width: 100%;
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        >button {
            width: 100%;
            font-size: .1rem;
            padding: .08rem 0;
            background: #ff393a;
            color: #fff;
        }
    }
}
</style>
