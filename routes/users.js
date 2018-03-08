var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('main:root@ds161148.mlab.com:61148/heroku_tqh5hdjz');


/* GET users listing. */
router.get('/', function(req, res, next) {
  var collection = db.get('Users'); 
  collection.find({}, function(err, Users)
  {
		if (err) throw err; 
		res.json(Users);
  });
});

router.post('/', function(req, res)
{ 
	var collection = db.get('Songs'); 
	collection.insert(
	{ 
		email: req.body.Email, 
		password: req.body.Password,
		balanceActions: req.body.BalanceActions,
		shoppingLists: req.body.ShoppingLists,
		outlayCategories: req.body.OutlayCategories,
		incomeCategories: req.body.IncomeCategories		
	}, 
	function(err, song)
	{
		if (err) throw err;
		res.json(song);
	});
});

router.get('/:id', function(req, res) 
{
	var collection = db.get('Users');
	collection.findOne({ _id: req.params.id }, function(err, user)
	{
		if (err) throw err;
		res.json(user);
	});
});

router.put('/:id', function(req, res)
{ 
	var collection = db.get('Users'); collection.update(
	{
		_id: req.params.id
	},

	{ 
		email: req.body.Email, 
		password: req.body.Password,
		balanceActions: req.body.BalanceActions,
		shoppingLists: req.body.ShoppingLists,
		outlayCategories: req.body.OutlayCategories,
		incomeCategories: req.body.IncomeCategories	
	}, 

	function(err, user)
	{
		if (err) throw err;
		res.json(user);
	});
});

module.exports = router;