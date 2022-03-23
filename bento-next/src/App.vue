<script setup>
import SearchBar from "./components/SearchBar.vue";
import ThemeButton from "./components/ThemeButton.vue";
</script>

<template>
  <div id="app">
    <ThemeButton />
    <SearchBar />
    <h1 class="underline font-bold"></h1>
  </div>
</template>

<style>
@import "./assets/base.css";
</style>
