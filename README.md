# Cryptocurrency APP - Backend

## Install dependencies
```npm install```

## Add environment variables
Create an .env file with the necessary environment variables, using the example.env file as a base.

## Run project
```npm start```

## Run unit tests
```npm run test```

## Run coverage report
```npm run coverage```

## Note:
This project handles information on 3 cryptocurrencies, being Bitcoin, Ethereum and Cardano.
If you want to add one more cryptocurrency to be considered in the information handled in the different endpoints,
you can add it in the `config/cryptocurrencies.csv` CSV file.
The information of the cryptocurrencies that you enter must be of the Messari API
https://data.messari.io/api/v2/assets. The value of monthly return must be assigned by the user.
