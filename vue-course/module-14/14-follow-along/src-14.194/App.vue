<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Animations</h1>
        <hr>
        <button 
          @click="show = !show"
          class="btn btn-primary"
          >{{ show ? 'Hide alert' : 'Show alert' }}</button>
        <br><br>
        <transition>
          <div 
            name="fade"
            v-if="show" 
            class="alert alert-info"
            >This is some info</div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  }
}
</script>

<style>
/* .fade-enter {

}

.fade-enter-active {
  
}

.fade-leave {
  
}

.fade-leave-active {
  
} */
</style>
