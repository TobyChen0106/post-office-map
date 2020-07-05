const fs = require('fs')
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

const file_path = "./PostData.json";

PostOffice.find({}, (err, data) => {
    if (err) {
        console.log(err);
    }
    else if (!data) {
        console.log("[ERROR] EMPTY DATA!");
    } else {
        // for(var i=0; i<data.length;  ++i){
        //     data[i].nowCalling = 0;
        //     data[i].nowWaiting = 0;
        //     data[i].save();
        // }
        // fs.writeFile(file_path, JSON.stringify(data), 'utf8', () => console.log(`successfully dump offer to ${file_path}`)) 
        console.log(data)
    }
})