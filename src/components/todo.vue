<template>
  <div class="page lists-show">
    <!--最外层容器-->
    <nav>
      <!--容器上半部分-->
      <div
        class="nav-group"
        @click="$store.dispatch('updateMenu')"
        v-show="!isUpdate"
      >
        <!-- 在菜单的图标下面添加updateMenu时间，他可以直接调用vuex actions.js里面的updateMenu方法 -->
        <a class="nav-item">
          <span class="icon-list-unordered"> </span>
        </a>
      </div>
      <h1 class="title-page">
        <span class="title-wrapper">{{ todo.title }}</span>
        <!-- 标题-->
        <span class="count-list">{{ todo.count }}</span
        ><!-- 数目-->
      </h1>
      <div class="nav-group right">
        <!-- 右边的删除，锁定图标容器-->
        <div class="options-web">
          <a class=" nav-item">
            <!-- 锁定图标-->
            <span class="icon-lock" v-if="todo.locked"></span>
            <span class="icon-unlock" v-else> </span>
          </a>
          <a class=" nav-item"
            ><!-- 删除图标-->
            <span class="icon-trash"> </span>
          </a>
        </div>
      </div>

      <div class=" form todo-new input-symbol">
        <!-- 新增单个代办单项输入框,监听了回车事件，双向绑定text值,监听了disabled属性，在todo.locked为true的情况下无法编辑-->
        <input
          type="text"
          v-model="text"
          placeholder="请输入"
          :disabled="todo.locked"
          @keyup.enter="onAdd"
        />
        <span class="icon-add"></span>
      </div>
    </nav>
    <div class="content-scrollable list-items">
      <!--容器下半部分-->
      <div v-for="item in items" :key="item.text">
        <item :item="item"></item>
      </div>
    </div>
  </div>
</template>
<script>
import { addRecord, getTodo } from "../api/api";
import item from "./item.vue";
export default {
  data() {
    return {
      todo: {
        //详情内容
        title: "星期一",
        count: 12,
        locked: false
      },
      items: [
        //代办单项列表
      ],
      text: "" //新增代办单项绑定的值
    };
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.init();
      }
    }
  },
  // created() {
  //   this.init();
  // },
  components: {
    item
  },
  methods: {
    onAdd() {
      const ID = this.$route.params.id;
      addRecord({ id: ID, text: this.text }).then(res => {
        this.text = "";
        this.init();
      });
    },

    init() {
      const ID = this.$route.params.id;
      getTodo({ id: ID }).then(res => {
        let { id, title, count, isDelete, locked, record } = res.data.todo;
        this.items = record;
        this.todo = {
          id: id,
          title: title,
          count: count,
          locked: locked,
          isDelete: isDelete
        };
      });
    }
  }
};
</script>
<style lang="less">
@import "../common/style/nav.less";
@import "../common/style/form.less";
@import "../common/style/todo.less";
</style>
