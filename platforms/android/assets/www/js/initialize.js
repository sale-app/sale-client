var serviceURL = "http://ec2-54-251-203-201.ap-southeast-1.compute.amazonaws.com:8080/sale/";

var selectedCityId;
var selectedAreaId;

$(document).on('pageinit', '#mainPage' ,function(){
    getAndSetCityList();
});

$(document).on('change', '#citySelectMenu' , cityChangeHandler);

function cityChangeHandler() {
    //var cityId = $("#citySelectMenu option:selected").val();
    selectedCityId = $("#citySelectMenu").val();
    getAndSetAreaList();
}

function areaChangeHandler() {
    selectedAreaId = $("#areaSelectMenu").val();
}

function getAndSetCityList() {
    $.getJSON(serviceURL + 'citylist', function(data) {
		$('#citySelectMenu').html('');
		var cities = data.items;
		$.each(cities, function(index, city) {
			$('#citySelectMenu').append('<option value="' + city.cityId + '">' + city.cityName  + '</option>');
		});
		$("#citySelectMenu option:first").attr("selected", "selected");
		$("#citySelectMenu").selectmenu('refresh', true);
		cityChangeHandler();
	})
	.success(function() { })
       .error(function(error) { alert("Got error - " + error.toString()); })
       .complete(function() { });
}

function getAndSetAreaList() {
    $.getJSON(serviceURL + 'arealist?cityId=' + selectedCityId, function(data) {
		$('#areaSelectMenu').html('');
		var areas = data.items;
		$.each(areas, function(index, area) {
			$('#areaSelectMenu').append('<option value="' + area.areaId + '">' + area.areaName  + '</option>');
		});
		$("#areaSelectMenu option:first").attr("selected", "selected");
		$("#areaSelectMenu").selectmenu('refresh', true);
		areaChangeHandler();
	})
	.success(function() { })
       .error(function(error) { alert("Got error - " + error.toString()); })
       .complete(function() { });
}