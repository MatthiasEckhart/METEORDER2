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
               $('.edit-popup').popup();
              
             });

Template.suppliersList.onRendered(function(){
               $('.addSupplier-popup').popup();
                $('.ui.sidebar').sidebar('toggle');
             });

Template.productItem.onRendered(function(){
               $('.edit-popup').popup();
              
             });

Template.header.onRendered(function(){
               $('.logout-popup').popup();
               $('.dropdown').dropdown();
             });



Template.layout.onRendered(function(){
              $(".ui.sidebar").sidebar();
               $('.dropdown').dropdown();
             });