<template>


</template>
  
<script>
  import { useOperatorComposable } from "./_Composable";

  export default {
    name: 'OperatorList',
    props: {
    },


    setup() {
      const { data, addData, deleteDataByIndex } = useOperatorComposable();
      return { data, addData, deleteDataByIndex };
    }
  }
</script>

<style lang="scss" scoped>

</style>
  