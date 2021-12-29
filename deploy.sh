#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
# yarn build

# 进入生成的文件夹
cd public
const path = require('path')
console.log(process.execPath)

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

# git init
# git add .
# git commit -m 'deploy' --no-verify
# git push -f git@github.com:dyj7/dyj7.github.io.git master


# cd -
