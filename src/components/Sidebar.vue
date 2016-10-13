<template>
<div class="pushable">
  <div class="sidebar">
    <div class="topbar">
      <h3 class="title">{{__('platform_name') | toUpperCase}} <span class="version">( v{{version}} )</span></h3>
    </div>
    <router-link :to="menu.link" v-for="menu in menus">
      <span class="item" ><i :class="menu.icon + ' icon'"></i> {{ menu.name }}</span>
    </router-link>
    <div class="ft">
      <router-link to="logout">
        <span><i class="power icon"></i>{{__('logout')}}</span>
      </router-link>
    </div>
  </div>
  <div class="container">
    <slot></slot>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'sidebar',
  data () {
    return {
      menus: []
    }
  },
  computed: {
    ...mapGetters(['version'])
  },
  mounted () {
    this.menus = [
      {
        name: this.__('menu_home'),
        icon: 'home',
        link: '/home'
      }
    ]
  }
}
</script>

<style scoped lang="less">
@import '../assets/variables.less';

.pushable {
  height: 100%;
  width: 100%;
}

.sidebar {
  margin: 0!important;
  z-index: 1;
  transition: none;
  will-change: transform;
  display: block;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  border: 0 solid transparent;
  background: @bgcolor !important;
  right: auto;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 260px;
  box-shadow: 0 0 20px rgba(34,36,38,.15);

  .item {
    display: block;
    vertical-align: middle;
    line-height: 1;
    -webkit-tap-highlight-color: transparent;
    -webkit-box-flex: 0;
    flex: 0 0 auto;
    user-select: none;
    padding: .92857143em 1.14285714em;
    transition: background .1s ease,box-shadow .1s ease,color .1s ease;
    color: #808080;
    padding-left: 25px;
    line-height: 1.9;
    transition: all .3s ease;
    &:hover {
      color: #b9b9b9;
      background-color: rgba(0, 0, 0, 0.07);
    }
    .icon {
      opacity: .9;
      width: 1.18em;
      float: left;
      margin: 0 .7em 0 0;
      display: inline-block;
      height: 1em;
      font-family: Icons;
      font-style: normal;
      font-weight: 400;
      text-decoration: inherit;
      text-align: center;
      speak: none;
      font-smoothing: antialiased;
    }
  }
}

.topbar {
  height: @topbarHeight;
  line-height: @topbarHeight;
  background: @bgcolor !important;
  padding: 0px 25px;
  word-wrap: break-word;
  .title {
    color: #fff;
    font-size: 15px;
    line-height: @topbarHeight;
    font-weight: normal;
    text-overflow: ellipsis;
    text-shadow: 0 -1px 0 #000;
    white-space: nowrap;
  }
}

.version {
  font-size: 12px;
  margin-left: 3px;
  color: #898989;
}

.router-link-active {
  .item {
    color: #2fafff !important;
    background-color: rgba(0, 0, 0, 0.2) !important;
  }
}
.container {
  padding-left: 260px;
}
.ft {
  position: absolute;
  bottom: 20px;
  width: 260px;
  text-align: center;
  a {
    color: #989898;
    &:hover {
      color: #dddddd;
    }
  }
}
</style>
