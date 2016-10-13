<template>
<div class="login">
  <div class="wrap">
    <div class="center">
      Wellcome {{user.user.name}} <br>
      {{new Date() | dateFormat('%F %T')}}
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { __ } from '../service/locale'

export default {
  name: 'Home',
  computed: {
    ...mapState(['user'])
  },
  beforeMount () {
    this.$store.dispatch('GET_USER', this.form)
      .catch(err => {
        console.error(err)
        this.$message({
          message: err,
          type: 'error'
        })
      })
  }
}
</script>

<style scoped lang="less">
@import '../assets/variables.less';

.home {
  width: 100%;
  height: 100%;
  position: absolute;
  background: @bgcolor;
  color: #fff;
}

.center {
  text-align: center;
  margin-top: 44px;
}
</style>
