<template>
  <nav class="text-center">
    <a href="/">Grupos</a> | 
    <a href="/user">Usuário</a> |
    <a href="/permissao">Permissão</a>
  </nav>
  <hr>
  <router-view />
  <ConfirmDialog></ConfirmDialog>
  <Toast></Toast>
</template>

<style></style>