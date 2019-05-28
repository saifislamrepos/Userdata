<template>
  <div class="sort">
    <span v-for = "sortkey in sortObject.sortkeys">
      <a @click="sort(sortkey.value)">{{sortkey.name}}</a>
    </span>
  </div>
</template>
<script src= '../sort/sort.js'></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src = '../sort/sort.css'  scoped></style>
