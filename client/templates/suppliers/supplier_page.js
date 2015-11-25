Template.supplierPage.helpers({
	
	getCategories: function(){
		 var categories = Products.find({supplierId: this._id}, {sort: {category: 1}, fields: {category: 1}}).fetch();
  		 return _.uniq( categories, true, function (product){ 
    		return product.category;
  		});    
	},
  products: function(category, supplier) {
    return Products.find({category: category, supplierId: supplier});
  }
});



/* original TW
Template.supplierPage.helpers({
  products: function() {
    return Products.find({supplierId: this._id});
  }
});

*/