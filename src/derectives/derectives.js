export const imgError = {
  // 传参，第一个形参为dom元素，第二个为传入的值
  inserted: function(dom, binding) {
    if (!dom.src) dom.src = binding.value
    dom.onerror = function() {
      dom.src = binding.value
    }
  },
  componentUpdated(dom, binding) {
    if (!dom.src) dom.src = binding.value
  }
}
