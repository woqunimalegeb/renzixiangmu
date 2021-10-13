export const imgError = {
  // 传参，第一个形参为dom元素，第二个为传入的值
  inserted: function(dom, binding) {
    // 如果员工头像为空，就让他等于我们传入的默认值
    if (!dom.src) dom.src = binding.value
    // 被绑定元素加载失败时，让他等于我们传入的默认值
    dom.onerror = function() {
      dom.src = binding.value
    }
  },
  // 被绑定元素发生改变时调用，让他等于我们传入的默认值
  componentUpdated(dom, binding) {
    if (!dom.src) dom.src = binding.value
  }

}
