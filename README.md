# demi-ui-template

<p align="center">_Develop once, Use in both Vue 2.7 & Vue3_
</p>

<p align='center'>
<b>English</b> | <a href="./README.zh.md">简体中文</a>
</p>

## Motivation

Although a long time has passed since Vue 3 announced, there are also many developer still stay on vue2 because dependency compatibly, browser support requirements, or other reasons.

The Vue team also have backported some important feature from Vue 3 like [composition-api](https://vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api) in Vue 2.7 which was last minor version of Vue 2.x.

If we just want create a UI library that follows design specification and can be use on both Vue 2 and Vue 3 project, How?

Fortunately, there was a Community solution a long time ago, [vue-demi](https://github.com/vueuse/vue-demi), so I built a template for building your universal ui libraries on top of this. take a try 😉

## How to Use

### Github Template

[Create a repo from this template on GitHub.](https://github.com/enpitsuLin/demi-ui-template/generate)

### Clone to local

Clone this repo directly, or you prefer to do it manually with the cleaner git history

```sh
npx degit enpitsulin/demi-ui-template project-name
cd project-name
pnpm i # If you don't have pnpm installed, refer to the official pnpm documentation to install
```

## Checklist

When you use this template, try follow the checklist to update your info properly

- [ ] Change the author name in `LICENSE` under root of workspace
- [ ] Change `@demi/` in each subpackage to the scope you want or use single package name, **DON'T** forget change name where be used to as dependency.
  - [ ] Change the private field of some subpackages for distribution (optional)
- [ ] Change some build-related constants in `constants.ts` in the `internal/build` package
- [ ] Clean up the READMEs or change the content

## Usage

### Development

WIP: TODO create a website to show some doc thing.

### Build

To build the library, run (in workspace root)

```sh
pnpm build
```

And you will see the library product file in `packages/demi-ui/release/` you can direct `npm publish` this directory.
