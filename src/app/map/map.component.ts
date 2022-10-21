import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import {} from 'googlemaps';

@Component({

  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']

})

export class MapComponent implements OnInit {

  //@Input() input: InputInterface;

  timestamp: string;
  latit: string;
  long: string;

  map: google.maps.Map;
  center: google.maps.LatLngLiteral;
  poly: google.maps.Polyline;

  interval;
  i=0;
  time=1200;

  markers: google.maps.Marker[] = [];
  newMarkers: google.maps.Marker[] = [];

  source: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
  myObservable:any =  new Subject();

  options: google.maps.MapOptions = {

    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: true,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    zoom: 8
  }

  constructor() { }

  ds: google.maps.DirectionsService;
  dr: google.maps.DirectionsRenderer;

  ngOnInit(): void {

    this.ds = new google.maps.DirectionsService();
    this.dr = new google.maps.DirectionsRenderer({
      map: null,
      suppressMarkers: true
    })

    this.myObservable.subscribe((val) => {
        this.addLatLng(val);
        if(this.newMarkers.length>1) {
          console.log(this.newMarkers);
          this.newMarkers[this.newMarkers.length-2].setMap(null);
        }
        if(this.newMarkers.length==this.markers.length) {
          if(this.interval) clearInterval(this.interval);
          this.myObservable.unsubscribe();
        }
    });

  navigator.geolocation.getCurrentPosition(position => {

      this.source = {
        lat: 18.560348,
        lng: 73.820979
      }

      this.destination = {
        lat: 37.342226,
        lng: -122.0256165
      }

      this.map = new google.maps.Map(document.getElementById('map-canvas')!, {
        ...this.options,
        center: this.source
      });

      this.poly = new google.maps.Polyline({
        strokeColor: "#000000",
        strokeOpacity: 1.0,
        strokeWeight: 3
      });

      this.poly.setMap(this.map);

      this.map.addListener("click", (event: google.maps.MapMouseEvent) => {
        this.addMarker(event.latLng!);
        console.log(event.latLng);
      });

      document.getElementById('pause')
      .addEventListener("click", () => this.pausePlay('PAUSE'));

      document.getElementById('play')
      .addEventListener("click", () => this.pausePlay('PLAY'));

      document.getElementById("delete-markers")!
      .addEventListener("click", () => {
        for (let i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null);
          const path = this.poly.getPath();
          path.push(this.markers[i].getPosition() as google.maps.LatLng);
        }
      });

    });

  }

  //// Outside OnInit...
  ///////////////
  ///////////////

  //Input Handlers

  onImport(event:any) {
    var file = event.srcElement.files[0];
    if (file) {
        var reader = new FileReader();
        var data:any;
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
          data = JSON.parse(evt.target.result as string);
          console.log(data);
          data.forEach(function(e:any) {
            const dateA: any = new Date(e.timestamp);
            e.timestamp=dateA;
            console.log(e.latlng);
            this.map.setCenter(e.latlng);
            this.addMarker(e.latlng);
          });

        }
        reader.onerror = function (evt) {
            console.log('error reading file');
        }
    }
  }

  addHandler(event: any): void {
    console.log(event);
    this.map.setCenter(event.latlng);
    this.addMarker(event.latlng);
  }

  // Adds a marker to the map and push to the array.
  addMarker(position: google.maps.LatLng | google.maps.LatLngLiteral | any) {

    var marker = new google.maps.Marker({
      position: position,
      map: this.map
    });

    this.markers.push(marker);
    console.log(this.markers.length);

  }

  // Sets the map on all markers in the array.
  setMapOnAll() {
    console.log(this.markers.length);
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
  }

  // Deletes all markers in the array by removing references to them.
  deleteMarkers(): void {

  }

  addLatLng(mrker: google.maps.Marker) {
    var newMarker = new google.maps.Marker({
      position: mrker.getPosition(),
      icon: {
            url: './assets/imgs/drone-animated.svg',
            anchor: new google.maps.Point(30, 30),
            scaledSize: new google.maps.Size(60, 60)
          },
      map: this.map
    });
    this.newMarkers.push(newMarker);
  }

 

  pausePlay(state: string) {
    switch(state) {

      case 'PLAY':
        this.interval = setInterval(() => {
        this.myObservable.next(this.markers[this.i]);
        if(this.i < this.markers.length) this.i++;;
      }, this.time);
      break;

      case 'PAUSE': clearInterval(this.interval); break;
    }
  }

  //Start ngOnDestroy
  ngOnDestroy(){
    if(this.interval) clearInterval(this.interval);
    this.myObservable.unsubscribe();
  }

}
