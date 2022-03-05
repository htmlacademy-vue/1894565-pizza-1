<template>
  <div>
    <transition apper name="slide" mode="out-in">
      <component :is="layout">
        <slot />
      </component>
    </transition>
  </div>
</template>

<script>
const defaultLayout = "AppLayoutDefault";

export default {
  name: "AppLayout",

  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>

<style>
.slide-enter-active {
  transition: all 0.4s;
}

.slide-enter {
  opacity: 0;
  margin-left: 90px;
}

.slide-leave-active {
  transition: all 0.4s;
  opacity: 0;
  margin-right: -100px;
}
</style>
