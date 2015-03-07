var templates = {};
var notDone; 
var done; 

var getTemplates = function() {
  templates = {
    todo: Handlebars.compile( $("#incomplete").text() ),
    done: Handlebars.compile( $("#complete").text() )
  }
}


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


var createViews1 = function() {
  notDone.each(function(task){
    
     console.log(task)

    var view = new todoView(task)
    $("#incompleted").append(view.$el)

  })
}

var createViews2 = function() {
  done.each(function(task){
    
     console.log(task)

    var view = new doneView(task)
    $("#completed").append(view.$el)

  })
}



$("#btn-add").on("click", function(){
  var data = {
    task: $("#add-title").val(),
    value: $("#new-task-value").val()
  }

  notDone.create(data, {
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

  notDone = new List()
  done = new CompleteList()


  notDone.fetch({
    success: createViews1
  })

  done.fetch({
    success: createViews2
  })

})


