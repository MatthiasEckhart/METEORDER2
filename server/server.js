Meteor.methods({
    
    addToOrder:function(qty,product,session){
        console.log('Im here!');
        check(qty, Number);
        check(product, String);
        check(session, String);
        if(qty > 0){
            if(!alreadyAdded(product)){
            OrderItems.insert({qty:qty,product:product,sessid:session});
            console.log('reaching this fn', qty, product, session);
        }else{
            OrderItems.update({product:product},{qty:qty,product:product,sessid:session})
            console.log('Successfully updated');
        }
        } else{
            console.log('Quantity is Zero');
        }

    },
    removeOrderItem:function(id){
         check(id, String);
        OrderItems.remove({_id:id});
        console.log('successfully deleted');
    }
    

    
}); 

 function alreadyAdded(product){
        if(!OrderItems.findOne({product:product})){
            return false;
        }else{
            return true;
        }
        }