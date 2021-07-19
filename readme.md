install express and sequelize packages 

`npm install express-generator -g`
`npm install -g sequelize-cli` ( to generate models, migrations and db config)
`express backend --no-view` (to create boilerplate)
`npm install`


update database details in file
`/config/config.json`  

to create Database and table 
`sequelize db:create`
`sequelize db:migrate`

start the application with `npm start`