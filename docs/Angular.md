---
title: Angular
date: 2021-12-29
tags:
 - Angular
 - Docs
---

1.声明属性的几种方式
public 共有（默认） 可以在类内、类外使用
private 私有  只有在当前类可使用
protected 保护类型 在当前类和子类中使用

2.绑定值、解析html

```html
<div [title]='title' [innerHtml]='html'></div>
<img [src]='imgUrl'/>
<div [ngClass]="{'red':true,'blue':flag}"></div>
<div [ngStyle]="{'color':'red','width':width+'px'}"></div>
```

3.循环

```html
<li *ngFor="let item of arr"></li>
<li *ngFor="let item of arr;let idx = index;"></li>
```

4.条件判断

```html
<div *ngIf="flag"></div>
```

5.switch

```html
<div [ngSwitch]="score">
    <li *ngSwitchCase="1">X</li>
    <li *ngSwitchCase="2">XL</li>
    <li *ngSwitchDefault>XXL</li>
</div>
```

6.管道
 `<div>{{date | date:'yyyy-MM-dd HH:mm:ss'}}</div>`
 7.事件
 `<button (click)='clickFunc()'></button>`
 8.表单事件、事件参数
 `<input (keydown)=""keyDown($event)>  $event.target获取dom节点`
 9.双向数据绑定  mvvm
 import { FormsModule } from '@angular/forms';
 `<input [(ngModel)]='aa'>`
 10.服务
 ng g service xx
 在app.module.ts里引入，在providers引入
 在使用的的模块中引入，constructor(public storage:StorageService) {})
 11.DOM操作
 `<app-header #header>this is a child comp</app-header>`
 import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
 @ViewChild('header') header:any;
 console.log(this.header.run())//调用子组件的方法
 12.组件传值
 （1.）父组件给子组件传值（属性和方法均可）
  父组件调用子组件时传入数据 <app-child [smg]='msg'></app-child>（传整个父组件[father]='this'）
  子组件引入input import {Input} from '@angular/core'
  子组件接受父组件的值 @Input() msg:string;
  (2.)父组件引入子组件的值和方法
  子组件引入{Output,EventEmitter)} from '@angular/core' //EventEmitter事件驱动-广播和监听广播
  子组件实例化EventEmitter  @Output() private outer = new EventEmitter<string>()
  子组件 this.outer.emit(' msg from child')  //guan会触发父组件的方法
  父组件 <app-child (outer)="runParse($event)">
  13.生命周期

  ```js
  ngOnChanges(): void {
    //父组件给子组件传值，改变数据的时候
  }
  ngOnInit(): void {
    //请求数据
  }
  ngDoCheck(): void {
    //自定义方法，属性改变时
  }
  ngAfterViewInit(): void {
    //视图加载完调用，dom操作
  }
  ngOnDestroy(): void {
    //组件销毁前调用
  }
```
