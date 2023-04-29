<template>
    <div class="container">
      <form @submit.prevent="login" >
        <div>
        <input type="text" class="form-input" placeholder="Username" v-model="username" required />
        <input type="password" class="form-input" placeholder="Password" v-model="password" required />
        </div>
        <button type="submit" >sign in</button>
      </form>
    </div>
  </template>
  
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const role = await this.$store.dispatch("login", {
        username: this.username,
        password: this.password,
      });

      if (role) {
        if (role === "admin") {
          this.$router.push({ name: "admin" });
        } else if (role === "customer") {
          this.$router.push({ name: "customer" });
        }
      }
    },
  },
};
</script>

  
  <style scoped>
  html,
  body {
    margin: 0;
    height: 100%;
  }
  
  body {
    display: flex;
    justify-content: center;
    align-items: center;
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
  