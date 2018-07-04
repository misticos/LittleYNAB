
// BUDGET controller
var budgetController = (function(){



})();


//UI CONTROLLER
var UIController = (function () {

  var DOMstrings = {
    inputType: '.add__type',
    description: '.add__description',
    value: '.add__value',
    inputBtn: '.add__btn'
  }

  return {
    getinput: function () {

      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
        description: document.querySelector(DOMstrings.description).value,
        value: document.querySelector(DOMstrings.value).value
      };
    },

    getDOMstrings: function () {
      return DOMstrings;
    }


  };

})();


//GLOABAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {
  //From video
  var DOM = UICtrl.getDOMstrings();

  var ctrlAddItem  = function () {
    // 1. Get the field input data
    var input = UICtrl.getinput();
    console.log(input);

    // 2. Add the item to the budget CONTROLLER

    // 3. Add the item to the UI

    // 4. Calculate the budget__title

    // 5. Display the budget on UI

  }

  document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)

  document.addEventListener('keypress', function (event) {

    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  })

})(budgetController, UIController);
