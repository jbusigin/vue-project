// import { ref } from "vue";
import { reactive } from "vue";

export function useOperatorComposable() {
  
  const data = reactive({operators: []});

  function addData(obj) {
    if(Object.keys(obj).length){
      data.operators.push(obj);
    }

    console.log(data.operators);
  }

  function deleteDataByIndex(idx) {
    if(idx.length){
      data.operators.splice(idx, 1);
    }
    console.log(data.operators);
  }

  return {
    data,
    addData,
    deleteDataByIndex
  }

}