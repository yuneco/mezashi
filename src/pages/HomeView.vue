<template>
  <div class="page-root">
    <home-stage
      @newgame="newgame"
    ></home-stage>
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
import HomeStage from '@/components/HomeStage'
export default {
  name: 'HomeView',
  components: { HomeStage },
  methods: {
    newgame () {
      this.$router.push('/game')
    }
  }
}
</script>
