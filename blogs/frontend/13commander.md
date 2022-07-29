---
title: commander
date: 2022-08-01
tags:
 - frontend
categories:
 - frontend
---

## 安装

`yarn add commander / npm install commander`

## 常用api

- commander.js中命令行有两种可变性，一个叫做option，意为选项。一个叫做command，意为命令。
- `program.option('-n, --name <name>', 'your name', 'GK')`
    - 第一个参数是选项定义，分为短定义和长定义。用|，,， 连接。
        - 参数可以用<>或者[]修饰，前者意为必须参数，后者意为可选参数。
    - 第二个参数为选项描述
    - 第三个参数为选项参数默认值，可选。
- `program.command('init <path>', 'description')`,接受三个参数，第一个为命令定义，第二个命令描述，第三个为命令辅助修饰对象。
    - 第一个参数中可以使用<>或者[]修饰命令参数
    - 第二个参数可选。
        - 当没有第二个参数时，commander.js将返回Command对象，若有第二个参数，将返回原型对象。
        - 当带有第二个参数，并且没有显示调用action(fn)时，则将会使用子命令模式。
        - 所谓子命令模式即，./pm，./pm-install，./pm-search等。这些子命令跟主命令在不同的文件中。
    - 第三个参数一般不用，它可以设置是否显示的使用子命令模式。
- `program.description('command description')`,用于设置命令的描述
- `program..action(fn)`, 用于设置命令执行的相关回调。fn可以接受命令的参数为函数形参，顺序与command()中定义的顺序一致。
- `program.parse(process.argv)`,此api一般是最后调用，用于解析process.argv。
- `program.outputHelp()`,一般用于未录入参数时自动打印帮助信息。

  ```js
  if (!process.argv.slice(2).length) {
    program.outputHelp(make_red);
  }
  function make_red(txt) {
      return colors.red(txt); //display the help text in red on the console
  }
  ```

## 使用

- 在根目录下新建 bin 文件夹，新建 `my-cli` 文件

```js
// 引入依赖
var program = require('commander');

// 定义版本和参数选项
program
  .version('0.1.0', '-v, --version')
  .option('-i, --init', 'init something')
  .option('-g, --generate', 'generate something')
  .option('-r, --remove', 'remove something');

// 必须在.parse()之前，因为node的emit()是即时的
program.on('--help', function(){
 console.log('  Examples:');
  console.log('');
  console.log('    this is an example');
  console.log('');
});

program
.command('teardown <dir> [otherDirs...]')
.description('run teardown commands')
.action(function(dir, otherDirs) {
  console.log('dir "%s"', dir);
  if (otherDirs) {
    otherDirs.forEach(function (oDir) {
      console.log('dir "%s"', oDir);
    });
  }
});

program.parse(process.argv);

if(program.init) {
  console.log('init something')
}

if(program.generate) {
  console.log('generate something')
}

if(program.remove) {
  console.log('remove something')
}
```

- 运行  `node bin\my-cli --help`

```js
Usage: my-cli [options]

  Options:

    -v, --version   output the version number
    -i, --init      init something
    -g, --generate  generate something
    -r, --remove    remove something
    -h, --help      output usage information
  Examples:

    this is an example
```
