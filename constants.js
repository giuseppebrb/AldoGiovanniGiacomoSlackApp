const randomQuoteCommand = 'random quote';
const randomQuoteCommandShortcut = 'quote';
const randomDialogueCommand = 'random dialogue';
const randomDialogueCommandShortcut = 'dialogue';

const names = ['Aldo Baglio', 'Giovanni Storti', 'Giacomo Poretti'];

const slackPostMessageURL = "https://slack.com/api/chat.postMessage";
const endpointRandomQuote = "https://aldogiovannigiacomoapi.azurewebsites.net/api/quotes/random";
const endpointRandomDialogue = "https://aldogiovannigiacomoapi.azurewebsites.net/api/dialogues/random";

const aldoImageURLs = ["https://thumbs.gfycat.com/WarlikeHatefulBudgie-max-1mb.gif",
    "https://thumbs.gfycat.com/GiddyImpureKagu-small.gif",
    "https://thumbs.gfycat.com/ResponsibleEnchantingClownanemonefish-size_restricted.gif",
    "https://66.media.tumblr.com/9f3eb72d0b5040288a2b0100916758d7/tumblr_o0lha2eEDW1qjq7hxo3_250.gif",
    "https://thumbs.gfycat.com/ElasticDrearyAoudad-max-1mb.gif",
    "https://media.tenor.com/images/9e5c1d6b5745d42118346168d7a4d6de/tenor.gif",
    "https://thumbs.gfycat.com/UnacceptableOddballDormouse-size_restricted.gif",
    "https://i.pinimg.com/originals/0b/33/9e/0b339ee2e13e1590193b594b97e9baae.gif",
    "http://giffetteria.it/archivio/gif2.gif",
    "https://thumbs.gfycat.com/AccomplishedActualCero-small.gif"
];

const giovanniImageURLs = ["https://media.tenor.com/images/0e8e1407cb6d851636a756d26ec5d559/tenor.gif",
    "https://media.tenor.com/images/865ecd81e4351ae57a9d529a96f48390/tenor.gif",
    "https://media1.tenor.com/images/9cca4d2c705c03457ea81a6fe017550d/tenor.gif?itemid=7306762",
    "https://66.media.tumblr.com/9f3eb72d0b5040288a2b0100916758d7/tumblr_o0lha2eEDW1qjq7hxo3_250.gif",
    "https://i.makeagif.com/media/5-25-2016/K9NNco.gif",
    "https://media.tenor.com/images/9e5c1d6b5745d42118346168d7a4d6de/tenor.gif",
    "https://thumbs.gfycat.com/BrightVariableCoelacanth-size_restricted.gif",
    "https://media.giphy.com/media/XBiHEAyjtNOZquXMol/giphy.gif",
    "https://thumbs.gfycat.com/UnhappyDirtyHylaeosaurus-size_restricted.gif"
];

const giacomoImageURLs = ["https://66.media.tumblr.com/tumblr_lx6lxx51Kn1qajasao5_250.gif",
    "https://media.tenor.com/images/d990830748a36bbd10a9c62617ddddd5/tenor.gif",
    "https://thumbs.gfycat.com/LeafyIdolizedArachnid-size_restricted.gif",
    "https://thumbs.gfycat.com/DisgustingAmbitiousAmericanavocet-size_restricted.gif",
    "https://thumbs.gfycat.com/GraveTheseGharial-size_restricted.gif",
    "https://thumbs.gfycat.com/ImpureSleepyAardvark-size_restricted.gif",
    "https://thumbs.gfycat.com/BrightVariableCoelacanth-size_restricted.gif",
    "https://media1.tenor.com/images/3963cbea11668e67cf0f3832e7c7e44b/tenor.gif?itemid=9426853",
    "https://thumbs.gfycat.com/AdmiredAccomplishedAmericancurl-size_restricted.gif",
    "https://thumbs.gfycat.com/PointedNegativeHairstreak-size_restricted.gif"
];

module.exports = {
    randomQuoteCommand,
    randomQuoteCommandShortcut,
    randomDialogueCommand,
    randomDialogueCommandShortcut,
    names,
    slackPostMessageURL,
    endpointRandomQuote,
    endpointRandomDialogue,
    aldoImageURLs,
    giovanniImageURLs,
    giacomoImageURLs
}
