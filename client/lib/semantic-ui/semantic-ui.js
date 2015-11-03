Template.productCreate.rendered = function(){
                $('.accordion').accordion({
    selector: {
      trigger: '.title .icon'
    }
  });
             }

 Template.productItem.rendered = function(){
                $('.accordion').accordion({
    selector: {
      trigger: '.title .edit'
    }
  });
             }