var tasks = Backbone.Model.extend({
	defaults:{
		complete: false,
		
		created: moment().format("ll")
	},
	validate: function(attributes){
		if(!attributes.task){
			return "Needs a Task"
		}else{

		}
	}
	
})



var List = Backbone.Collection.extend({
	url:"/tasks",
	model: tasks
})

//list functions 
var updateUI = function(){
$("#incompleted").html("")
$("#completed").html("")

incomplete(list)
complete(list)
}

var all= function(ok) {
    return ok.toJSON()
  }	
var complete= function(ok) {
    var comp = _.filter(ok.toJSON(), function(task){
     return (task.complete === true)
    })
    _.each(comp, function(steve){
		   var allData = {
			 task: steve.task,
			 value: steve.value,
		   	 complete: steve.complete,
		     createdAt: moment(steve.createdAt).format("ll"),
		     id: steve.id
		    }
		    var htmlString = templates.completeTasks(allData)
		    var $itemHtml = $(htmlString)
		    $("#completed").append($itemHtml)
		    $itemHtml.on("click", function(){
		    	var id = $(this).attr("data-id")
		   		
		   		})
		    })
  
    console.log(comp) 
    return comp
}

var incomplete = function(ok) {
    var incomp =  _.filter(ok.toJSON(), function(task){
      return (task.complete === false)
    })
_.each(incomp, function(steve){
		   var allData = {
			 task: steve.task,
			 value: steve.value,
		   	 complete: steve.complete,
		     createdAt: moment(steve.createdAt).format("ll"),
		     id: steve.id
		    }
		    var htmlString = templates.incompleteTasks(allData)
		    var $itemHtml = $(htmlString)
		    $("#incompleted").append($itemHtml)
		    $itemHtml.on("click", function(){
		    	var id = $(this).attr("data-id")
		   		$.ajax({
		   			method: "POST",
		   			//dont forget data for creating task
		   			url: "/tasks/" + id + "/close",
		   			success: function(data) {
		   				
		   				updateUI()

		   			}
		   		})
		   		})
    })
    console.log(incomp) 
    return incomp

}
//add function
  $("#btn-add").on("click", function(){
  var title = $("#add-title").val()
  

  var task = new Task({
    task: title,
    complete: false
    
  })

  if (task.isValid() === true) {
    store.add(beer)

    task.save({}, {
      complete: updateUI
    })
    
    $("#add-title").val("")
    $("#add-abv").val("")
  }
  else {
    alert(task.validationError)
  }
})

var templates = {}
var list = new List();



var getTemplates= function(){
	var allString = $("#all").text()
	templates.allTasks = Handlebars.compile(allString)

	var incompleteString = $("#incomplete").text()
	templates.incompleteTasks = Handlebars.compile(incompleteString)

	var completeString = $("#complete").text()
	templates.completeTasks = Handlebars.compile(completeString)

	var specificString = $("#specific").text()
	templates.specificTasks = Handlebars.compile(specificString)
}

$(document).on("ready", function(){
	getTemplates()
	list.fetch({
		success:function(){
			updateUI()
		}
	})
	$('#simple-menu').sidr();
})