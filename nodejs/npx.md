# 1. 简介
npm 从 5.2 版本开始增加了npx命令。 目前我的npm版本是6.14.10, node 版本是14.15.4；

# 2. 安装
> npm install -g npx

# 3. 背景
## 1. 解决内部调用
解决内部调用问题。
npm调用需要在项目中 node_modules/.bin/mocha --version
npx： npx Mocha --version
运行时候，会到node_modules/.bin路径和环境变量$path里面检查路径是否存在。

## 2. 避免全局安装
命令： npx create-react-app my-react-app
运行时候会下载到一个临时目录中，创建完脚手架会删除，所以不用进行全局安装。

## 3. 指定版本
命令： npx uglify-js@3.1.0 main.js -o /dist/main.js

## 4. 注意
只要本地没下载同名文件，就会去下载文件

npx http-server
会先检查本地是否有文件，没有就会去下载，然后执行。

## 5. --no-install参数、--ignore-existing参数
强制本地模块，本地不存在报错。  
强制安装远程模块  

## 6. -p参数
* 指定安装模块版本
  * npx -p node@0.12.8 node -v
* 安装多个模块 
  * npx -p lolcatjs -p cowsay [command]

## 7. -c参数

如果执行多个模块，默认只有第一个模块使用npx下载，后面还是执行shell命令。所以需要-c命令
命令： npx -p lolcatjs -p cowsay 'hello localjs | cowsay'

## 8. -c命令的技巧
-c命令还可以把环境变量带入要执行的命令
npx -c 'echo "$npm_package_name"'  

## 9. 技巧-执行github代码
```
# 执行 Gist 代码
$ npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32

# 执行仓库代码
$ npx github:piuccio/cowsay hello
```