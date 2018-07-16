<template>
    <div class="uk-section uk-section-muted uk-flex uk-flex-middle uk-animation-fade" uk-height-viewport>
        <div class="uk-width-1-1">
            <div class="uk-container">
                <div class="uk-grid-margin uk-grid uk-grid-stack" uk-grid>
                    <div class="uk-width-1-1@m">
                        <div class="uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large">
                            <h3 class="uk-card-title uk-text-center">Create an Account Now!</h3>
                            <form @submit="signup">
                                <div class="uk-margin">
                                    <div class="uk-inline uk-width-1-1">
                                        <span class="uk-form-icon" uk-icon="icon: user"></span>
                                        <input name="name" v-model="nama_panggilan" placeholder="Nama Panggilan" class="uk-input uk-form-large" type="text">
                                    </div>
                                </div>
                                <div class="uk-margin">
                                    <div class="uk-inline uk-width-1-1">
                                        <span class="uk-form-icon" uk-icon="icon: mail"></span>
                                        <input v-model="email" name="email" placeholder="Email" class="uk-input uk-form-large" type="text">
                                    </div>
                                </div>
                                <div class="uk-margin">
                                    <div class="uk-inline uk-width-1-1">
                                        <span class="uk-form-icon" uk-icon="icon: lock"></span>
                                        <input name="password" v-model="password" placeholder="Password" class="uk-input uk-form-large" type="password">
                                    </div>
                                </div>
                                <div class="uk-margin">
                                    <button @click="signup" class="uk-button uk-button-primary uk-button-large uk-width-1-1">REGISTER</button>
                                </div>
                                <div class="uk-text-small uk-text-center">
                                    already have account?
                                    <router-link to="/login">Login Now</router-link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        mounted(){
               var currentUser = Parse.User.current();
                if(currentUser){
                    this.$router.push('/')
                }
        },
        data:()=>({
            email : '',
            nama_panggilan : '',
            password : '',
        }),
        methods: {
            signup(event) {
                event.preventDefault();

                var user = new Parse.User();
                user.set("username", this.email);
                user.set("email", this.email);
                user.set("nama_panggilan",this.nama_panggilan);
                user.set("password",this.password)
                user.signUp(null, {
                    success: (user)=> {
                        // Hooray! Let them use the app now.
                        this.$router.push('/')
                    },
                    error: function(user, error) {
                        // Show the error message somewhere and let the user try again.
                        alert("Error: " + error.code + " " + error.message);
                    }
                });
            }
        }
    }
</script>