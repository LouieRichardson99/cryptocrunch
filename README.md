# CryptoCrunch

![image](https://user-images.githubusercontent.com/60019261/115138341-71e40300-a023-11eb-8696-fa0ac9ad9251.png)

CryptoCrunch is a cryptocurrency price tracker built in Next.js, Tailwindcss, Firebase, and Vercel hosting.
It fetches it's data from the CoinGecko API which allow for up to date cryptocurrency prices.

Firebase is used to allow user authentication and authorisation. It is also used to allow CRUD functions in the web app such as adding a cryptocurrency to your list. These CRUD functions are made to the Firebase Firestore database.

I used React for this build because it's great for repeating components such as the 'SavedCoin' component. It also works really well with Tailwindcss to create a stunning front-end efficiently.

## Features

- Sign up / Sign in
- Demo account sign in
- Top Ten Cryptocurrencies
- Save and remove coins from your list
- Add and remove transactions
- Search for a specific cryptocurrency
- Currency selector (GBP, USD, EUR)
- Conditional rendering based on logged in state
