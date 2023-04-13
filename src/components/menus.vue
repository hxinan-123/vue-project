<template>
  <div class="list-todos">
    <!--菜单容器-->
    <a
      @click="goList(item.id)"
      class="list-todo list activeListClass"
      :class="{ active: item.id === todoId }"
      v-for="item in items"
      :key="item.id"
    >
      <!--单个菜单容器-->
      <span class="icon-lock" v-if="item.locked"></span>
      <!--锁的图标-->
      <span class="count-list" v-if="item.count > 0">{{ item.count }}</span
      ><!--数字-->
      {{ item.title }}
      <!--菜单内容-->
    </a>
    <a class=" link-list-new" @click="addTodoList">
      <!--新增菜单-->
      <span class="icon-plus"> </span>
      新增
    </a>
  </div>
</template>
<script>
import { getTodoList, addTodo } from "../api/api";
export default {
  data() {
    return {
      items: [],
      todoId: ""
    };
  },
  watch: {
    todoId: {
      handler(id) {
        this.$router.push({ name: "todo", params: { id: id } });
        //监听到用户的点击todoId的变化在跳转路由
      }
    }
  },
  created() {
    getTodoList({}).then(res => {
      const TODOS = res.data.todos;
      this.items = TODOS;
      this.todoId = TODOS[0].id;
    });
  },
  methods: {
    goList(id) {
      this.todoId = id;
    },
    addTodoList() {
      addTodo({}).then(data => {
        getTodoList({}).then(res => {
          const TODOS = res.data.todos;
          this.todoId = TODOS[TODOS.length - 1].id;
          this.items = TODOS;
        });
      });
    }
  }
};
</script>
<style lang="less">
@import "../common/style/menu.less";
</style>
