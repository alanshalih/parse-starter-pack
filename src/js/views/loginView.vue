<template>
   <div class="uk-section uk-section-muted uk-flex uk-flex-middle uk-animation-fade" uk-height-viewport>
	<div class="uk-width-1-1">
		<div class="uk-container">
			<div class="uk-grid-margin uk-grid uk-grid-stack" uk-grid>
				<div class="uk-width-1-1@m">
					<div class="uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large">
						<h3 class="uk-card-title uk-text-center">Welcome back!</h3>
						<form @submit="login">
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
								<button @click="login" class="uk-button uk-button-primary uk-button-large uk-width-1-1">Login</button>
							</div>
							<div class="uk-text-small uk-text-center">
								Not registered? <router-link to="/register">Create an account</router-link>
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
    export default{
        mounted(){
                var currentUser = Parse.User.current();
                if(currentUser){
                    this.$router.push('/')
                }
        },
        data:()=>({
                email : '',
                password : '',
            }),
        methods : {
            
            login(event){
                event.preventDefault();
                
                Parse.User.logIn(this.email, this.password, {
                success: (user)=> {
                    this.$router.push('/');
                    // Do stuff after successful login.
                },
                error: function(user, error) {
                    // The login failed. Check error to see why.
                }
                });
            }
        }
    }
</script>   