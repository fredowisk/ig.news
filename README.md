<br/>
<div align="center">
    <image src="./public/images/logo.svg" />
    <br/><br/><br/>
    <p>A blog post app with newsletter subscription</p>
</div>

<p align="center">
 <a href="#technologies">Technologies</a> •
 <a href="#configurations">Configurations</a> •
 <a href="#demo">Demo</a> •
 <a href="#license">License</a> •
</p>

<p align="center">
 <img src="https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=flat" />
 <img src="https://img.shields.io/badge/branches-93.75%25-brightgreen.svg?style=flat" />
 <img src="https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat" />
 <img src="https://img.shields.io/badge/lines-100%25-brightgreen.svg?style=flat" />
</p>

## Technologies

- [ReactJS](https://reactjs.org/)
- [NextJS](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [SASS](https://sass-lang.com/)
- [Next-Auth](https://next-auth.js.org/)
- [Stripe](https://stripe.com/)
- [FaunaDB](https://fauna.com/)
- [Prismic CMS](https://prismic.io/)

## Configurations

First install:

- [Npm](https://www.npmjs.com/)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

And then, create an account at:

- [Stripe](https://stripe.com/)
- [FaunaDB](https://fauna.com/)
- [Prismic CMS](https://prismic.io/)

_You can find the services configs in servicesConfig.md file._

Clone the project:

```bash
$ git clone https://github.com/fredowisk/ig.news.git
```

Enter the project folder and run:

```bash
$ npm i

$ cp .env.local.example .env.local

$ stripe listen --forward-to localhost:3000/api/webhooks

$ npm run slicemachine

$ npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## Demo

[Live Demo](https://ig-news-pearl.vercel.app/)

<div align="center">

### **/home**

![Home](https://user-images.githubusercontent.com/53921083/231844611-c2858f3d-24a0-4e92-bfd6-cc0f0654d867.png)
<br/>

### **/posts**

![Posts](https://user-images.githubusercontent.com/53921083/231845148-9fadeab8-3017-4a24-a872-aae31ca3e221.png)
<br/>

### **/posts/preview/post-id**

![Preview](https://user-images.githubusercontent.com/53921083/231845345-350fcb5e-0409-410d-8f97-ba18ca1975fb.png)
<br/>

### **/posts/post-id**

![Post](https://user-images.githubusercontent.com/53921083/231845579-caebf30f-f075-4476-ab69-336ec2375327.png)
<br/>

### **/api/subscribe**

![Checkout](https://user-images.githubusercontent.com/53921083/231846742-5d450212-959a-48a4-bcff-f9efcd3f72c7.png)
<br/>

</div>

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
