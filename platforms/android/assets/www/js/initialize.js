var serviceURL = "http://10.0.2.2:8080/sale/";

var selectedCityId = -1;
var selectedCityName = "All";
var selectedAreaId = -1;
var selectedAreaName = "All";
var selectedMallId = -1;
var selectedMallName = "All Stores";

$(document).on('pageinit', '#mainPage' ,function(){
    if(selectedCityId == -1)
    {
        getAndSetCityList();
    }
    else
    {
        $.mobile.changePage("#salePage",{ transition: "slide"});
    }
});

$(document).on('change', '#citySelectMenu' , cityChangeHandler);
$(document).on('change', '#areaSelectMenu' , areaChangeHandler);
$(document).on('change', '#mallSelectMenu' , mallChangeHandler);

function cityChangeHandler() {
    selectedCityId = $("#citySelectMenu option:selected").val();
    selectedCityName = $("#citySelectMenu option:selected").text();
    getAndSetAreaList();
}

function areaChangeHandler() {
    selectedAreaId = $("#areaSelectMenu option:selected").val();
    selectedAreaName = $("#areaSelectMenu option:selected").text();
    getAndSetMallList();
}

function mallChangeHandler() {
    selectedMallId = $("#mallSelectMenu option:selected").val();
    selectedMallName = $("#mallSelectMenu option:selected").text();
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
    alert(selectedCityId + "----" + selectedCityName);
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

function getAndSetMallList() {
    $.getJSON(serviceURL + 'getmalls?cityId=' + selectedCityId + '&areaId=' + selectedAreaId, function(data) {
        $('#mallSelectMenu').html('');
        var malls = data.items;
        $.each(malls, function(index, mall) {
            $('#mallSelectMenu').append('<option value="' + mall.mallId + '">' + mall.mallName  + '</option>');
        });
        $("#mallSelectMenu option:first").attr("selected", "selected");
        $("#mallSelectMenu").selectmenu('refresh', true);
        mallChangeHandler();
    })
    .success(function() { })
       .error(function(error) { alert("Got error - " + error.toString()); })
       .complete(function() { });

}