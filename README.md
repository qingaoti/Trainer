## 描述
-   用于练习日常代码, 跑用例的项目

### 目录结构
```bash
├── /HTMLtest/          # 项目页面测试输出目录
├── /JStest/            # 项目JS测试输出目录
```

### 快速开始
进入目录安装依赖:

```bash
#开始前请确保没有安装roadhog、webpack到NPM全局目录
npm i 或者 yarn install
```

### 调整内容分配
```
全局安装：
npm install -g increase-memory-limit

进入工程目录，执行 :
increase-memory-limit 4096mb
```

### 设置npm
```
npm config set disturl https://npm.taobao.org/dist
npm config set registry https://registry.npm.taobao.org

## verdaccio 使用说明

- 新增用户
    - npm adduser --registry http://10.5.32.38:4873
- 设置私服
    - npm config set registry http://10.5.32.38:4873
- 推送npm包到私服
    - npm publish --registry http://10.5.32.38:4873

```

## 自动生成实体类
```
npm install -g sequelize-auto

npm install -g mysql

sequelize-auto -o "./app/model" -d egg -h 10.5.24.143 -u root -p 3306 -x secret -e mysql -C
```

### 索引
```
创建索引

1.单键索引的创建：db.test.ensureIndex({name:1},{name:'index_name'})

2.复合索引的创建：db.test.ensureIndex({name:1,age:1,sex:1},{name:'index_nas'})

//查询当前文档的索引
db.CollectionName.getIndexes()

//查询当前库的所有索引
db.system.indexes.find()

//执行计划
db.test.ensureIndex({name:1},{name:'index_name'})

//分析索引
explain(queryPlanner) 
explain(executionStats)
explain(allPlansExecution)
```