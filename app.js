
// BUDGET controller
var budgetController = (function(){

  var x =23;

  var add = function functionName(a) {
    return x + a;
  }
  return {
    publicTest: function(b) {
      return (add(b));
    }
  }

})();


//UI CONTROLLER
var UIController = (function () {

  //Some code

})();


//GLOABAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

  var ctrlAddItem  = function () {
    // 1. Get the field input data

    // 2. Add the item to the budget CONTROLLER

    // 3. Add the item to the UI

    // 4. Calculate the budget__title

    // 5. Display the budget on UI
    console.log('good');
  }

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem)

  document.addEventListener('keypress', function (event) {

    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  })

})(budgetController, UIController);
