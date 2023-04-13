
<image src="./public/images/logo.svg" style="background: white" />
<h1 align="center">
    ig.News
</h1>
<p align="center">A blog post app with newsletter subscription</p>


<p align="center">
 <a href="#technologies">Technologies</a> •
 <a href="#configurations">Configurations</a> •
 <a href="#demo">Demo</a> •
 <a href="#license">License</a> •
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

*You can find the services configs in servicesConfig.md file.*

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



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
