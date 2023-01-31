# demi-ui-template

<p align="center">_Develop once, Use in both Vue 2.7 & Vue3_
</p>

<p align='center'>
<a href="./README.md">English</a> | <b>简体中文</b>
</p>

## Motivation

尽管自从 Vue 3 公布以来已经过了很长时间, 但仍有许多开发者因为所使用的依赖的兼容性问题, 低版本浏览器支持的需求, 还有一些其他原因选择依旧使用 Vue 2.

而 Vue 团队也注意到这点, 将一些在 Vue 3 中比较重要的特性比如[composition-api](https://vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api) 带回到 最后一个 Vue 2.x 版本 Vue 2.7 中.

但是如果我们只是想构建一个遵循特定设计规范的 UI 库, 并且可以同时在 Vue2 和 Vue 3 项目中使用的, 我们该怎么做?

幸运的是在很早之前就有这么一个库来帮我们做这个事, [vue-demi](https://github.com/vueuse/vue-demi), 所以我基于此创建了一个可以构建你自己的通用 ui 库的模板, 欢迎尝试 😉

## How to Use

### Github Template

[使用该 template 创建仓库](https://github.com/enpitsuLin/demi-ui-template/generate)

### Clone to local

你可以直接从源仓库克隆, 或者你需要一个干净的 git 历史的话

```sh
npx degit enpitsulin/demi-ui-template project-name
cd project-name
pnpm i # 如果未安装 pnpm 请参考 pnpm 官方文档安装
```

## Checklist

如果使用该模板, 请按照检查表正确更新您的信息

- [ ] 修改工作区根目录中`LICENSE`中的作者名称
- [ ] 修改各个子包中的`@demi/`为你想要的 scope 或者使用独立的包名,别忘了把用来作为依赖的包名改掉
  - [ ] 修改一些子包的 private 选项以便于发布(可选)
- [ ] 修改`internal/build`包中`constants.ts`的一些与构建相关的常量
- [ ] 清空README 或修改其内容

## Usage

### Development

WIP: TODO create a website to show some doc thing.

### Build

To build the library, run (in workspace root)

```sh
pnpm build
```

And you will see the library product file in `packages/demi-ui/release/` you can direct `npm publish` this directory.
