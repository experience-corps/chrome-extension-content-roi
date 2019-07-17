<template>
  <div>
    <p>This is the injected script. Yeah, it's a vue component.</p>
    <p>{{ subtext }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      subtext: 'Test string',
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  background-color: lightcoral;
  color: white;
  margin: 0px;
  padding: 5px;
}
</style>
