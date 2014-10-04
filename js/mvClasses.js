//...............root object
window.Calculator = {
    Models: {},
    Views: {},
    Collections:{}
};

//...............button model class
Calculator.Models.Button = Backbone.Model.extend({
    defaults:{
        key    : '0',           // button text
        type   : 'primary',     // button type
        action : 'digit'        // action for button (digit, point, plus ...)
    }
});

//...............button view class
Calculator.Views.Button = Backbone.View.extend({
    key: '',
    tagName: 'button',
    //..........init
    initialize: function () {
        this.key = this.model.toJSON().key;
        var id = "calcBtn-" + this.key;
        var eType = this.model.toJSON().type;
        var cls = "btn btn-lg btn-" + eType + " calcBtnExt";
        this.$el.attr( "type", "button" );
        this.$el.attr( "id", "calcBtn-" + this.key );
        this.$el.attr( "class", cls );
    },
    //.......events
    events: {
        'mousedown': 'fireAction'
    },
    //.......fired to controller when button was pressed
    fireAction: function () {
        var key = this.model.toJSON().key;
        var action = this.model.toJSON().action;
        vent.trigger('fireAction', key, action);
    },
    //..........button container render
    render: function () {
        this.$el.html( this.model.toJSON().key);
        return this;
    }
});

//..................buttons collection class
Calculator.Collections.ButtonsCollection = Backbone.Collection.extend({
    model: Calculator.Models.Button
});

//..................buttons view class
Calculator.Views.ButtonsCollection = Backbone.View.extend({
    tagName: 'div',
    initialize: function () {
    },
    render: function(){
        this.collection.each(function(button){
            var buttonView = new Calculator.Views.Button({model: button});
            this.$el.append(buttonView.render().el);
        }, this);
        return this;
    }
});

//..................display view class
Calculator.Views.DisplayView = Backbone.View.extend({
    tagName: 'input',
    //..........init
    initialize: function () {
        vent.on('display', this.displayNumber, this);   //......display value
        vent.on('giveNumber', this.giveNumber, this);   //......give display value
        this.$el.attr( "class", "calcDisplayInput" );
        this.$el.attr( "id", "calcDisplayInput" );
        this.$el.attr( "name", "display" );
        this.$el.attr( "maxlength", 11 );
        this.$el.attr( "readonly", true );
        this.$el.attr( "value", "0" );
    },
    //..........display value
    displayNumber: function (value) {
        // check if there is an error
        if ((value == 'Infinity') || (value == '-Infinity') || (value == 'NaN')) value = 'ERROR';
        //  input max length
        var maxLength = this.$el.attr( 'maxlength' );
        if (value.length > maxLength) {
            console.log('yes');
            //  exponential notation check length
            for (var len = 5; len >= 3; len--) {
                value = parseFloat(value).toExponential(len);
                if (value.length <= maxLength) break;
                if (len == 3) value = 'ERROR';
            }
        }
        this.$el.attr( "value", value );
    },
    //......return display value
    giveNumber: function (callback, controllerThis) {
        var number = this.$el.attr( 'value');
        callback(number, controllerThis);
    },
    //......render
    render: function () {
        return this;
    }
});
