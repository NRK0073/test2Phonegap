/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        document.getElementById("btnweather").addEventListener("click", getweather);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:none;');

        console.log('Received Event: ' + id);
    }
};

function getweather(){
    //alert('hello');
   
if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position)
    {
        $("#geoloc").html("latitude:" + position.coords.latitude + "<br> longitude: " + position.coords.longitude);

        var lat = position.coords.latitude ;
        var long = position.coords.longitude;
        // alert('lat' + lat);
        // alert('long' + long);
      
        var weatherURL= "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&APPID=3fbed3bf81988b86e5137b92f13e96ff";
        $.getJSON(weatherURL).done(function(data){
            $("#currentlocation").html("currentlocation:" + data.name);
            $("#currentemp").html("current temp:" + data.main.temp);
            $("#mintemp").html("minimum temperature in celsius:" + data.main.temp_min);
            $("#maxtemp").html("maximum temperature in celsius:" + data.main.temp_max);
            $("#wind").html("wind speed in km/hr:" + data.wind.speed);
            $("#winddir").html("wind direction:" + data.wind.direction +"North");
            $("#humidity").html("humidity:" + data.main.humidity);
            $("#pressure").html("pressure:" + data.main.pressure);
            $("#subweather").html("subweather condition:" + data.weather.sub);
            $("#sunrise").html("sunrise time:" + data.sys.sunrise);
            $("#sunset").html("sunset time:" + data.sys.sunset);
            
        });
    },function(er){
        alert(er.message);
    });
}
}