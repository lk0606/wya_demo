
  <template>
    <transition name="slide">
    <div class="dialog-confirm-wrap" v-if="toggle">
      <div class="dialog-confirm">
        <h2>{{dialogText.title}}</h2>
        <div>
          <button class="button button-del" @click="handleDel('no')">
            {{dialogText.cancer}}
          </button>
          <button class="button button-save" @click="handleDel('yes')">
            {{dialogText.confirm}}
          </button>
        </div>
      </div>
    </div>
    </transition>
  </template>

<script>
// import { mapGetters } from 'vuex'
export default {
    name: "Confirm",
    props:{
      cb: Function,
      toggle: {
        type : Boolean,
        default: false
      },
      dialogText: {
        type: Object,
        default () {
          return {
            title: '',
            cancer: '',
            confirm: ''
          }
        }
      }
    },
    data(){
      return {
        // dialogText: {
        //   title: '确认要将这个地址删除吗',
        //   cancer: '取消',
        //   confirm: '确认'
        // }
      }
    },
    computed: {
      // ...mapGetters(
      //   ['showConfirmDialog']
      // )
    },
    methods: {
      handleDel(del){
        if (del === 'yes' || del === 'no') {
          this.cb(del)
        }
      }
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
