export default {
  css: {
    loaderOptions: {
      sass: {
        // 添加自动导入目录
        additionalData: `
        @import "@/assets/scss/variable.scss";  //css全局变量
        @import "@/assets/scss/mixin.scss";
        `
      }
    }
  }
}