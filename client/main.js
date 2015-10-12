Template.registerHelper('currency', function(num){
  return '$' + Number(num).toFixed(2);
});