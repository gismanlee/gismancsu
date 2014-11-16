$("#post_body").qeditor({});
var toolbar = $("#post_body").parent().find(".qeditor_toolbar");
var link = $("<a href='#'><span class='icon-smile' title='smile'></span></a>");
link.click(function(){
  alert("Put you custom toolbar event in here.");
  return false;
});
toolbar.append(link);
   
$("#submit").click(function(){
	alert($("#post_body").val());
});
