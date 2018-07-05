
// BUDGET controller
var budgetController = (function(){

  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
      sum = sum + cur.value;
    });
    data.totals[type] = sum;
  };


  var data = {

    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  }

  return {
    addItem: function (type, des, val) {
      var newItem, ID;

      //Create new id
      if (data.allItems[type].lenght > 0) {
          ID = data.allItems[type][data.allItems[type].lenght - 1].id + 1
      } else {
        ID = 0;
      }


      //Create new item based on 'inc' or 'exp' type
      if (type === 'exp') {
          newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
          newItem = new Income(ID, des, val);
      }

      //Push it into our date structure
      data.allItems[type].push(newItem);

      //Return new item
      return newItem;
    },

    calculateBudget: function () { // this is method

      //cal total income and expensee
      calculateTotal('exp');
      calculateTotal('inc');

      //cal the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      //cal the percentage of income and spen
      data.percentage = Math.round ((data.totals.exp / data.totals.inc) * 100);

    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.totals.percentage
      }
    },

    testing: function() {
      console.log(data);
    }
  };

})();

//Temp section
var Expense = function (id, description, value) {
  this.id = id;
  this.description = description;
  this.value = value;
};



//UI CONTROLLER
var UIController = (function () {

  var DOMstrings = {
    inputType: '.add__type',
    description: '.add__description',
    value: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list'
  }

  return {
    getinput: function () {

      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
        description: document.querySelector(DOMstrings.description).value,
        value: parseFloat(document.querySelector(DOMstrings.value).value)
      };
    },

    addListItem: function (obj, type) {
      var html, newHtml, element;
      //Create HTML strings with placeholder text

      if (type === 'inc') {
        element = DOMstrings.incomeContainer;

        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>      </div></div></div>'
      } else if (type === 'exp') {
                element = DOMstrings.expenseContainer;

        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%<div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }     

      //Replace the placeholder text with some actual
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      //Insert html into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

    },

    clearFields: function() {
      var fields, fieldsArr;

      fields = document.querySelectorAll(DOMstrings.description + ', ' + DOMstrings.value);

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array) {
        current.value = "";
      });

      fieldsArr[0].focus();
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
    var input, newItem;

    // 1. Get the field input data
    input = UICtrl.getinput();
    
    if (input.description !== "" && !(isNaN(input.value)) && input.value > 0){
       // 2. Add the item to the budget CONTROLLER
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    // 3. Add the item to the UI
    UICtrl.addListItem(newItem, input.type);

    // 4. Clear the fields
    UICtrl.clearFields();

    // 5. Calculate and update budget
    updateBudget();
    }
  }

  document.querySelector(UIController.getDOMstrings().inputBtn).addEventListener('click', ctrlAddItem)

  document.addEventListener('keypress', function (event) {

    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  })

  var updateBudget = function() {
    // 1. Calculate budget 
    budgetCtrl.calculateBudget();


    // 2. Calculate the budget__title
    var budget = budgetCtrl.getBudget();

    // 3. Display the budget on UI
    console.log(budget);
};

})(budgetController, UIController);
