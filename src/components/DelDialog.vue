<template>
    <div class="dialog-confirm-wrap">
        <div class="dialog-confirm">
            <h2>确认要将这个地址删除吗</h2>
            <div>
                <button class="button button-del" @click="cancerDel">
                    取消
                </button>
                <button class="button button-save" @click="confirmDel">
                    确认
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DelDialog",
    computed:{
    },
    methods: {
      cancerDel() {
        this.$store.commit('handleDelDialog', false)
      },
      confirmDel() {
        this.$store.commit('delConfirm')
        this.$store.commit('showEditDialog', [false])
      }
    }
}
</script>

<style lang="scss" scoped>
    .dialog-confirm-wrap{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background: rgba(0,0,0, .3);
        font-size: .07rem;
        z-index: 9;
        .dialog-confirm{
            position: absolute;
            left: 10%;
            top: 35%;
            width: 80%;
            /*width: 100%;*/
            height: 30%;
            background: #fff;
            border-radius: .05rem;
            padding: .15rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: .07rem;
            >h2{
                text-align: center;
                padding: .1rem 0 .3rem;
                font-weight: 400;
                font-size: .07rem;
            }
            >div{
                display: flex;
                align-items: center;
                >button:nth-of-type(1){
                    margin-right: .06rem;
                }
            }
        }
    }
</style>
