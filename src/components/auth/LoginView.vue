<template>
  <section class="bg-ct-blue-600 min-h-screen grid">
    <div>
      <h1
        class="text-4xl mt-2 xl:text-6xl text-center font-[600] text-ct-yellow-600 mb-4"
      >
        Welcome Back
      </h1>
      <form
        class="max-w-[27rem] mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
        @submit.prevent="onSubmit"
      >
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
        <div class="text-right">
          <a href="" class="">Forgot Password?</a>
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
import { Form, useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import { useMutation, useQuery, useQueryClient } from "vue-query";
import { getMe, loginUser } from "@/api/authApi";
import type { ILoginInput } from "@/api/types";
import { createToast } from "mosha-vue-toastify";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import Loader from "@/components/Loader.vue";
// import Cookies from "universal-cookie";
import { useCookies } from "@vueuse/integrations/useCookies";
import Eye from "@/assets/icons/password-show.svg?component";
import EyeCrossed from "@/assets/icons/password-hide.svg?component";

const authStore = useAuthStore();
const cookies = useCookies(["token"]);

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
  })
);

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: loginSchema,
});

const { value: email } = useField("email");
const { value: password } = useField("password");

const authResult = useQuery("authUser", () => getMe(), {
  enabled: false,
  retry: 1,
  onSuccess: (data) => {
    console.log("/me return: ", data);
    authStore.setAuthUser(data);
  },
});

const queryClient = useQueryClient();

const { isLoading, mutate } = useMutation(
  (credentials: ILoginInput) => loginUser(credentials),
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
    onSuccess: ({ token }) => {
      console.log("onsuccess jwt:", token);
      // cookies.set("token", token);
      queryClient.refetchQueries("authUser");
      createToast("Successfully logged in", {
        position: "top-right",
      });

      resetForm();
      // const authUser = Object.assign({}, data.user);
      // authStore.setAuthUser(authUser);
      // router.push({ name: "profile" });
    },
  }
);

const onSubmit = handleSubmit((values) => {
  console.log("submit");
  mutate({
    email: values.email,
    password: values.password,
  });
});

const changePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
</script>
