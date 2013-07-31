var serviceURL = "http://ec2-54-251-203-201.ap-southeast-1.compute.amazonaws.com:8080/sale/";

var employees;

$('#employeeListPage').bind('pageinit', function(event) {
	getEmployeeList();
});

function getEmployeeList() {
    alert("Making call");
	$.getJSON(serviceURL + 'index.html', function(data) {
		alert("Got new data " + data);
		$('#employeeList li').remove();
		employees = data.items;
		$.each(employees, function(index, employee) {
			$('#employeeList').append('<li><a href="employeedetails.html?id=' + employee.cityId + '">' +
					'<h4>' + employee.cityName + '</h4>' +
					'<span class="ui-li-count">' + employee.cityId + '</span></a></li>');
		});
		$('#employeeList').listview('refresh');
	})
	.success(function() { alert("second success"); })
       .error(function(error) { alert("Got error - " + error.toString()); })
       .complete(function() { alert("complete"); });
}