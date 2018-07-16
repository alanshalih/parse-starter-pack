<template>
    <div>
        <button class="uk-button" @click="logout()">logout</button>
    </div>
</template>

<script>
    import currentUser from '../utilites/currentUser.js'
    export default{
        mounted(){
            currentUser(this);
        },
        methods : {
            logout(){
                
                Parse.User.logOut().then(() => {
                this.$router.push('/login')
                });
            }
        }
    }
</script>