<template>
    <div class="protected">
        <div v-if="alertVisible" class="protected__alert">You entered the wrong password</div>
        <div class="protected__content">
            <h1 class="protected__content__heading">You need a password to continue</h1>
            <input v-model="password" class="protected__content__input" type="password" placeholder="password"
                @keydown.enter="login" />
            <button @click="login" class="protected__content__btn">Continue</button>
        </div>
    </div>
</template>

<script>
import sha1 from 'js-sha1';

export default {
    data() {
        return {
            password: '',
            alertVisible: false,
            projectComponent: null,
        };
    },
    methods: {
        async login() {
            const hash = sha1(this.password).toString(); // Making the hash

            try {
                // I tried using vue options but i'm so lost so im using what i have in projectview
                const component = await import(`../components/projects/${hash}.vue`);
                // check if exsist
                if (component) {
                    // Navigate to the desired route
                    this.$router.push({ name: 'projectView', params: { projectN: hash } });
                }
            } catch (error) {
                // show error
                this.showError(hash);
            }
        },
        showError(hash) {
            console.log(`Wrong password entered hash: ${hash}`)
            this.alertVisible = true;
            this.password = '';
            this.$refs.passwordInput.setAttribute('placeholder', 'Incorrect password');
        },
    },
};
</script>

<style scoped>
*,
*:after,
*:before {
    box-sizing: border-box;
}

body,
html {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-weight: 300;
    font-size: 16px;
    background: #f2f2f2;
    color: #2D3737;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
}

.protected {
    background: #fff;
    -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    min-width: 500px;
}

.protected__content {
    padding: 24px 28px;
}

.protected__content__heading {
    font-size: 16px;
    font-weight: 500;
    margin: 0 0 12px;
    line-height: 1;
}

.protected__alert {
    display: block;
    border-bottom: 1px solid transparent;
    border-radius: 3px 3px 0 0;
    padding: 12px 14px;
    color: #a94442;
    background-color: #f2dede;
    border-color: #ebccd1;
}

.protected__content__input {
    display: block;
    border: solid 1px #ccc;
    padding: 12px 14px;
    -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
    font-size: 16px;
    width: 100%;
    border-radius: 3px;
    margin-bottom: 12px;
}

.protected__content__input:focus {
    outline: none;
    border-color: #228843;
}

.protected__content__btn {
    background-color: #228843;
    border-radius: 3px;
    cursor: pointer;
    border: none;
    color: #fff;
    padding: 12px 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-weight: 500;
    font-size: 16px;
}

.protected__content__btn:hover {
    background-color: #1C6D36;
}
</style>