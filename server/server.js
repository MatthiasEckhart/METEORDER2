Meteor.methods({
    
    addToOrder:function(qty,product,session){
        console.log('Im here!');
        check(qty, Number);
        check(product, String);
        check(session, String);
        if(qty > 0){
            OrderItems.insert({qty:qty,product:product,sessid:session});
            console.log('reaching this fn', typeof qty, typeof product, typeof session);

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