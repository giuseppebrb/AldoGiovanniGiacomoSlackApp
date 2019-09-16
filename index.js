require('dotenv').config();

const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const qs = require('querystring');
const signature = require('./verifySignature');
const constants = require('./constants');
const app = express();
const request = require('request');
const storage = require('node-persist'); 
storage.initSync();

const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));

app.get('/', (req, res) => {
  res.send('<h1>Aldo, Giovanni e Giacomo Quotes is running.</h1>');
});

app.post('/command', (req, res) => {
  const requestBody = req.body;
  const commandText = requestBody.text; // Represents the list of parameters following the base command

  if (signature.isVerified(req)) {
    res.send();
    if (commandText.toLowerCase() == 'help') {
      sendHelpMessage(req, res);
    } else {
      var endpoint = getEndpointBasedOnParameters(commandText)
      axios.get(endpoint).then((result) => {
        sendResponse(req, res, commandText, result.data);
      });
    }
  } else {
    res.sendStatus(404);
  }
});

function sendResponse(req, res, parametersText, content){
  if(parametersText.length == 0 ||parametersText.toLowerCase() == constants.randomQuoteCommand || parametersText.toLowerCase() == constants.randomQuoteCommandShortcut) {
    sendQuote(req, res, content);
  } else if (parametersText.toLowerCase() == constants.randomDialogueCommand || parametersText.toLowerCase() == constants.randomDialogueCommandShortcut) {
    sendDialouge(req, res, content)
  }
}

function getEndpointBasedOnParameters(parametersText) {
  switch (parametersText) {
    case constants.randomQuoteCommandShortcut:
    case constants.randomQuoteCommand:
      return constants.endpointRandomQuote;
    case constants.randomDialogueCommandShortcut:
    case constants.randomDialogueCommand:
      return constants.endpointRandomDialogue;
    default:
        return constants.endpointRandomQuote;
  }
}

function sendQuote(request, response, quote) {
  const requestBody = request.body;

  const actorImageURL = getActorImage(quote.actor);
  const formattedActorName = formatActorName(quote.actor);
  const formattedQuoteContent = formatQuote(quote.content);
  const formattedMovieLink = getMovieURL(quote.movie);
  const oauthToken = storage.getItemSync(request.body.team_id);

  axios.post(constants.slackPostMessageURL, qs.stringify({
    token: oauthToken,
    channel: requestBody.channel_id,
    blocks: JSON.stringify([
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*" + formattedActorName + ":*\n" + formattedQuoteContent
        },
        "accessory": {
          "type": "image",
          "image_url": actorImageURL,
          "alt_text": quote.actor
        }
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": "Tratto da <" + formattedMovieLink +"|"+ quote.movie + ">"
          }
        ]
      }
    ])
  })).then((result) => {
    response.send('');
  }).catch((err) => {
    console.error(err);
  });
}

function formatQuote(quote){
  var formattedQuote = quote.replace(/\[/g, '_[');
  formattedQuote = formattedQuote.replace(/\]/g, ']_');
  return formattedQuote;
}

function sendDialouge(request, response, dialogue){
  const requestBody = request.body;
  const formattedDialogueContent = formatDialogue(dialogue.content);
  const formattedMovieLink = getMovieURL(dialogue.movie);
  const moviePosterURL = getMoviePoster(dialogue.movie);
  const oauthToken = storage.getItemSync(request.body.team_id);

  axios.post(constants.slackPostMessageURL, qs.stringify({
    token: oauthToken,
    channel: requestBody.channel_id,
    blocks: JSON.stringify([
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": formattedDialogueContent.trim()
        },
        "accessory": {
          "type": "image",
          "image_url": moviePosterURL,
          "alt_text": dialogue.movie
        }
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": "Tratto da <" + formattedMovieLink +"|"+ dialogue.movie + ">"
          }
        ]
      }
    ])
  })).then((result) => {
    response.send('');
  }).catch((err) => {
    console.error(err);
  });
}

function formatDialogue(dialogue) {
  var formattedDialogue = dialogue.replace(/(^(.+?):)/gm, '*$1*');

  formattedDialogue = formattedDialogue.replace(/\[/g, '_[');
  formattedDialogue = formattedDialogue.replace(/\]/g, ']_');
  return formattedDialogue;
}

function getMovieURL(movieTitle) {
  switch (movieTitle) {
    case 'Tre uomini e una gamba':
      return 'https://it.wikipedia.org/wiki/Tre_uomini_e_una_gamba';
    case 'Così è la vita':
      return 'https://it.wikipedia.org/wiki/Cos%C3%AC_%C3%A8_la_vita_(film_1998)';
    case 'Tutti gli uomini del deficiente':
      return 'https://it.wikipedia.org/wiki/Tutti_gli_uomini_del_deficiente';
    case 'Chiedimi se sono felice':
      return 'https://it.wikipedia.org/wiki/Chiedimi_se_sono_felice';
    case 'La leggenda di Al, John e Jack':
      return 'https://it.wikipedia.org/wiki/La_leggenda_di_Al,_John_e_Jack';
    case 'Tu la conosci Claudia?':
      return 'https://it.wikipedia.org/wiki/Tu_la_conosci_Claudia%3F';
    case 'Anplagghed al cinema':
      return 'https://it.wikipedia.org/wiki/Anplagghed_al_cinema';
    case 'Il cosmo sul comò':
      return 'https://it.wikipedia.org/wiki/Il_cosmo_sul_com%C3%B2';
    case 'La banda dei Babbi Natale':
        return 'https://it.wikipedia.org/wiki/La_banda_dei_Babbi_Natale';
    case 'Ammutta muddica al cinema':
      return 'https://it.wikipedia.org/wiki/Ammutta_muddica_al_cinema';
    case 'Il ricco, il povero e il maggiordomo':
      return 'https://it.wikipedia.org/wiki/Il_ricco,_il_povero_e_il_maggiordomo';
    case 'Fuga da Reuma Park':
      return 'https://it.wikipedia.org/wiki/Fuga_da_Reuma_Park';
    default:
      break;
  }
}

function getMoviePoster(movieTitle) {
  switch (movieTitle) {
    case 'Tre uomini e una gamba':
      return 'https://m.media-amazon.com/images/M/MV5BZGEzZDY1NWUtMjM5Yi00NWJmLWFjMjAtY2I3MWZlZDk5YzhmXkEyXkFqcGdeQXVyMjIyMDk1Nzg@._V1_UY268_CR14,0,182,268_AL_.jpg';
    case 'Così è la vita':
      return 'https://images-na.ssl-images-amazon.com/images/I/71staJc6usL._SY445_.jpg';
    case 'Tutti gli uomini del deficiente':
      return 'https://pad.mymovies.it/filmclub/2007/01/051/locandina.jpg';
    case 'Chiedimi se sono felice':
      return 'https://pad.mymovies.it/filmclub/2001/05/115/locandina.jpg';
    case 'La leggenda di Al, John e Jack':
      return 'https://images-na.ssl-images-amazon.com/images/I/51dSNi4aj9L._SY445_.jpg';
    case 'Tu la conosci Claudia?':
      return 'http://aforismi.meglio.it/img/film/tu%20la%20conosci%20claudia.jpg';
    case 'Anplagghed al cinema':
      return 'https://mr.comingsoon.it/imgdb/locandine/235x336/472.jpg';
    case 'Il cosmo sul comò':
      return 'https://m.media-amazon.com/images/M/MV5BMjExOTc4MDkxNl5BMl5BanBnXkFtZTcwNTE1NzYwNA@@._V1_.jpg';
    case 'La banda dei Babbi Natale':
        return 'https://images-na.ssl-images-amazon.com/images/I/71yazeYxqUL._SY445_.jpg';
    case 'Ammutta muddica al cinema':
      return 'https://images-na.ssl-images-amazon.com/images/I/61XqZxRm4PL._SY445_.jpg';
    case 'Il ricco, il povero e il maggiordomo':
      return 'https://m.media-amazon.com/images/M/MV5BN2RmMmE3ODYtZjM3MC00YjNkLThjNDItNWJmYTM3YzBjOTM1XkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_UY1200_CR105,0,630,1200_AL_.jpg';
    case 'Fuga da Reuma Park':
      return 'https://m.media-amazon.com/images/M/MV5BOGUxZGZmYzgtOGU4OC00N2QxLThjZWUtYWU3OThhZjU2OWE0L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMjIyMDk1Nzg@._V1_UY1200_CR105,0,630,1200_AL_.jpg';
    default:
      break;
  }
}

function getActorImage(actorName){
  switch (actorName) {
    case constants.names[0]:
      return constants.aldoImageURLs[Math.floor(Math.random() * constants.aldoImageURLs.length)];
    case constants.names[1]:
      return constants.giovanniImageURLs[Math.floor(Math.random() * constants.giovanniImageURLs.length)];
    case constants.names[2]:
        return constants.giacomoImageURLs[Math.floor(Math.random() * constants.giacomoImageURLs.length)];
    default:
      break;
  }
}

function formatActorName(fullname) {
  switch (fullname) {
    case constants.names[0]:
      return 'Aldo'
    case constants.names[1]:
      return 'Giovanni'
    case constants.names[2]:
      return 'Giacomo'
    default:
      break;
  }
}

function sendHelpMessage(request, response) {
  const requestBody = request.body;
  axios.post(constants.slackPostMessageURL, qs.stringify({
    token: process.env.SLACK_ACCESS_TOKEN,
    channel: requestBody.channel_id,
    blocks: JSON.stringify([
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Here's the parameter list you can add following */aldogiovannigiacomo* command:"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*/aldogiovannigiacomo* random quote\nGets a random quote from a random movie"
        }
      },
        {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*/aldogiovannigiacomo* random dialogue\nGets a random dialogue from a random movie"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*/aldogiovannigiacomo* help\nThe command you've just called"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Typing */aldogiovannigiacomo* without any parameters will return a random quote"
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*This project has no profit purpose and it's just for fun. Code is open source at the following <https://github.com/giuseppebrb/AldoGiovanniGiacomoSlackApp|GitHub reposiroty>.*"
        }
      }
    ])
  })).then((result) => {
    response.send('');
  })
}

app.get('/auth', function(req, res){
  if (!req.query.code) { // access denied
    console.log('Access denied');
    return;
  }
  var data = {form: {
    client_id: process.env.SLACK_CLIENT_ID,
    client_secret: process.env.SLACK_CLIENT_SECRET,
    code: req.query.code
  }};
  request.post('https://slack.com/api/oauth.access', data, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      // Get an auth token (and store the team_id / token)
      storage.setItemSync(JSON.parse(body).team_id, JSON.parse(body).access_token);
      res.sendStatus(200);
      res.redirect("https://aldogiovannigiacomoslack.azurewebsites.net/");
    }
  })
});