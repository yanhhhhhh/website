#!/bin/bash
#从远程获取最新更新并修剪已删除的分支

git fetch -p
#获取远程仓库中已删除的本地分支列表

deleted_branches=$(git branch -vv | grep ': gone]' | awk '{print $1}')
#循环遍历列表并删除每个分支

for branch in $deleted_branches; do
    echo "Deleting branch $branch"
    git branch -d $branch
done
#创建脚本文件：
#在您的项目根目录下创建一个新的文件，例如 delete_deleted_remote_branches.sh。
#
#将上面的脚本内容复制到文件中。
#
#赋予脚本执行权限：
#
#bash

# chmod +x delete_deleted_remote_branches.sh
#运行脚本：
#
#bash

# ./delete_deleted_remote_branches.sh
#这个脚本会自动删除那些在远程仓库中已经不存在的本地分支，从而保持本地分支的清洁和同步。