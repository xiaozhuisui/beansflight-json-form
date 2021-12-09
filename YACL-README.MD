# YALC本地组件调试

## 全局安装yalc

```shell
yarn global add yalc
```

## 在组件开发目录下 打包并发布

```shell
#先执行
yarn lib
#再执行发布
yalc publish

```

## 在测试的项目中引入并安装依赖

```shell
# 引入依赖
yalc add my-component-package  
# 更新依赖
yarn
```

## 组件的代码更新时，在组件开发的目录下

```shell
# 先执行
yarn lib 
# yarcl 发布
yalc push
```

## 移除测试的包

```shell
yalc remove --all
```

