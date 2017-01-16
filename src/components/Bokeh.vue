<template>
<div>
  <canvas ref="c1" class="c1"></canvas>
  <canvas ref="c2" class="c2"></canvas>
</div>
</template>

<script>
// codepen: http://codepen.io/jackrugile/pen/gaFub

import { hsla, rand } from '../service/util'

export default {
  props: {

  },
  data () {
    return {
      c1: null,
      ctx1: null,
      c2: null,
      ctx2: null,
      twopi: Math.PI * 2,
      parts: [],
      sizeBase: null,
      cw: null,
      ch: null,
      opt: null,
      hue: null,
      count: null,
    }
  },
  mounted () {
    this.c1 = this.$refs.c1
    this.ctx1 = this.c1.getContext( '2d' )
    this.c2 = this.$refs.c2
    this.ctx2 = this.c2.getContext( '2d' )

    window.addEventListener('resize', this.handleResize)
    this.$el.addEventListener('click', this.handleClick)

    this.handleResize()
    this.create()
    this.loop()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
    this.$el.removeEventListener('click', this.handleClick)
  },
  methods: {
    handleResize () {
      this.cw = this.c1.width = this.c2.width = window.innerWidth
      this.ch = this.c1.height = this.c2.height = window.innerHeight
      this.create()
    },
    handleClick() {
      this.create()
    },
    loop () {
      requestAnimationFrame(this.loop)

      this.ctx2.clearRect(0, 0, this.cw, this.ch)
      this.ctx2.globalCompositeOperation = 'source-over'
      this.ctx2.shadowBlur = 0
      this.ctx2.drawImage(this.c1, 0, 0)
      this.ctx2.globalCompositeOperation = 'lighter'

      var i = this.parts.length
      this.ctx2.shadowBlur = 15
      this.ctx2.shadowColor = '#fff'

      while(i--) {
        var part = this.parts[i]

        part.x += Math.cos(part.angle) * part.vel
        part.y += Math.sin(part.angle) * part.vel
        part.angle += rand(-0.05, 0.05)

        this.ctx2.beginPath()
        this.ctx2.arc(part.x, part.y, part.radius, 0, this.twopi)
        this.ctx2.fillStyle = hsla(0, 0, 100, 0.075 + Math.cos( part.tick * 0.02 ) * 0.05)
        this.ctx2.fill()

        if(part.x - part.radius > this.cw) { part.x = -part.radius }
        if(part.x + part.radius < 0)  { part.x = this.cw + part.radius }
        if(part.y - part.radius > this.ch) { part.y = -part.radius }
        if(part.y + part.radius < 0)  { part.y = this.ch + part.radius }

        part.tick++
      }
    },
    create() {
      this.sizeBase = this.cw + this.ch
      this.count = Math.floor(this.sizeBase * 0.3)
      this.hue = rand(0, 360)
      this.opt = {
        radiusMin: 1,
        radiusMax: this.sizeBase * 0.04,
        blurMin: 10,
        blurMax: this.sizeBase * 0.08,
        hueMin: this.hue,
        hueMax: this.hue + 100,
        saturationMin: 10,
        saturationMax: 70,
        lightnessMin: 20,
        lightnessMax: 50,
        alphaMin: 0.1,
        alphaMax: 0.5
      }
      this.ctx1.clearRect(0, 0, this.cw, this.ch)
      this.ctx1.globalCompositeOperation = 'lighter'

      while(this.count--) {
        const radius = rand(this.opt.radiusMin, this.opt.radiusMax)
        const blur = rand(this.opt.blurMin, this.opt.blurMax)
        const x = rand(0, this.cw)
        const y = rand(0, this.ch)
        const hue = rand(this.opt.hueMin, this.opt.hueMax)
        const saturation = rand(this.opt.saturationMin, this.opt.saturationMax)
        const lightness = rand(this.opt.lightnessMin, this.opt.lightnessMax)
        const alpha = rand(this.opt.alphaMin, this.opt.alphaMax)

        this.ctx1.shadowColor = hsla(hue, saturation, lightness, alpha)
        this.ctx1.shadowBlur = blur
        this.ctx1.beginPath()
        this.ctx1.arc(x, y, radius, 0, this.twopi)
        this.ctx1.closePath()
        this.ctx1.fill()
      }

      this.parts.length = 0
      for(let i = 0; i < Math.floor((this.cw + this.ch) * 0.03); i++) {
        this.parts.push({
          radius: rand(1, this.sizeBase * 0.03),
          x: rand(0, this.cw),
          y: rand(0, this.ch),
          angle: rand(0, this.twopi),
          vel: rand(0.1, 0.5),
          tick: rand(0, 10000)
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
canvas {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.c1 {
  opacity: 0;
}

.c2 {
  background: #000;
}

</style>
