mk.view.DateRangePicker = Backbone.NativeView.extend({
    events: {
        "click .btn": "toggleDateRangePicker"
    },

    initialize: function() {
    },

    render: function() {
        this.dateRangePicker = this.el.querySelector(".date-range-picker");
        this.button = this.el.querySelector(".btn");

        this.datepicker = {};


        // Date picker to select from date
        this.datepicker.from = new mk.view.DatePicker({
            highlight: this.highlight
        });
        this.dateRangePicker.appendChild(this.datepicker.from.render().el);
        this.listenTo(this.datepicker.from, "change", this.setStart);

        // Date picker to select from date
        this.datepicker.to = new mk.view.DatePicker({
            highlight: this.highlight
        });
        this.dateRangePicker.appendChild(this.datepicker.to.render().el);
        this.listenTo(this.datepicker.to, "change", this.setStop);

        return this;
    },

    toggleDateRangePicker: function() {
        this.dateRangePicker.classList.toggle("show");
    },

    highlight: function(date) {
        return date >= mk.start && date <= mk.stop;
    },

    setStop: function(date) {
        mk.stop = utils.time.endOf(date);

        if (mk.stop < mk.start)
            mk.start = utils.time.startOf(date);

        this.update();
    },

    setStart: function(date) {
        mk.start = utils.time.startOf(date);

        if (mk.start > mk.stop)
            mk.stop = utils.time.endOf(date);

        this.update();
    },

    update: function() {
        this.datepicker.to.setDate(mk.stop);
        this.datepicker.from.setDate(mk.start);

        this.setButton();
    },

    setButton: function() {
        var y,m,d,from,to;

        y = mk.start.getFullYear();
        m = mk.start.getMonth();
        d = mk.start.getDate();

        from = y + '-' + (m > 9 ? m : '0' + m) + '-' + (d > 9 ? d : '0' + d);

        y = mk.stop.getFullYear();
        m = mk.stop.getMonth();
        d = mk.stop.getDate();

        to = y + '-' + (m > 9 ? m : '0' + m) + '-' + (d > 9 ? d : '0' + d);

        console.log("From",from,"to",to);

        this.button.textContent = from + ' – ' + to;
    }
});
