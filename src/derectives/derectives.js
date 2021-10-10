export const imgError = {
  // 传参，第一个形参为dom元素，第二个为传入的值
  inserted: function(dom, binding) {
    dom.onerror = function() {
      dom.src = binding.value
    }
  }
}
