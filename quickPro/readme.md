# 1. Ubuntu下安装nginx
```
sudo apt-get update
sudo apt-get install nginx
```

nginx常用文件夹：
> 1）所有的配置文件都在/etc/nginx下。
2）执行程序文件在/usr/sbin/nginx。
3）日志文件放在了/var/log/nginx中。分别是access.log和error.log
4）默认虚拟主机的目录配置在了/var/www/下面。这个目录位置的设定是在/etc/nginx/sites-available里的配置文件进行的。与虚拟主机相关的设置，都是在这里进行的，可以自行修改，重启Nginx即可生效。
5) 默认目录var/www/, 还可以鞥/usr/share/nginx/html/

启动、关闭、重启Nginx服务：
> 1）sudo systemctl start nginx
2）sudo systemctl restart nginx
3）sudo systemctl stop nginx

# 2.在工程中配置sftp.json
  在工程中，快捷键 ⌘+⇧+P 召唤指令窗口并输入 sftp，就会在当前工程的 .vscode 文件夹下生成 sftp.json 文件，有几个重点字段是需要配置的：host, username, privateKeyPath, remotePath。

# 3. 使用sftp注意
 cmd+shift+p  sftp:config ,然后复制sftp.json的内容进去，注意保留新生成的sftp.json里面的大括号
 密码： @mm

# 4. 使用https注意
> 1. 可以使用阿里云提供的免费ssl
> 2. mac可以用scp命令传输公钥和私钥

# 5. 服务端使用egg.js

# 6. mac安装mongodb
[网站](https://www.runoob.com/mongodb/mongodb-osx-install.html);
```
// 查看进程，关闭进程
$ ps -ef | grep mongo
$ sudo kill xxxxx
```

# 7. ubuntu
1. 无法下载npm
> ubuntu 版本生命周期到了，需要替换镜像(点击访问网站)[https://www.cocobolo.top/linux/2019/04/26/apt-get%E5%87%BA%E7%8E%B0Err-404-Not-Found%E7%9A%84%E8%A7%A3%E5%86%B3%E5%8A%9E%E6%B3%95.html]
> cat /etc/issue  查看ubuntu版本
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak  # 备份原始文件
sudo sed -i -r 's/([a-z]{2}\.)?archive.ubuntu.com/mirrors.aliyun.com/g' /etc/apt/sources.list
sudo sed -i -r 's/security.ubuntu.com/mirrors.aliyun.com/g' /etc/apt/sources.list
sudo apt-get update

# 8. 安装mongo
```
#Step 1:  Import the MongoDB public key
#In Ubuntu 18.*+, you may get invalid signatures. --recv value may need to be updated to EA312927. 
#See here for more details on the invalid signature issue: [https://stackoverflow.com/questions/34733340/mongodb-gpg-invalid-signatures][1]

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

#Step 2: Generate a file with the MongoDB repository url
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list

#Step 3: Refresh the local database with the packages
sudo apt-get update

#Step 4: Install the last stable MongoDB version and all the necessary packages on our system
sudo apt-get install mongodb-org

         #Or
# The unofficial mongodb package provided by Ubuntu is not maintained by MongoDB and conflict with MongoDB’s offically supported packages. Use the official MongoDB mongodb-org packages, which are kept up-to-date with the most recent major and minor MongoDB releases.
sudo apt-get install -y mongodb 
```

# 9. 出现奇怪的问题
1. 删除node_modules文件夹
2. 删除package-lock.json文件
3. 执行npm install