<template>
  <div>
    <div class="row">
      <div class="col-xs-12">
        <header>
          <h1>{{ title }}</h1>
        </header>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Server Status'
    };
  }
}
</script>