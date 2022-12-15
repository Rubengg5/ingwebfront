let express = require('express');

let app = express();

app.use(express.static(__dirname+'/dist/parcial-3'));

app.get('/*', (req, resp) => {resp.sendFile(__dirname+'/dist/parcial-3/index.html');
});

app.listen(process.env.PORT || 4200);