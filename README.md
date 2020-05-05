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
explain('queryPlanner') 
explain('executionStats')
explain('allPlansExecution')

========================================================
3 queryPlanner分析

3.1 namespace

本次所查询的表。

3.2 indexFilterSet

是否使用partial index，比如只对某个表中的部分文档进行index。

3.3 parsedQuery

本次执行的查询

3.4 winning plan

3.4.1 stage

   COLLSCAN：全表扫描

    IXSCAN：索引扫描

    FETCH：根据索引去检索指定document

    SHARD_MERGE：将各个分片返回数据进行merge

    SORT：表明在内存中进行了排序

    LIMIT：使用limit限制返回数

    SKIP：使用skip进行跳过

    IDHACK：针对_id进行查询

    winning plan的stage是一个树状结构，最外面的stage是根节点，然后inputStage或者inputStages里面的stage是它的子stage。

The explain results present the query plans as a tree of stages. Each stage passes its results (i.e. documents or index keys) to the parent node. The leaf nodes access the collection or the indices. The internal nodes manipulate the documents or the index keys that result from the child nodes. The root node is the final stage from which MongoDB derives the result set.

explain.queryPlanner.winningPlan.stage A string that denotes the name of the stage.

Each stage consists of information specific to the stage. For instance, an IXSCAN stage will include the index bounds along with other data specific to the index scan. If a stage has a child stage or multiple child stages, the stage will have an inputStage or inputStages.

explain.queryPlanner.winningPlan.inputStage A document that describes the child stage, which provides the documents or index keys to its parent. The field is present if the parent stage has only one child.

3.4.2 filter

对子stage返回的结果进行过滤，filter给本stage指明了fetch的条件。

3.4.3 inputStage

用于容纳一个子stage。

3.4.3.1 stage

子stage

3.4.3.2 indexName

所使用的索引的名字。

3.4.3.3 indexBounds

索引查找时使用的范围。
========================================================
```