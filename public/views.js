var Task = Backbone.Model.extend({

  close: function() {
    $.ajax({
      url: "/tasks/" + this.id + "/close",
      method: "POST",
      context: this,
      success: function(updatedTask) {
        this.set(updatedTask)
      }
    })
  },

  reopen: function() {
    $.ajax({
      url: "/tasks/" + this.id + "/reopen",
      method: "POST",
      context: this,
      success: function(updatedTask) {
        this.set(updatedTask)
      }
    })
  },

})

var TaskCollection = Backbone.Collection.extend({

  model: Task,

  url: "/tasks"

})

var todoView = Backbone.View.extend({

  events: {
    "click .btn-done": "clickedComplete",
    "click .btn-undo": "clickedReopen"
  },

  clickedComplete: function() {
    this.model.close()
  },

  clickedReopen: function() {
    this.model.reopen()
  },

  tagName: "div",

  className: "task-container",

  initialize: function(taskModel){
    this.model = taskModel

    this.listenTo(this.model, "change", this.render)

    this.render()
  },

  render: function() {
    this.$el.html( templates.todo(this.model.toJSON()) )
  }

})



var doneView = Backbone.View.extend({

  events: {
    "click #btn-done": "clickedComplete",
    "click #btn-undo": "clickedReopen"
  },

  clickedComplete: function() {
    this.model.close()
  },

  clickedReopen: function() {
    this.model.reopen()
  },

  tagName: "div",

  className: "task-container",

  initialize: function(taskModel){
    this.model = taskModel

    this.listenTo(this.model, "change", this.render)

    this.render()
  },

  render: function() {
    this.$el.html( templates.done(this.model.toJSON()) )
  }

})