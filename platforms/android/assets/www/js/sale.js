$(document).on("pageinit", "#salePage", function(){
        $.getJSON(serviceURL + 'getlatestsales?cityId=' + selectedCityId + '&areaId=' + selectedAreaId, function(data) {
            //$('#mallList').html('');
            var malls = data.items;
            $.each(malls, function(index, mall) {
                $('#mallList').append('<li data-theme="c"><a href="#salePage" data-transition="slide">' +
                                    mall.mallName + '</a></li>');
                $("#mallList").listview("refresh");
            });
        })
        .success(function() { })
           .error(function(error) { alert("Got error - " + error.toString()); })
           .complete(function() { });

});