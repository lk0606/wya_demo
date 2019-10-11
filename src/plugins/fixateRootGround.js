(function() {
    /*************************************
     * 功能概要
     *  1.禁止根部元素滚动
     *  2. 恢复根部元素滚动
     * 使用背景
     *  模态框弹出阻止背景元素滚动，背景滚动位置保持不变
     * 页面根元素
     *  默认值为 “div”
     *************************************/

    let rootElement = "div"; 
    let modalCount = 0; //页面弹框弹出数量； 注意：单页应用当前路由销毁时请重置 modalCount或者监听onpopstate事件重置该参数
    let html = document.getElementsByTagName("html").item(0);
    let body = document.body;
    let windowScrollY = 0;
    /**
     *  @return {Dom} 页面根元素
     */
    function _getRootElement() {
        if(rootElement.indexOf("#")> -1) {//id
            return document.getElementById(rootElement.replace("#", ""));
        }
        if(rootElement.indexOf(".") > -1) {//class
            return document.getElementsByClassName(rootElement.replace(".", "")).item(0);
        }
        for(var item of body.children) {//标签
            if(item.tagName.toLocaleLowerCase() == rootElement.toLocaleLowerCase() || item.tagName.toLocaleLowerCase() =="section") {
                return item;
            }
        }
    }

    /**
     * @desc 设置根部元素
     * @param {String} element 
     */
    function setRootElement(element) {
        rootElement = element;
        console.log("测试" + rootElement);
    }
    /**
     * @desc 重置弹框弹出数
     */
    function resetModalCount() {
        modalCount = 0;

    }
    /**
     * @desc 根元素固定
     */
    function fixateFn() {       
        if(modalCount <= 0) {
            var rootDom = _getRootElement();
            windowScrollY = window.scrollY;
  
            //setTimeout(function() {
                html.style.height = "100%";
                html.style.overflowY = "hidden";
                body.style.height = "100%";
                body.style.boxSizing='content-box';
                body.style.overflowY = "hidden";
                if(rootDom){
                    rootDom.style.width = "100%";
                    rootDom.style.position='fixed';
                    rootDom.style.top = -windowScrollY + "px";
                }
                
            //}, 200);
        }
        modalCount++;
    }
    
    /**
     * @desc 根元素取消固定
     */
    function unFixateFn() {
        if(modalCount <1) {
            return;
        }
        if(modalCount == 1) {
            var rootDom = _getRootElement();

            //setTimeout(function() {
                html.style.height = "";
                html.style.overflowY = "";
                body.style.height = "";
                body.style.overflowY = "";
                if(rootDom){
                    rootDom.style.position='';
                    rootDom.style.top = "";
                }
                
                window.scrollTo(0,windowScrollY);
                windowScrollY = 0;
            //}, 200);
        }
        modalCount--;
    }
    /**
     * @desc 获取当前弹框弹出数量
     * @return {Number}
     */
    function getModalCount() {
        return modalCount;
    }
    /**
     * @desc 获取window历史滚动位置
     * @return {Number}
     */
    function getWindowScrollY() {
        return windowScrollY;
    }
    window.fixateRootGound = {
        resetModalCount,
        setRootElement,
        fixateFn,
        unFixateFn,
        getModalCount,
        getWindowScrollY
    }
})();
