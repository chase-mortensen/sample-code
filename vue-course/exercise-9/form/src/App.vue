<template>
  <div class="container">
    <form v-show="!isSubmitted">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">

          <!-- Exercise 1 -->
          <!-- Create a Signup Form where you retrieve the following Information -->
          <h1>Signup Form</h1>

          <!-- Full Name (First Name + Last Name) -->
          
          <app-full-name
            v-model="user"></app-full-name>

            <!-- Mail -->
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              class="form-control"
              v-model.lazy="email">
          </div>

            <!-- Password -->
          <div class="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              id="password"
              class="form-control"
              v-model.lazy="password">
          </div>

            <!-- Store Data? Yes/No -->
          <div class="form-group">
            <label for="storeData">Store data?</label>
            <app-switch 
              id="storeData"
              v-model="storeData"></app-switch>
          </div>
            
            <!-- Exercise 2 -->
            <!-- Only display the Form if it has NOT been submitted -->
            <!-- Display the Data Summary ONCE the Form HAS been submitted -->
          <div class="form-group">
            <button 
              @click.prevent="isSubmitted = true"
              type="submit"
              class="btn btn-primary">Submit</button>
          </div>
          

          <!-- Exercise 3 -->
          <!-- Edit the Example from above and create a custom "Full Name" Control -->
          <!-- which still holds the First Name and Last Name Input Field -->
        </div>
      </div>
    </form>
    <br>
      <div class="row" v-if="isSubmitted">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>Your Data</h4>
            </div>
            <div class="panel-body">
              <p>Full Name: {{ user.firstName }} {{ user.lastName }}</p>
              <p>Mail: {{ email }}</p>
              <p>Password: {{ password }}</p>
              <p>Store in database?: {{ storeData ? 'yes' : 'no' }}</p>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Switch from './Switch.vue';
import FullName from './FullName.vue';

export default {
  data() {
    return {
      user: {
        firstName: '',
        lastName: ''
      },
      email: '',
      password: '',
      storeData: true,
      isSubmitted: false
    }
  },
  components: {
    'app-switch': Switch,
    'app-full-name': FullName
  }
}
</script>

<style>
</style>
