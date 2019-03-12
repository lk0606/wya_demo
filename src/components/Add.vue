<template>
    <div class="dialog-wrap">
        <div class="dialog">
            <div class="title">
                <h2>新建收货地址</h2>
                <i @click="handleAddressDialog">×</i>
            </div>
            <ul>
                <li v-for="(item,index) in newAddress" :key="index">
                    <label>{{item.name}}</label>
                    <input :type="item.type" v-model="item.value" :placeholder="item.placeholder"/>
                </li>
            </ul>
            <div>
                <button class="button button-save" @click="saveAddress(newAddress)">
                    保存
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Add",
    data() {
        return {
            newAddress: {
                name:{
                    name: '收货人',
                    type: 'text',
                    placeholder: '请填写收货人姓名',
                    value: ''
                },
                tel:{
                    name: '手机号码',
                    type: 'tel',
                    placeholder: 15910012002,
                    value: ''
                },
                zone:{
                    name: '区域信息',
                    type: 'text',
                    placeholder: '请填写区域信息',
                    value: ''
                },
                address:{
                    name: '详细地址',
                    type: 'text',
                    placeholder: '请输入街道门牌信息',
                    value: ''
                },
                postalCode:{
                    name: '邮政编码',
                    type: 'tel',
                    placeholder: '可以不填',
                    value: ''
                }
            },
            isPass: false
        }
    },
    methods: {
        getAddressInfo(){
            let address = {
                check: false
                // name: '测试',
                // tel: '15910012002',
                // zone: '浙江省 杭州市',
                // address: '浙江省 杭州市',
                // postalCode: '716000'
            }
            for(let key in this.newAddress){
                address[key] = key
                address[key] = this.newAddress[key].value
            }
            return address
        },
        saveAddress() {
            this.validate(this.getAddressInfo())
            if(this.isPass){
                this.$store.commit('handleAddressDialog', false)
                this.$store.commit('add', this.getAddressInfo())
            }
        },
        handleAddressDialog(){
            this.$store.commit('handleAddressDialog', false)
        },
        // 正则判断
        validate(newAddress) {
            console.log(newAddress, 'validate')
                for(let i in newAddress){
                    if(i !== 'postalCode'){
                        if(newAddress[i] !== ''){
                            if(i === 'tel'){
                                let regTel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
                                if(regTel.test(newAddress[i])){
                                    console.log('验证通过')
                                }else{
                                    console.log('验证不通过')
                                    this.isPass = false
                                    break
                                }
                            }else{
                                this.isPass = true
                            }

                        }
                        else {
                            console.log('验证不通过')
                            this.isPass = false
                            break
                        }
                    }

                }
            }
    }
}
</script>

<style lang="scss" scoped>
.dialog-wrap {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0,0,0, .3);
    font-size: .07rem;
    z-index: 9;
    .dialog {
        width: 100%;
        position: absolute;
        bottom: 0;
        padding-top: .04rem;
        background: #fff;
        .title{
            position: relative;
            /*font-size: .1rem;*/
            >h2{
                text-align: center;
                font-size: .1rem;
                font-weight: 400;
                margin-bottom: .05rem;
            }
            >i{
                font-size: .22rem;
                position: absolute;
                right: .03rem;
                top: 0;
            }
        }
        >ul{
            padding: 0 .08rem;
            >li{
                padding: .1rem 0;
                display: flex;
                border-bottom: 1px solid #ebebeb;
                >label{
                    width: .88rem;
                }
                >input{
                }
                >input::-webkit-input-placeholder{
                    font-size: .07rem;
                }
            }
        }
        >div{
            padding: .06rem .08rem .02rem;
            /*.button{*/
                /*border: 1px solid #75b9aa;*/
                /*background: #48cfae;*/
            /*}*/
        }
    }
}
</style>
