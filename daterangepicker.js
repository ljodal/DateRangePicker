mk.view.DateRangePicker = Backbone.NativeView.extend({
    events: {
        "click .btn": "toggleDateRangePicker"
    },

    initialize: function() {
    },

    render: function() {
        this.dateRangePicker = this.el.querySelector(".date-range-picker");

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
    },
});
