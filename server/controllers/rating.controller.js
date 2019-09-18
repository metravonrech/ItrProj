const mongoose = require('mongoose');
const Company = mongoose.model('Company');

module.exports = {
    saveSingleRating: async(req, result, next) => {
        console.log('req ', req.query);
        Company.findOneAndUpdate({ _id: req.query.idCompany },
            { $push: { rating: { idUser: req.query.idUser, personalRating: req.query.rate }} },
            {useFindAndModify: false},
            (err, res) => {
                if  (!err) return result.status(200).json('success');
            })
    },

    // getRating: async(req, res, next) => {
    //     Company.findOne({_id: req.query.idCompany}, (err, company) => {
    //         console.log('rating ', company.rating)
    //         if(!err) return res.status(200).json(company.rating);
    //     })
    // }
}