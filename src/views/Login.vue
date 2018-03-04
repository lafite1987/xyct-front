<template>
  <el-form :model="authInfo" :rules="formRules" ref="authInfo" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="accountType">
      <el-select v-model="authInfo.accountType" placeholder="账号类型">
        <el-option value="USERNAME" label="账户名" />
        <el-option value="PHONE" label="手机" />
      </el-select>
    </el-form-item>
    <el-form-item prop="account">
      <el-input type="text" v-model="authInfo.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <el-input type="password" v-model="authInfo.captcha" auto-complete="off" placeholder="验证码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="default" size="small" style="float:right" @click.native.prevent="getCaptcha" :loading="captchaGetting">获取验证码</el-button>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
import api from '../api';
export default {
  data() {
    return {
      captchaGetting: false,
      logining: false,
      authInfo: {
        accountType: '账户名',
        account: '',
        captcha: ''
      },
      formRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          //{ validator: validaePass }
        ],
        captcha: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  methods: {
    handleReset2() {
      this.$refs.authInfo.resetFields();
    },
    getCaptcha() {
      this.captchaGetting = true;
      api.auth.getCaptcha(this.authInfo).then(res => {
        this.captchaGetting = false;
        this.$message({
          message: '验证码已经下发，请注意查收',
          type: 'info'
        });
      })
    },
    handleSubmit2(ev) {
      this.$refs.authInfo.validate((valid) => {
        if (valid) {
          this.logining = true;
          var loginParams = { username: this.authInfo.account, password: this.authInfo.checkPass };
          api.auth.verifyCaptcha(this.authInfo).then(res => {
            this.logining = false;
            if (res.data.retcode == 0) {
              this.$router.push({ path: '/system' });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}

</script>

<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>