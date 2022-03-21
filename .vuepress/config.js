module.exports = {
  "title": "Selven's Blog",
  "description": "该网站用于记录 Selven 学习知识总结",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/J.png"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "Essay",
        "icon": "reco-message",
        "link": "/docs/"
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/dyj7/dyj7.github.io/tree/blogs",
            "icon": "reco-github"
          },
          {
            "text": "dyj706709149@gmail.com",
            "link": "https://www.google.com/intl/zh-CN/gmail/about/",
            "icon": "reco-mail"
          },
        ]
      }
    ],
    "sidebar": {
      "/docs/": [
        "",
        "Stray-Birds.md",
        "Autumn-Day.md"
      ],
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Notes"
      },
      "tag": {
        "location": 4,
        "text": "Tag"
      }
    },
    "friendLink": [
      {
        "title": "vuepress",
        "desc": "Vue 驱动的静态网站生成器",
        "email": "706709149@qq.com",
        "link": "https://vuepress.vuejs.org/zh/"
      },
      {
        "title": "vuepress-theme-reco",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    "logo": "/logo.png",
    "search": true,
    "lastUpdated": "Last Updated",
    "author": "Selven Du",
    "authorAvatar": "/logo.png",
    "startYear": "2020",
    "评论模块暂时注释：valineConfig": {
      "appId": "Tsu6j0Gsu4QIBYak9kvMYuh0-gzGzoHsz",
      "appKey": "ATFynweji70cvGwG1lulQeCk",
      "placeholder": "尽情留下你想说的话吧",
      "avatar": "selven",
      "highlight": true,
      "recordIP": true,
    },
  },
  "markdown": {
    "lineNumbers": true
  }
}
