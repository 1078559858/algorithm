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

启动、关闭、重启Nginx服务：
> 1）sudo systemctl start nginx
2）sudo systemctl restart nginx
3）sudo systemctl stop nginx