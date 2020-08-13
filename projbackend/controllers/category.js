const Category = require('../models/category');


exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err){
            return res.status(400).json({
                error: "Category not found"
            });
        }

        req.category = category;
    next();

    });
};

exports.getCategory = (req, res) => {
    return res.json(req.category);
}


exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if(err){
            res.status(400).json({
                error : "Unable to save category in database"
            })
        }
        res.json(category);
    });
};



exports.getAllCategories = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err){
            return res.status(400).json({
                error : "No categories found"
            });
        }
        return res.json(categories);
    });
};


exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    // console.log("REQ.BODY.NAME : ", req.body.name);
    category.save((err, updatedCategory) => {
        if(err){
            console.log(err)
            res.status(400).json({
                error : "Cannot update category"
            })
        }
        res.json(updatedCategory);
    });
};


exports.removeCategory = (req, res) => {
	const category = req.category;
	category.remove((err, category) => {
		if(err) {
			return res.status(400).json({
				error : "Category couldnt be deleted"
			});
		}
		res.json({
			message : `${category.name} removed successfully`
		})
	})
}