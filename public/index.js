var tasks = [];
var taskCounter = 0;

var createTask = function(data) {
  var newTask = {
    task: data.task,
    value: data.value,
    complete: false,
    createdAt: new Date()
  }

  taskCounter++

  newTask.id = (taskCounter).toString()

  tasks.push(newTask)

  return newTask
}


var createDate = function(){
	var date = moment().format("ll");
	$("#date").html(date);
}






var getAllTasks = function(callback){
	$.ajax({
	    url: "/tasks",
	    method: "GET",
	    success: function(data){
	      console.log(data)
	      callback(data)
		}
	 })
}

var allTasks = function(data) {
	_.each(data, function(steve){
		   var allData = {
			 task: steve.task,
			 value: steve.value,
		   	 complete: steve.complete,
		     createdAt: moment(steve.createdAt).format("ll"),
		     id: steve.id
		    }
		    var htmlString = templates.allTasks(allData)
		    $("#allTasks").append(htmlString)
	})
}

//get incomplete
var incompleteTasks = function(data){
  var incomplete = _.filter(data, function(task){
      return (task.complete === false)
  })
  console.log("i", incomplete)
  _.each(incomplete, function(steve){
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
		   				window.location.reload(true)
		   				updateUI()

		   			}
		   		})
		    })
	})
}
 
// get completecomplete
var completeTasks = function(data){
  var complete = _.filter(data, function(task){
      return (task.complete === true)
  })
  console.log("c", complete)
  _.each(complete, function(steve){
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
		   		
		   		$.ajax({
		   			method: "POST",
		   			//dont forget data for creating task
		   			url: "/tasks/" + id + "/reopen",
		   			success: function(data) {
		   				window.location.reload(true)
		   				updateUI()
		   			}
		   		})
		    })
	})
}
//specfic
var specific = function(id){
    getAllTasks(function(data){
    	var hayo = _.find(data, function(task){
	      return (task.id === id.toString())
	    })
	    console.log("s", hayo)
	    _.each(hayo, function(steve){
		   var allData = {
			 task: steve.task,
			 value: steve.value,
		   	 complete: steve.complete,
		     createdAt: moment(steve.createdAt).format("ll"),
		     id: steve.id
		    }
		    var htmlString = templates.specificTasks(allData)
		    $("#taskID").append(htmlString)
    })
    
  })
}

 //make complete 
 var close= function(id) {
 	getAllTasks(function(data){
 		var task = u.find(tasks, function(task){
      return (task.id === id)
    })
})
    task.complete = true
    task.reopenedAt = new Date()

    return task
 	
 }

//make incomplete
var reopen = function(id) {
   getAllTasks(function(data){
   	var task = u.find(data, function(task){
      return (task.id === id)
    })
   })
     task.complete = false
    task.reopenedAt = new Date()

    return task
  }





$("btn-remove").click(function(){

  $(".completed").on("click",'.btn-remove',function(){  
    $(this).parent("li").remove();
  })
})


//Create Templates
var templates = {};
var getTemplates = function(){

	var allString = $("#all").text()
	templates.allTasks = Handlebars.compile(allString)

	var incompleteString = $("#incomplete").text()
	templates.incompleteTasks = Handlebars.compile(incompleteString)

	var completeString = $("#complete").text()
	templates.completeTasks = Handlebars.compile(completeString)

	var specificString = $("#specific").text()
	templates.specificTasks = Handlebars.compile(specificString)
}

var updateUI = function() {
	getAllTasks(allTasks)
	getAllTasks(incompleteTasks)
	getAllTasks(completeTasks)
}

//When the page loads calls functions
$(document).on("ready", function(){
	getTemplates()
	$('#simple-menu').sidr();
	updateUI()
	// specific(2)
	createDate()

})
