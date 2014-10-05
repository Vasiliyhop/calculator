//.......MVC --> Controller
Calculator.Views.Controller = Backbone.View.extend({
    actionStack: '',                // operator stack
    numberStack: 0,                 // number   stack
    currentNumber: '0',             // display  number
    pointIsEntered: false,          // point is entered
    operatorSet: false,             // operator set
    //..........controller initialization
    initialize: function () {
        vent.on('fireAction', this.actionHandler, this);     // button was pressed
        vent.on('keyWasPressed', this.keyWasPressed, this);  // key was pressed
    },
    //..........arithmetic operation worker
    arithmeticOperation: function () {
        self.pointIsEntered = false;
        self.operatorSet = true;
        if ((self.actionStack == '') && (self.numberStack == '')) return;
        var result;
        var leftExp = parseFloat(this.numberStack);
        var rightExp = parseFloat(this.currentNumber);
        switch(self.actionStack) {
            case 'plus':
                result = leftExp + rightExp;
                break;
            case 'minus':
                result = leftExp - rightExp;
                break;
            case 'multiply':
                result = leftExp * rightExp;
                break;
            case 'divide':
                result = leftExp / rightExp;
                break;
        }
        result = Math.round(result * 100000000) / 100000000;
        self.currentNumber = result.toString();
        vent.trigger('display', self.currentNumber);
    },
    //.............method for cleaning variables
    clearVariables: function(){ // clear display and variables
        self.actionStack = '';
        self.numberStack = 0;
        self.currentNumber = 0;
        self.pointIsEntered = false;
        self.operatorSet = false;
        vent.trigger('display', '0');
    },
    //............handle user actions
    actionHandler: function (key, action) {
        //............get display value callback
        vent.trigger('giveNumber', function(number, controllerThis){
            self = controllerThis;
            self.currentNumber = number;

            if (number == 'ERROR') {
                self.clearVariables();
            };
            switch (action){
                case 'clear':
                    // clear display and variables
                    self.clearVariables();
                    break;
                case 'backspace':
                    // <-- backspace
                    // if del point
                    if (self.currentNumber.slice(-1) == '.') self.pointIsEntered = false;
                    // if length min
                    if (self.currentNumber.length <= 1) {
                        self.currentNumber = '0';
                    }else {
                    // <--
                        self.currentNumber =  self.currentNumber.substring(0, self.currentNumber.length - 1);
                    }
                    vent.trigger('display', self.currentNumber);
                    break;
                case 'digit':
                    // digit was entered
                    if (self.currentNumber == '0') self.currentNumber = '';
                    if (self.operatorSet) self.currentNumber = '';
                    self.operatorSet = false;
                    self.currentNumber += key;
                    if (self.currentNumber.length > 11) return;
                    vent.trigger('display', self.currentNumber);
                    break;
                case 'point':
                    // digit was entered
                    if (self.pointIsEntered) break;
                    if (self.operatorSet) self.currentNumber = '0';
                    self.operatorSet = false;
                    self.pointIsEntered = true;
                    self.currentNumber += key;
                    vent.trigger('display', self.currentNumber);
                    break;
                case 'equal':
                    // equal was entered
                    self.arithmeticOperation();
                    self.actionStack = '';
                    self.numberStack = '';
                    break;
                default:
                    // arithmetic operation was set
                    self.arithmeticOperation();
                    self.actionStack = action;
                    self.numberStack = self.currentNumber;
            }
        }, this);
    },
    //...........key press handler
    keyWasPressed: function ( event ) {
        var key;
        var kCode = event.keyCode;
        var action;
        if ( kCode == 190 ) {
            key = '.';
            action = 'point';
        }else if ( kCode == 8 ){
            key = 'backspace';
            action = 'backspace';
        }else {
            key = parseInt(String.fromCharCode(event.keyCode));
            action = 'digit';
        }
        if (!key) return;
        vent.trigger('fireAction', key , action);
    }
});
//......instance of controller
new Calculator.Views.Controller({});
