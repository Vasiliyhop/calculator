var vent = _.extend({}, Backbone.Events);
requirejs(["js/app/mvClasses.js"], function () {

    //....instance of buttons collection creation
    var buttonsCollection = new Calculator.Collections.ButtonsCollection([
        {
            key: '7',
            type: 'primary',
            action : 'digit'
        },
        {
            key: '8',
            type: 'primary',
            action : 'digit'
        },
        {
            key: '9',
            type: 'primary',
            action : 'digit'
        },
        {
            key: '÷',
            type: 'success',
            action : 'divide'
        },
        {
            key: '4',
            type: 'primary',
            action : 'digit'
        },
        {
            key: '5',
            type: 'primary',
            action : 'digit'
        },
        {
            key: '6',
            type: 'primary',
            action : 'digit'
        },
        {
            key: 'x',
            type: 'success',
            action : 'multiply'
        },
        {
            key: '1',
            type: 'primary',
            action : 'digit'
        },
        {
            key: '2',
            type: 'primary',
            action : 'digit'
        },
        {
            key: '3',
            type: 'primary',
            action : 'digit'
        },
        {
            key: '-',
            type: 'success',
            action : 'minus'
        },
        {
            key: '0',
            type: 'primary',
            action : 'digit'
        },
        {
            key: '.',
            type: 'primary',
            action : 'point'
        },
        {
            key: '=',
            type: 'warning',
            action : 'equal'
        },
        {
            key: '+',
            type: 'success',
            action : 'plus'
        }
    ]);
    //..........instance of buttons collection view
    var buttonsCollectionView = new Calculator.Views.ButtonsCollection({collection: buttonsCollection});

    //..........instance of display view
    var display = new Calculator.Views.DisplayView({});

    //............append display and buttons
    $("#display-view").append(display.render().el);
    $("#buttons-view").append(buttonsCollectionView.render().el);

    //............events for mouse and keys
    $(document).ready(function() {
        //...........fix focus on bootstrap buttons when was pressed
        $(document).mouseup(function(){
            $( ":button" ).blur();
        });
        //...........capture focus for keypress
        $('#calculator-view').mouseover(function(){
            $('#calculator-view').focus();
        });
        //...........key was pressed
        $("#calculator-view").bind('keydown', (function(event) {
            vent.trigger('keyWasPressed', event);
        }));
        //........... clear button hasn't model view , it' making up in html
        //........... this is the trigger for it
        $("#calcBtn-C").mousedown(function(event) {
            vent.trigger('fireAction', 'C' , 'clear');
        });
        //...........events end
    });

    //...............MVC  Controller load
    requirejs( ["js/app/controller.js"] );
});


