<template>
  <div class="rowEdit">
    {{ activeId }}
    <el-button
      class="filter-item"
      size="mini"
      type="text"
      icon="el-icon-my-add"
      @click="edit()"
    >
      编辑
    </el-button>
    <el-button
      class="filter-item"
      size="mini"
      type="text"
      icon="el-icon-my-publish"
      @click="cancle"
      >取消
    </el-button>
    <el-button
      class="filter-item"
      type="text"
      icon="el-icon-my-delete"
      size="mini"
      @click="save"
    >
      保存
    </el-button>
    <!--表格渲染-->
    <!-- @selection-change="selectItem" -->
    <el-table
      ref="table"
      :data="tabledatas"
      @selection-change="selectItem"
      :cell-style="rowStyle"
      :header-cell-style="headStyle"
      @row-click="clickRowIO"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="dydjbm" label="日期">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.dydjbm"
            v-show="scope.row.show"
            placeholder="请选择"
          >
            <el-option
              v-for="item in dydjbm"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
          <span v-show="!scope.row.show">{{ scope.row.dydjbm }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名">
        <template slot-scope="scope">
          <el-input
            size="small"
            v-model="scope.row.name"
            v-show="scope.row.show"
            placeholder="请输入内容"
            @blur="sj(scope.row, 'name', scope.row.name)"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      oldRow: {
      },
      dydjbm: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
      tabledatas: [],
      selectlist: [],
      activeId: 0,
    };
  },
  methods: {
    sj(row, name, value) {
      let obj = {};
      if (this.oldRow["name"] !== value) {
        obj["name"] = value;
        console.log([row], "===值改变了");
      } else {
        console.log([], '===值没变');
      }
    },
    clickRowIO(row, column) {
      this.selectlist.forEach((v) => {
        this.oldRow["name"] = v.name;
        console.log(v.name, row.name);
        if (v.name !== row.name) {
          this.activeId = row.id;
          console.log(this.activeId, "this.activeId");
        }
      });
    },
    /**
                单个去勾选时触发自定义的selectItem函数
                @selection-change事件会默认传行数据进去，
                用selectItem(rows)的rows接收就好，rows所选行数据的数组
            */
    selectItem(rows) {
      if (rows.length > 1) {
        var newRows = rows.filter((it, index) => {
          if (index === rows.length - 1) {
            this.$refs.table.toggleRowSelection(it, true);
            return true;
          } else {
            this.$refs.table.toggleRowSelection(it, false);
            return false;
          }
        });
        this.selectlist = newRows;
      } else {
        this.selectlist = rows;
      }
    },
    /**
                点击那一行数据触发的事件默认传点击那行的数据，自定义onSelectOp(row)函数，
                用row来接收点击的那行数据，
                先把所有的选项清空this.$refs.multipleTable.clearSelection();
                再把点击的那行勾选this.$refs.multipleTable.toggleRowSelection(row, true);
                把自定义数组清空this.selectlist = [];
                把新勾选的数据push进数组this.selectlist.push(row);
           */
    onSelectOp(row) {
      this.$refs.table.clearSelection();
      this.$refs.table.toggleRowSelection(row, true);
      this.selectlist = [];
      this.selectlist.push(row);
    },
    // 编辑
    edit(row) {
      this.selectlist[0].show = true;
    },
    //保存
    save() {
      this.selectlist[0].show = false;
      console.log(this.selectlist, "save");
    },
    //取消
    cancle() {
      this.selectlist[0].show = false;
    },
    headStyle({ row, column, rowIndex, columnIndex }) {
      return { background: "#dcd7eb", color: "#6f4dbb" };
    },
    rowStyle({ row, column, rowIndex, columnIndex }) {
      // console.log(row, "{row}");
      if (rowIndex % 2 === 0) {
        return { background: "#2a3056", color: "#fff" };
      } else {
        return { background: "burlywood", color: "#000" };
      }
    },
  },
  created() {
    // 发请求去后台拿数据,如果有api，就正常请求，
    //我这里是demo，就简单给list赋值了，原理一样。
    // getlistApi().then(res => {
    // let list = res.data.list
    let list = [
      {
        id: 1,
        dydjbm: "2016-05-02",
        name: "张三",
        address: "上海市普陀区金沙江路",
      },
      {
        id: 2,
        dydjbm: "2018-05-04",
        name: "李四",
        address: "苏州市昆山市",
      },
      {
        id: 3,
        dydjbm: "2020-05-01",
        name: "王五",
        address: "淮安市淮阴区曼度广场",
      },
      {
        id: 4,
        dydjbm: "2022-05-03",
        name: "赵六",
        address: "杭州市余杭区创景路",
      },
    ];
    list.forEach((element) => {
      element["show"] = false;
    });
    this.tabledatas = list;
  },
};
</script>
 
<style>
</style>