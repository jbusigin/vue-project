<template>
    <div class="hello">
      <h1>{{ $t('operator-list-title') }}</h1>
    </div>

    <button @click="addData({name: 'Flavis'})">{{ $t('action-add') }}</button>
    <button @click="addData({name: 'Elvis'})">{{ $t('action-add') }}</button>
    
    <button @click="deleteDataByIndex(1)">{{ $t('action-delete') }}</button>
    
    <button>{{ $t('action-import') }}</button>
    <button>{{ $t('action-export') }}</button>

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
  