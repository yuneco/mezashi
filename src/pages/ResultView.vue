<template>
  <div class="page-root">
    <result-stage
      @newgame="newgame"
      @gohome="gohome"
    ></result-stage>
  </div>
</template>

<style lang="scss" scoped>
.page-root {
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  background-color: white;
  margin: 30px;
  border-radius: 20px;
}
</style>

<script>
import ResultStage from '@/components/ResultStage'
export default {
  name: 'ResultView',
  components: { ResultStage },
  methods: {
    newgame () {
      this.$router.push('/game')
    },
    gohome () {
      this.$router.push('/')
    }
  }
}
</script>
