#!/bin/bash
mongoimport --host mongo --username brandDiscountsUser --password brandDiscountsPassword --authenticationDatabase admin --db desafio_walmart --collection products --drop --file mongo-seed/01-products.json
mongoimport --host mongo --username brandDiscountsUser --password brandDiscountsPassword --authenticationDatabase admin --db desafio_walmart --collection discounts --drop --file mongo-seed/02-discounts.json
