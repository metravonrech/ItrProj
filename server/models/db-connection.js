const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true },err => {
    if(err){
        console.log(err);
    } else {
        console.log('Succefully connected to database');
    }
});

require('./user.model');
require('./company.model');