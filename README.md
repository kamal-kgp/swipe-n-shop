## Getting Started

Clone the repository and install the dependencies:

```bash
git clone https://github.com/kamal-kgp/swipe-n-shop.git 

cd swipe-n-shop

npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Build and sync the app with android then open it in android studio:

```bash
npx cap add android

npm run build:android

npm run start:android
```

Build and sync the app with ios then open it in xcode:

```bash
npx cap add ios

npm run build:ios

npm run start:ios
```

# Features
- left swipe -> dislike product
- right swipe -> like product
- swipe up -> add to cart

# dependencies
- next.js (React framework)
- react
- react-dom
- capacitor (Cross platform framework)
- lucide-react (icons)

# dev dependencies 
- eslint
- tailwindcss
- postcss

# Author
- [Kamal Choudhary](https://www.linkedin.com/in/kamal-kgp/)
- [Email](mailto:kamal4tec.com)


