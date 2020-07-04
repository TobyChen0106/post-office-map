const PostOffice = require('../src/models/PostOffice');
const mongoose = require('mongoose');
const dbName = "dbCardbo"
const usrName = "cardbo"
const usrPswd = "69541"
mongoURL = `mongodb+srv://${usrName}:${usrPswd}@cardbo-br3ga.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(mongoURL, { useNewUrlParser: true });
db = mongoose.connection;
db.on('error', e => {
    console.log(e);
})
db.once('open', () => {
    console.log('MongoDB connected!');
})


PostOffice.find({}, (err, data) => {
    if (err) {
        console.log(err);
    }
    else if (!data) {
        console.log("[ERROR] EMPTY DATA!");
    } else {
        // for(var i=0; i<data.length;  ++i){
        //     data[i].nowCalling = 10;
        //     data[i].nowWaiting = 10;
        //     data[i].save();
        // }
        console.log(data)
    }
})