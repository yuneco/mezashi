<template>
  <div>
    <home-stage
      @newgame="newgame"
    ></home-stage>
  </div>
</template>

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
