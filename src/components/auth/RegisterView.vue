<template>
  <section class="bg-ct-blue-600 min-h-screen grid">
    <div>
      <h1
        class="text-4xl mt-2 xl:text-6xl text-center font-[600] text-ct-yellow-600 mb-4"
      >
        Create an account
      </h1>
      <form
        class="max-w-[27rem] mx-auto overflow-hidden shadow-lg bg-white rounded-2xl p-8 space-y-5"
        @submit.prevent="onSubmit"
      >
        <div class="">
          <label for="name" class="block text-ct-blue-600 mb-3"
            >Your name</label
          >

          <input
            id="name"
            v-model="name"
            type="text"
            placeholder=" "
            class="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4 bg-slate-50"
          />
          <span class="text-red-500 text-xs pt-1 block">{{ errors.name }}</span>
        </div>
        <div class="">
          <label for="email" class="block text-ct-blue-600 mb-3"
            >Email Address</label
          >

          <input
            id="email"
            v-model="email"
            type="email"
            placeholder=" "
            class="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4 bg-slate-50"
          />
          <span class="text-red-500 text-xs pt-1 block">{{
            errors.email
          }}</span>
        </div>
        <div>
          <label for="password" class="block text-ct-blue-600 mb-3"
            >Password</label
          >
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="passwordVisible ? 'text' : 'password'"
              placeholder=" "
              class="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4 bg-slate-50"
            />
            <button
              type="button"
              class="absolute right-3 top-3"
              @click="changePasswordVisibility"
            >
              <Eye v-if="!passwordVisible" height="16" width="16" />
              <EyeCrossed v-else height="16" width="16" />
            </button>
          </div>
          <span class="text-red-500 text-xs pt-1 block">{{
            errors.password
          }}</span>
        </div>

        <button class="bg-teal-500 text-white w-full rounded p-2">
          <span v-if="!isLoading">Login</span>
          <Loader v-else />
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import { useMutation, useQuery, useQueryClient } from "vue-query";
import { getMe, signUpUser, loginUser } from "@/api/authApi";
import type { ISignUpInput } from "@/api/types";
import { createToast } from "mosha-vue-toastify";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import Loader from "@/components/Loader.vue";
import Eye from "@/assets/icons/password-show.svg?component";
import EyeCrossed from "@/assets/icons/password-hide.svg?component";

const authStore = useAuthStore();

const passwordVisible = ref(false);

const loginSchema = toTypedSchema(
  zod.object({
    email: zod
      .string()
      .min(1, "Email address is required")
      .email("Email Address is invalid"),
    password: zod
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    name: zod
      .string()
      .min(1, "Username is required")
      .max(32, "Please, reduce it to 32 characters"),
  })
);

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: loginSchema,
});

const { value: email } = useField("email");
const { value: password } = useField("password");
const { value: name } = useField("name");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const queryClient = useQueryClient();

const { isLoading, mutate } = useMutation(
  (credentials: ISignUpInput) => signUpUser(credentials),
  {
    onError: (error) => {
      if (Array.isArray((error as any).response.data.error)) {
        (error as any).response.data.error.forEach((el: any) =>
          createToast(el.message, {
            position: "top-right",
            type: "warning",
          })
        );
      } else {
        createToast((error as any).response.data.message, {
          position: "top-right",
          type: "danger",
        });
      }
    },
    onSuccess: () => {
      createToast(
        "Successfully created new account! Log in with email and password now",
        {
          position: "top-right",
        }
      );

      resetForm();
    },
  }
);

const onSubmit = handleSubmit((values) => {
  console.log("submit");
  mutate({
    email: values.email,
    password: values.password,
    name: values.name,
  });
});

const changePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
</script>
