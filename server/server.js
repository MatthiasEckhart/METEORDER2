Meteor.methods({
    
    addToOrder:function(qty,product,sessid){
        if(qty > 0){
        check(qty, Number);
        check(product, String);
        check(sessid, String);
            OrderItems.insert({qty:qty,product:product,sessid:sessid});
            console.log('reaching this fn', qty,product,sessid);

        } else{
            console.log('Quantity is Zero');
        }

    },
    removeOrderItem:function(id){
        OrderItems.remove({_id:id});
    }
}); 