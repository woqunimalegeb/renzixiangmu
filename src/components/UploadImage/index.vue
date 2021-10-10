<template>
  <div>
    <!-- :file-list="filelist"  存放图片
      :class="{display:filelist.length}" 上传图片样式是否隐藏
      :on-remove="onRemove" 删除图片
      :http-request="onRequest" 自定义上传图片发送请求
      :on-change="onChange" 图片发生改变，上传本地图片
      :on-preview="handlePictureCardPreview" 点击预览
      :before-upload="beforeUpload" 上传图片之前的行为
      accept="image/png, image/jpeg,image/gif"  图片格式限制，选择时不符合条件的不显示
      -->
    <el-upload
      v-show="!isShowProgress"
      action="#"
      list-type="picture-card"
      :file-list="filelist"
      :class="{display:filelist.length}"
      :on-remove="onRemove"
      :http-request="onRequest"
      :on-change="onChange"
      :on-preview="handlePictureCardPreview"
      :before-upload="beforeUpload"
      accept="image/png, image/jpeg,image/gif"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="isShowProgress" type="circle" :percentage="percentage" />
    <!-- 预览弹窗 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
// 下载包cos-js-sdk-v5引入cos-js-sdk-v5
import COS from 'cos-js-sdk-v5'
console.log(COS)
// 配置账号和密码，发送请求，开发中需要发送请求获取
var cos = new COS({
  SecretId: 'AKIDud6IDrFMCl34oHTP4RZQ1KNAhxwe5F8k',
  SecretKey: 'NTIq89tNZWChvrXw5xZuznKbcNtAAvPd'
})
// SecretKey:sXw4wXrviETR8YhZAVZNuCDxPavzmJaa
// SecretId:AKIDRgfNoxqSnqd8MJzOWOyIK5ZnkPoxpTqx
export default {
  name: 'UploadImage',
  data() {
    return {
      filelist: [], // 图片地址
      dialogVisible: false, // 预览弹窗
      dialogImageUrl: '', // 预览图片路径
      currentUid: '', // 上传腾讯云的图片id
      percentage: 0,
      isShowProgress: false
    }
  },

  created() {

  },

  methods: {
    // 点击图片删除，显示上传图片
    onRemove(file, filelist) {
      // file为当前的图片，利用filter把当前的这个过滤掉
      this.filelist = this.filelist.filter(item => item.uid !== file.uid)
      // 第二个参数为直接删除后的数组
      // this.filelist = filelist
    },
    // 自定义图片请求
    onRequest(data) {
      cos.putObject({
        Bucket: 'renzi-hz-1307763771', /* 必须存储桶的名字 */
        Region: 'ap-shanghai', /* 存储桶所在地域，必须字段 */
        Key: 'data.file.name', /* 必须 文件名字，自己取 */
        StorageClass: 'STANDARD',
        Body: data.file, // 上传文件对象
        onProgress: progressData => {
          this.percentage = progressData.percent * 100
        }
      }, (err, data) => {
        if (err) {
          this.$message.error('上传失败，重新上传')
          this.isShowProgress = false
          this.filelist = this.filelist.filter(item => item.uid !== this.currentUid)
        }
        // 判断请求是否成功
        if (!err && data.statusCode === 200) {
          // 保存腾讯云的图片地址
          const url = 'https://' + data.Location
          // 利用保存的腾讯云的图片id进行查找要替换的的那一项地址
          const index = this.filelist.findIndex(item => {
            return item.uid === this.currentUid
          })
          // 将我们原本的本地地址替换成腾讯云地址
          this.filelist[index].url = url
          this.$emit('on-success', this.filelist, url)
          setTimeout(() => {
            this.isShowProgress = false
          }, 300)
        }
      })
    },
    // 上传本地图片
    onChange(file, filelist) {
      this.filelist = filelist
    },
    // 点击预览
    handlePictureCardPreview(file) {
      this.dialogVisible = true
      // 预览图片的路径等于当前点击的图片路径
      this.dialogImageUrl = file.url
    },
    // 图片上传之前的限制条件
    beforeUpload(file) {
      // 大小限制在1MB以内
      const maxSize = 1 * 1024 * 1024
      const type = ['image/png', 'image/jpeg', 'image/gif']
      // 判断图片格式，不符合就return false停止上传
      if (!type.includes(file.type)) {
        this.$message.error('请选择正确格式的图片')
        return false
      }
      // 判断图片大小，不符合就return false停止上传
      if (file.size >= maxSize) {
        this.$message.error('请选择1MB以内的图片')
        return false
      }
      // 保存上传腾讯云的图片id
      this.currentUid = file.uid
      this.isShowProgress = true
      return true
    }
  }
}
</script>

<style scoped less="scss">
::v-deep .display .el-upload--picture-card{
  display: none;
}
::v-deep .el-dialog__header{
  padding:40px 20px 10px !important;
}

</style>
