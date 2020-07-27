<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Http</h1>
        <hr>
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" class="form-control" id="username" v-model="user.username">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" class="form-control" id="email" v-model="user.email">
        </div>
        <button class="btn btn-primary" @click="submit">Submit</button>
        <hr>
        <button 
          class="btn btn-primary"
          @click="fetchData">Get data</button>
        
        <br><br>
        
        <ul class="list-group">
          <li class="list-group-item" v-for="u in users" :key="u.email">{{ u.username }}, {{ u.email }}</li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        email: '',
      },
      users: []
    };
  },
  resource: {},
  methods: {
    submit() {
      // console.log(this.user);

      // Sending a POST request
      // this.$http.post('data.json', this.user)
      //   .then(response => {
      //     console.log(response);
      //   }, error => {
      //     console.log(error);
      //   });

      this.resource.save({}, this.user);
    },
    fetchData() {
      // Sending a GET request
      this.$http.get('data.json')
        .then(response => {
          return response.json();
        })
        .then(data => {
          const resultArray = [];
          for (let key in data) {
            resultArray.push(data[key]);
          }
          this.users = resultArray;
        });
    }
  },
  created() {
    this.resource = this.$resource('data.json');
  }
}
</script>

<style>
</style>
