var templates = {};
var tasks;
var createDate = function(){
  var date = moment().format("ll");
  $("#date").html(date);
}

//stats
var completeTasksCount = function() {

  $.ajax({
    url: "/tasks/complete",
    method: "GET",
    success: function(data) {
     a = data.length,
     $("#ccount").text(a),
     console.log(a)
    }
  })

}

var incompleteTasksCount = function() {

  $.ajax({
    url: "/tasks/incomplete",
    method: "GET",
    success: function(data) {
      a = data.length
      $("#icount").text(a)
      console.log(a)
    }
  })

}
var getStats= function() {

  $.ajax({
    url: "/stats",
    method: "GET",
    success: function(data) {
    console.log(data)
    a = data.experience
    b = data.level
    c = data.expToNextLevel
    d = numeral(data.percentComplete).format("0%")
    $("#exp").html(a);
    $("#level").html(b);
    $("#expTo").html(c);
    $("#pComplete").html(d);
    }
  })

}

var getTemplates = function() {
  templates = {
    todo: Handlebars.compile( $("#incomplete").text() ),
    done: Handlebars.compile( $("#complete").text() )
  }
}

var createViews = function() {
  tasks.filter(function(task){
    
     
  console.log(task.toJSON().id === "1")

    var view = new todoView(task)
    $("#incompleted").append(view.$el)

  })
}




$("#btn-add").on("click", function(){
  var data = {
    task: $("#add-title").val(),
    value: $("#new-task-value").val()
  }

  tasks.create(data, {
    success: function(newModel) {
      var view = new TaskView(newModel)
      $("#incompleted").append(view.$el)
    }
  })
})

$(document).on("ready", function(){

  getTemplates()
  incompleteTasksCount()
  completeTasksCount()
  getStats()
  $('#simple-menu').sidr();

  tasks = new TaskCollection()

  tasks.fetch({
    success: createViews
  })

})