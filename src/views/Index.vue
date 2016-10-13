<script>
export default {
  name: 'Index',
  computed: {
    standalone () {
      return !!this.$route.meta.standalone
    }
  },
  render (h) {
    if (this.standalone) {
      return h('router-view')
    } else {
      return h(
        'sidebar',
        null,
        [h('router-view', { class: 'view' })]
      )
    }
  }
}
</script>

<style scoped lang="less">
.view {
  padding: 10px;
}
</style>
