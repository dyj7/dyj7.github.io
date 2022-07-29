---
title: git
date: 2021-12-30
tags:
 - frontend
categories:
 - frontend
---

## 版本控制是一种记录一个或若干文件内容变化，以便将来查阅特定版本修订情况的系统。

### Git 三种状态 : 已提交（committed）、已修改（modified） 和 已暂存（staged）

- 已修改表示修改了文件，但还没保存到数据库中。
- 已暂存表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。
- 已提交表示数据已经安全地保存在本地数据库中。

## 查看配置

- 查看所有的配置以及它们所在的文件:
`git config --list --show-origin`
- 设置用户名和邮件地址
    - `git config --global user.name "Selven Du"`
    - `git config --global user.email selven.du@qq.com`
- Git 的配置 `git config --list`
- 获取帮助

```bash
git help <verb>
git <verb> --help
man git-<verb>
```

- 工作目录文件 状态：已跟踪 或 未跟踪。

```bash
git add : 开始跟踪新文件，或者把已跟踪的文件放到暂存区,合并时把有冲突的文件标记为已解决状态
Changes not staged for commit : 已跟踪文件的内容发生了变化，但还没有放到暂存区
git status / git status -s 状态简介
```

- 忽略文件

```bash
gitignore 文件配置需要忽略的文件

# 所有空行或者以 # 开头的行都会被 Git 忽略。
# 可以使用标准的 glob 模式匹配，它会递归地应用在整个工作区中。
# 匹配模式可以以（/）开头防止递归。
# 匹配模式可以以（/）结尾指定目录。
# 要忽略指定模式以外的文件或目录，可以在模式前加上叹号（!）取反。
```

- 提交删除查看日志

```bash
git diff ： 尚未暂存的文件更新了哪些部分(工作目录中当前文件和暂存区域快照之间的差异。 也就是修改之后还没有暂存起来的变化内容。)
git diff --staged (git diff --cached) : 已暂存的将要添加到下次提交里的内容(比对已暂存文件与最后一次提交的文件差异)
git commit -m " xxx " 提交(暂存区域的快照)
git commit -a 跳过使用暂存区域(跳过 git add 步骤)
git rm 移除文件
git rm -f 删除之前修改过或已经放到暂存区的文件
git rm --cached  让文件保留在磁盘，不让 Git 继续跟踪
git mv file1 file2 : 移动文件
git log : 查看历史提交    --stat 显示简略统计信息
git log -p 或 --patch -n  最近的n次提交和每次提交所引入的差异
git log  --pretty="oneline" 每个提交放在一行显示
git log --pretty=format:"%h - %an, %ar : %s" 定制记录的显示格式
git log --since=2.weeks 最近两周的所有提交
git log -S function_name 添加或删除了对某一个特定函数的引用的提交
git log --no-merges 隐藏合并提交
```

- 撤销操作

```bash
git commit --amend  将暂存区中的文件提交(会代替前一次提交的结果)
git reset HEAD file 取消暂存的文件
git checkout -- file 撤消对文件的修改 (本地的任何修改都会消失)
```

- 远程仓库

```bash
git remote : 查看远程仓库
git remote -v 需要读写远程仓库使用的 Git 保存的简写与其对应的 URL
git remote add <shortname> <url>  添加一个新的远程 Git 仓库，并指定简写
git fetch <remote> 从远程仓库中抓取与拉取
git push origin master 推送到远程仓库
git remote show origin 查看某个远程仓库
git remote rename oldName newName 重命名远程仓库
git remote remove origin 删除远程仓库

标签：
git tag 列出标签
git tag -a v1.4 -m "my version 1.4"  附注标签
git tag v1.4-lw 创建轻量标签，不需要使用 -a、-s 或 -m 选项，只需要提供标签名字
git push origin --tags/tagName 推送全部/某个标签
git tag -d tagName 删除标签  git push origin :refs/tags/tagName 跟新远程仓库
git push origin --delete <tagname>

别名：
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
```

- 分支

```bash
git branch testing ： 创建分支
git checkout testing ： 切换分支
git checkout -b testing : 新建并切换到新分支
git merge testing : 合并testing分支到当前分支
git branch -d testing : 删除分支
Unmerged paths: 冲突，处理完后git add会认为冲突解决
git branch : 当前所有分支
git branch -v ： 查看每个分支的最后一次提交
git branch --merged / --no-merged : 已经合并或尚未合并到当前分支的分支。
git push origin --delete serverfix ： 删除远程分支
```

- 变基

```bash
# rebase 命令将提交到某一分支上的所有修改都移至另一分支上
git rebase master ： 变基到 master 分支
git rebase --onto master server client ： 取出 client 分支，找出它从 
server 分支分歧之后的补丁， 然后把这些补丁在 master 分支上重放一遍，让 client 看起来像直接基于 master 修改一样
git rebase <basebranch> <topicbranch> 直接将主题分支变基到目标分支上

#  只对尚未推送或分享给别人的本地修改执行变基操作清理历史，
#  从不对已推送至别处的提交执行变基操作
 ```

- Commit Message

```bash
$(scope): $(subject)
$(description)
$(scope)：必需，一般为项目目录、模块或组件的名字，描述 commit 影响的范围
1. 小驼峰
2. 嵌套层级结构用 / 表示
3. 多个目录、模块或组件使用 , 隔开
4. base 表示基础结构、框架相关的改动，misc 表示杂项改动，all 表示大范围重构。
$(subject)：必需，描述 what 和 why。
$(description)：可选，详细说明，建议使用列表罗列要点，也用英文写。
```

## 服务器上的git-协议

- 本地协议（Local），HTTP 协议，SSH（Secure Shell）协议及 Git 协议

```md
本地协议：远程版本库就是同一主机上的另一个目录
优点：基于文件系统的版本库的优点是简单，并且直接使用了现有的文件权限和网络访问权限。
缺点：共享文件系统比较难配置，并且比起基本的网络连接访问，这不方便从多个位置访问
HTTP 协议：智能 HTTP 协议；哑（Dumb） HTTP 协议
优点：不同的访问方式只需要一个 URL 以及服务器只在需要授权时提示输入授权信息，这两个简便性让终端用户使用 Git 变得非常简单
缺点：在一些服务器上，架设 HTTPS 协议的服务端会比 SSH 协议的棘手一些
SSH 协议：架设 Git 服务器时常用 SSH 协议作为传输协议
优点：简单安全高效
缺点：SSH 协议的缺点在于它不支持匿名访问 Git 仓库
Git 协议（包含在 Git 里的一个特殊的守护进程）
优点：Git 协议是 Git 使用的网络传输协议里最快的
缺点：Git 协议缺点是缺乏授权机制
```

## 分布式工作流

- 集中式工作流：单点协作模型，一个中心集线器，或者说 仓库，可以接受代码，所有人将自己的工作与之同步。 若干个开发者则作为节点，即中心仓库的消费者与中心仓库同步。
- 集成管理者工作流：
    1. 项目维护者推送到主仓库。
    2. 贡献者克隆此仓库，做出修改。
    3. 贡献者将数据推送到自己的公开仓库。
    4. 贡献者给维护者发送邮件，请求拉取自己的更新。
    5. 维护者在自己本地的仓库中，将贡献者的仓库加为远程仓库并合并修改。
    6. 维护者将合并后的修改推送到主仓库。
- 主管与副主管工作流：
    1. 普通开发者在自己的主题分支上工作，并根据 master 分支进行变基。 这里是主管推送的参考仓库的 master 分支。
    2. 副主管将普通开发者的主题分支合并到自己的 master 分支中。
    3. 主管将所有副主管的 master 分支并入自己的 master 分支中。
    4. 主管将集成后的 master 分支推送到参考仓库中，以便所有其他开发者以此为基础进行变基。
