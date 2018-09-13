<template>
  <div>
    <comp1></comp1>
    <comp2></comp2>
    <comp3></comp3>
  </div>
</template>

<script>

import Comp1   from '@/components/Comp1.vue';
import Comp2   from '@/components/Comp2.vue';
import Comp3   from '@/components/Comp3.vue';

export default {
  name: 'App',
  components: {
    'comp1'   :  Comp1,
    'comp2'   :  Comp2,
    'comp3'   :  Comp3,
  },
};

</script>

<style scoped>

</style>

