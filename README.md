# Aldo, Giovanni e Giacomo SlackApp 

[Italian Version](#italian-version-) <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/146/flag-for-italy_1f1ee-1f1f9.png" width="30" height="25">

![](https://media.giphy.com/media/Rl5QI9hgpOYGEZNIay/giphy.gif)

## English Version <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/146/flag-for-united-kingdom_1f1ec-1f1e7.png" width="30" height="25">
## What is this?
This is a simple Slack App that allows user to get random quotes and dialogue from [Aldo, Giovanni & Giacomo](https://en.wikipedia.org/wiki/Aldo,_Giovanni_%26_Giacomo) movies.

Inside a slack channel or conversation you simply need to type ```/aldogiovannigiacomo random quote``` or ```/aldogiovannigiacomo random dialogue```. 
Shortcut versions of commands (```/aldogiovannigiacomo quote``` and ```/aldogiovannigiacomo dialogue```) are also allowed.
If you don't type any argument after the base command you will get a random quote.

## Why?
The project has no profit purpose and it's just for fun. I wanted to learn how to create Slack apps and also I wanted to use the API I already created. You can check that project at this repository: [AldoGiovanniGiacomo.API](https://github.com/giuseppebrb/AldoGiovanniGiacomo.API)

##  Tech Details
This app is written in *Node.js* and hosted on [Heroku](https://www.heroku.com/).
The layout is written using the [Blocks approach](https://api.slack.com/block-kit) suggested by Slack itself.

During the dev process I used [Ngrok](https://ngrok.com) as tunnel for my localhost to remote.

If you like to give your contribution you need to create your *.env* file based on the keys I already declared in *.env.sample* and run ```npm install``` and then ```npm run```; from there you need to create a tunnel with *Ngrok* or wahtever you want.

##### Improvements and Pull Requests are welcome :smile:

---------------------------------------

## Italian Version <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/146/flag-for-italy_1f1ee-1f1f9.png" width="30" height="25">

### Che cos'è?
È una semplice App Slack che tramite un comando slash permette agli utenti di postare citazioni o dialoghi random tratti dai film di Aldo, Giovanni e Giacomo.

Dentro un canale o una conversazione di Slack basta scrivere ```/aldogiovannigiacomo random quote``` o ```/aldogiovannigiacomo random dialogue```.
Sono ammesse anche le versioni ridotte dei comandi e cioè ```/aldogiovannigiacomo quote``` e ```/aldogiovannigiacomo dialogue```. Se non si digita nulla dopo il comando di base allora verrà postata una citazione random.

## Perché?
Questo progetto ovviamente non ha fini di lucro ed è solo per puro intrattenimento. Volevo imparare a creare estensioni per Slack e volevo utilizzare delle API in ASP.NET Core che avevo già creato. Il progetto delle API a cui faccio riferimento lo potete trovare qui: [AldoGiovanniGiacomo.API](https://github.com/giuseppebrb/AldoGiovanniGiacomo.API)

## Dettagli Tecnici
L'app è stata scritta in *Node.js* ed è hostata su [Heroku](https://www.heroku.com/).
Per la parte di creazione dei layout dei messaggi ho utilizzato l'[approccio a Blocks](https://api.slack.com/block-kit) suggerito da Slack stesso.

Durante la fase di sviluppo ho utilizzato [Ngrok](https://ngrok.com) per creare un tunnel tra il mio localhost e un host remoto.

Se vuoi dare il tuo contributo basta creare un file *.env* sulla scorta delle chiavi che ho già dichiarato all'interno di *.env.sample* e popolarle con i propri valori. Dopodiché lanciare ```npm install``` e ```npm run```; da qui in poi basta creare un tunnel con *Ngrok* o altro.
##### Qualsiasi miglioria o Pull Request è ben accetta :smile: