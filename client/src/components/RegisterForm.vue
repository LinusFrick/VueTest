<template>
    <div class="container">
      <form @submit.prevent="register" >
        <div>
        <input type="text" class="form-input" placeholder="Username" v-model="username" required />
        <input type="text" class="form-input" placeholder="Email" v-model="email" required />
        <input type="password" class="form-input" placeholder="Password" v-model="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data(){ 
        return {
            username: '',
            email: '',
            password: '',
        };
    },
    methods: {
        async register() {
          console.log('reg')
            const success = await this.$store.dispatch('register', {
                username: this.username,
                email: this.email,
                password: this.password,
            });

            if(success){
              this.$router.push({ name: 'home' });
            }
        }
    }
  };
  </script>
  
  <style scoped>
  html,
  body {
    margin: 0;
    height: 100%;
  }
  
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 150vh;
    max-width: 900px;
    padding: 1rem;
    box-sizing: border-box;
  }
  input {
    min-height: 8vh;
  }

  .form-input {
  font-size: 18px;
  padding: 0.5rem;
  line-height: 2;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  box-sizing: border-box;
  width: 100%;
}

.form-input:focus {
  border-color: #0070f3;
}
  </style>
  