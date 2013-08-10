$(document).on("pageinit", "#salePage", function(){

        //var cityAreaHeaderText = "Sale in: " + ((selectedAreaId != -1) ? (selectedAreaName + ", ") : ("")) + selectedCityName;
        var cityAreaHeaderText = "Sale in: " +  selectedMallName + ", " + selectedAreaName + ", " + selectedCityName;
        $('#cityAreaHeaderDiv #cityAreaHeader').text(cityAreaHeaderText);

        $.getJSON(serviceURL + 'getlatestsales?cityId=' + selectedCityId + '&areaId=' + selectedAreaId + '&mallId=' + selectedMallId, function(data) {
            //$('#saleList').html('');
            var sales = data.items;
            $.each(sales, function(index, sale) {
                var displayName = sale.offer + ", " + sale.storeName + ", " + sale.mallName;
                $('#saleList').append('<li data-theme="c"><a href="#storePage" data-transition="slide">' +
                                    displayName + '</a></li>');
                $("#saleList").listview("refresh");
            });
        })
        .success(function() { })
           .error(function(error) { alert("Got error - " + error.toString()); })
           .complete(function() { });

});