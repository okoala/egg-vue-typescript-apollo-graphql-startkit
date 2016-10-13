/* global describe, it, expect */

import Vue from 'vue'
import App from '$views/App.vue'

describe('App.vue', () => {
  it('should render corrent contents', () => {
    const vm = new Vue({
      template: '<div><app></app></div>',
      components: { App }
    }).$mount()
    expect(vm.$el.querySelector('.title').textContent).toBe('广告管理工具')
  })
})
