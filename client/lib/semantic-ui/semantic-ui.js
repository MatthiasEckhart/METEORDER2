Template.productCreate.onRendered(function(){
                $('.accordion-create').accordion({
    selector: {
      trigger: '.title .icon'
    }
  });
             });

 Template.productItem.onRendered(function(){
                $('.accordion-edit').accordion({
    selector: {
      trigger: '.title .edit'
    }
  });
             });

Template.supplierItem.onRendered(function(){
               $('.edit-popup')
  .popup()
;
             });

Template.suppliersList.onRendered(function(){
               $('addSupplier-popup').popup();
             });