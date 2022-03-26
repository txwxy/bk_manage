<template>
  <div class="tabs">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name != 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handlerClose(tag, index)"
      size="small"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    ...mapMutations({
      close: "closeTag",
    }),

    changeMenu(item) {
      this.$router.push({ name: item.name });
    },

    handlerClose(tag, index) {
      let length = this.tags.length - 1;
      this.close(tag);
      // 判断是否是最后一个

      // 第一种情况
      if (tag.name !== this.$route.name) {
        return;
      }

      if (index === length) {
        // 往左边跳转
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        // 往右边跳转
        this.$router.push({ name: this.tags[index].name });
      }
    },
  },
};
</script>
