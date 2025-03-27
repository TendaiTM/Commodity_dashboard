<template>
  <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] z-40">
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
      <p class="text-sm text-muted-foreground">
        Enter your email below to create your account
      </p>
    </div>
    <div class="grid gap-6">
      <form>
        <div class="grid gap-4">
          <div>
            <label class="text-xs font-medium leading-8 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="email">Email</label>
            <UInput v-model="email" placeholder="name@example.com" type="email" autocapitalize="none"
              autocomplete="email" autocorrect="off" />
          </div>
          <div class="space-y-2">
            <div>
              <label class="text-xs font-medium leading-8 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="email">Password</label>
              <UInput v-model="password.value" placeholder="Password" type="password" autocapitalize="none"
                autocomplete="email" autocorrect="off" />
            </div>
            <div v-if="passwordValid">
              <label class="text-xs font-medium leading-8 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="email">Confirm Password</label>
              <UInput v-model="password.confirm" placeholder="Confirm Password" type="password" autocapitalize="none"
                autocomplete="email" autocorrect="off" />
            </div>
          </div>
          <UButton @click="register()" color="green" block>Sign Up With Email</UButton>
        </div>
      </form>
      <div class="relative">
        <UDivider label="Already have an account?" />
        <!-- Auth Providers -->
        <!-- <UButton block color="white" v-for="provider of providers">
          <template #leading>
            <icon :name="provider.icon" class="mr-2 h-4 w-4"></icon>
            {{ provider.name }}
          </template>
{{ provider.name }}
</UButton> -->
      </div>
      <NuxtLink to="/auth/login">
          <UButton :disabled="loginValid" color="orange" block>Sign In</UButton>
        </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  auth: false,
});
</script>

<script>
import { useRouter } from '#app';

export default {
  data() {
    return {
      email: "",
      password: {
        value: "",
        confirm: "",
      },
    };
  },
  methods: {
    async register() {
      const router = useRouter()
      const {data, error } = await useSupabaseClient().auth.signUp({
          email: this.email,
          password: this.password.value,
        })
      console.log(data)
      console.log(error)
    }
  },
  computed: {
    emailValid() {
      return this.email.length > 0;
    },

    passwordConfirmValid() {
      return this.password.value === this.password.confirm;
    },

    passwordMatch() {
      return this.password.value === this.password.confirm;
    },

    passwordValid() {
      return this.password.value.length > 6;
    },

    registerValid() {
      return (
        this.emailValid &&
        this.passwordValid &&
        this.passwordConfirmValid &&
        this.passwordMatch
      );
    },
  },
};
</script>
