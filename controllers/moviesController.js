let db = require('../database/models')
let sequelize = db.sequelize;
const {Op} = require("sequelize");

let moviesController = {
    root: (req, res) => {
         db.Movies.findAll()
            .then(movies => {
                res.render('listadoDePeliculas', {movies});
            })
            .catch((err) => console.error(err));
    },
    detail: (req, res) => {

        db.Movies.findByPk(req.params.id, {include:[
            { association: "actors" },
            { association: "genre" }
        ]})
                .then(function (movie) {
                    res.render('detail', { movie });
                })
                .catch(error => console.log(error));
    },
    new: (req, res) => {
        db.Movies.findAll({
                order: [
                    ['release_date', "DESC"]
                ],
                limit: 5,
            })
            .then((movies) => {
                res.render('peliculas', {
                    movies
                })
            })

            .catch((err) => console.error(err));
    },
    recommended: (req, res) => {
        db.Movies.findAll({
                where: {
                    rating: {
                        [db.Sequelize.Op.gte]: 8
                    }
                }
            })
            .then((movies) => {
                res.render('recommended', {
                    movies
                })
            })

            .catch((err) => console.error(err));
    },
    get_search: function(req, res){
        res.render("results");
    },
    search: async (req, res) => {
		try {
			const results = await Movies.findAll({
				where: {
					name: {
						[Op.substring]: req.query.keywords
					}
				}
			});
			res.render("results", {results, search: req.query.keywords});
		} catch(error) {
			res.send("bad");
		}
	}
}

module.exports = moviesController;