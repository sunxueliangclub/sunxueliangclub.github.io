PUBLICATIONS 数据维护说明
========================

以后维护论文列表，只编辑：

  assets/data/publications-data.js

一般不要修改：

  assets/js/publications.js
  Publications.html

新增论文示例
------------
在 window.ZHOU_PUBLICATIONS = [ ... ] 中复制一个已有条目，例如：

{
  "year": 2026,
  "title": "Paper title",
  "authors": "Author A, Author B, Tong Zhou",
  "venue": "Journal / arXiv / conference",
  "paperUrl": "https://...",
  "badges": [],
  "links": [],
  "pdfUrl": "https://..."
}

说明
----
1. 页面自动按 year 倒序分组，不需要手工移动年份区块。
2. 页面继续按标题做去重。
3. 搜索框会自动搜索新加入的论文，无需建立额外索引。
4. paperUrl / pdfUrl 暂时没有时可以设为空字符串 ""。
5. badges 没有内容时使用 []。
6. 请保留 JSON 风格格式：字符串使用双引号，相邻条目之间用逗号。
7. 数据使用 .js 而不是 fetch JSON，是为了让这个静态站点直接双击 HTML 时也能工作。
