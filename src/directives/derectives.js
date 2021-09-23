export const imgError = {
  // 钩子函数
  // 指令所绑定的dom 插入到父节点
  inserted: function(dom, binding) {
    dom.onerror = function() {
      dom.src = binding.value
    }
  }
}
