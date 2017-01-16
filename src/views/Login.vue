<template>
<div class="login">
  <div class="wrap">
    <div class="center">
      <h3 class="title">{{__('platform_name') | toUpperCase}}</h3>
      <el-form label-position="top" :model="form" :rules="rules" ref="form" class="form">
        <el-form-item :label="__('profile_user')" prop="user">
          <el-input v-model="form.user" :placeholder="__('profile_user_placeholder')"></el-input>
        </el-form-item>
        <el-form-item :label="__('profile_pwd')" prop="pwd">
          <el-input type="password" v-model="form.pwd" :placeholder="__('profile_pwd_placeholder')"></el-input>
        </el-form-item>
        <el-form-item class="ft">
          <el-button type="primary" @click.native.prevent="handleSubmit">{{__('submit')}}</el-button>
          <el-button @click.native.prevent="handleReset">{{__('reset')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <bokeh class="bokeh"></bokeh>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { __ } from '../service/locale'

export default {
  name: 'login',
  data () {
    return {
      form: {
        user: '',
        pwd: ''
      },
      rules: {
        user: [
          { required: true, message: __('profile_user_placeholder'), trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: __('profile_pwd_placeholder'), trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['version'])
  },
  mounted () {
    if (this.$route.query && this.$route.query.redirect) {
      this.redirect = decodeURIComponent(this.$route.query.redirect)
    }
  },
  methods: {
    handleReset() {
      this.$refs.form.resetFields()
    },
    handleSubmit (e) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$store.dispatch('SIGN_IN', this.form)
            .then(data => {
              if (this.redirect) {
                document.location.href = this.redirect
                return
              }
              document.location.href = '/home'
            })
            .catch(err => {
              this.$message({
                message: err,
                type: 'error'
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
@import '../assets/variables.less';

.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background: @bgcolor;
  color: #fff;
}

.wrap {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.el-form-item {
  margin-bottom: 20px;
}

.center {
  position: absolute;
  width: 268px;
  height: 400px;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -134px;

  .form {
    margin-top: 45px;
  }

  label {
    color: #fff !important;
  }

  .title {
    text-align: center;
    font-size: 30px;
    font-weight: normal;
  }
}

.el-form-item__label {
  color: #ddd;
}

.ft {
  margin-top: 40px;
  text-align: center;

  .el-button-primary {
    width: 185px;
  }

  .btn-reset {
    width: 69px;
  }
}

.bokeh {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>
