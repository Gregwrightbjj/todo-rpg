var tasks = [];
var taskCounter = 0;

//date
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

var getAllTasks = function(callback){
	$.ajax({
	    url: "/tasks",
	    method: "GET",
	    success: function(data){
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
  	console.log("i",incomplete)
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
 
// get complete
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
		    
		    $itemHtml.find(".btn-undo").on("click", function(){
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

//adding new cupcake
$("#btn-add").on("click", function(){
	var title = $(".add-title").val()
	
	$.ajax({
		method: "PUT",
		data:{
			task: title,
			
		},
		url: "/tasks" ,
		success: function(data) {
		window.location.reload(true)
		updateUI()
		}
	})
	
})



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
	//getAllTasks(allTasks)
	getAllTasks(incompleteTasks)
	getAllTasks(completeTasks)
	incompleteTasksCount()
	completeTasksCount()
}

//When the page loads calls functions
$(document).on("ready", function(){
	getTemplates()
	$('#simple-menu').sidr();
	updateUI()
	createDate()

})
