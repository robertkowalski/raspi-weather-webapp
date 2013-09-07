/*global require*/

'use strict';
require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: 'vendor/bootstrap'
    }
});

require([
    'backbone'
], function (Backbone) {
    var TempView = Backbone.View.extend({
      el: '.temp',
      tagName : 'div',
      className : '',
      initialize : function(options) {
        this.listenTo(this.model, 'change', this.render);
      },
      render : function() {
        this.el.innerHTML = this.model.get('t');
        return this;
      }
    });

    var Temp = Backbone.Model.extend({
        defaults : {
            t: null
        },
        parse: function(res) {
            var tArr = res.t.toString().split('');
            res.t = tArr[0] + tArr[1] + "." + tArr[2] + tArr[3];

            return res;
        },
        url: 'http://localhost/api'
    });

    var t = new Temp()
    var tempView = new TempView({
      model : t
    });
    t.fetch()

    setInterval(function() {
        t.fetch();
    }, 60 * 1000);
});
