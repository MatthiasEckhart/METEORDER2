Meteor.methods({
    
    addToOrder:function(qty,product,session){
        if(qty > 0){
            console.log('reaching this fn');
            OrderItems.insert({qty:qty,product:product,sessid:session});
        } else{
            console.log('Quantity is Zero');
        }

    },
    removeOrderItem:function(id){
        orderItems.remove({_id:id});
    }
}); 