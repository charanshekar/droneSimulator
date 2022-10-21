// //////////////////////////////////////
// //////////////////////////////////////
// //////////////////////////////////////
// //////////////////////////////////////
// //////////////////////////////////////



// import { Component, OnInit } from '@angular/core';
// import { Observable, Subject } from 'rxjs';
// import {} from 'googlemaps';

// @Component({
//   selector: 'app-map',
//   templateUrl: './map.component.html',
//   styleUrls: ['./map.component.scss']
// })
// export class MapComponent implements OnInit {

//   map: google.maps.Map;
//   center: google.maps.LatLngLiteral;
//   poly: google.maps.Polyline;

//   interval;
//   i=0;
//   time=1200;

//   markers: google.maps.Marker[] = [];
//   newMarkers: google.maps.Marker[] = [];

//   source: google.maps.LatLngLiteral;
//   destination: google.maps.LatLngLiteral;

//   myObservable:any =  new Subject();

//   options: google.maps.MapOptions = {
//     mapTypeId: google.maps.MapTypeId.ROADMAP,
//     scrollwheel: true,
//     disableDefaultUI: true,
//     disableDoubleClickZoom: true,
//     zoom: 12
//   }

//   constructor() { }

//   ds: google.maps.DirectionsService;
//   dr: google.maps.DirectionsRenderer;

//   ngOnInit(): void {


//     this.ds = new google.maps.DirectionsService();
//     this.dr = new google.maps.DirectionsRenderer({
//       map: null,
//       suppressMarkers: true
//     })

//     navigator.geolocation.getCurrentPosition(position => {
      
//       // this.center = {
//       //   lat: position.coords.latitude,
//       //   lng: position.coords.longitude
//       // }

//       this.source = {
//         lat: 37.4220656,
//         lng: -122.0840897
//       }

//       this.destination = {
//         lat: 37.342226,
//         lng: -122.0256165
//       }

//       this.map = new google.maps.Map(document.getElementById('map-canvas')!, {
//         ...this.options,
//         //center: this.center
//         center: this.source
//       });

//       this.poly = new google.maps.Polyline({
//         strokeColor: "#000000",
//         strokeOpacity: 1.0,
//         strokeWeight: 3,
//       });
//       this.poly.setMap(this.map);

//       this.map.addListener("click", (event: google.maps.MapMouseEvent) => {
//         this.addMarker(event.latLng!);
//         console.log(this.markers);
//       });

//       document.getElementById('pause')
//       .addEventListener("click", () => this.pausePlay('PAUSE'));

//       document.getElementById('play')
//       .addEventListener("click", () => this.pausePlay('PLAY'));

//       document.getElementById("delete-markers")!
//       .addEventListener("click", () => {
//         for (let i = 0; i < this.markers.length; i++) {
//           this.markers[i].setMap(null);
//           const path = this.poly.getPath();
//           path.push(this.markers[i].getPosition() as google.maps.LatLng);
//         }
//         this.myObservable = new Observable((observer) => {
//           //console.log("Observable starts..");
//             this.interval = setInterval(()=>{
//               observer.next(this.markers[this.i]);
//               if(this.i < this.markers.length){
//                 this.i++;
//               }
//               //() => clearInterval(this.interval);
//             }, this.time);
//           //clearInterval(this.interval);

//           // for(let i = 0; i < this.markers.length; i++) {
//           //   setTimeout(()=>{observer.next(this.markers[i])}, time);
//           //   time+=2000;
//           // }
//           });
//         this.myObservable.subscribe((val) => {
//           this.addLatLng(val);
//           if(this.newMarkers.length>1) {
//             console.log(this.newMarkers);
//             this.newMarkers[this.newMarkers.length-2].setMap(null);
//           }
//         });
//       });


//       // var markerStart = new google.maps.Marker({
//       //   //position: this.center,
//       //   position: this.source,
//       //   icon: {
//       //     url: './assets/imgs/drone-animated.svg',
//       //     anchor: new google.maps.Point(30, 30),
//       //     scaledSize: new google.maps.Size(60, 60)
//       //   },
//       //   map: this.map
//       // });

//       // var destinationMarker = new google.maps.Marker({
//       //   position: this.destination,
//       //   map: this.map
//       // });

//       // //this.setRoutePolyline();

//       // const flightPath = new google.maps.Polyline({
//       //   path: [this.source,this.destination],
//       //   geodesic: true,
//       //   strokeColor: "#FF0000",
//       //   strokeOpacity: 1.0,
//       //   strokeWeight: 2,
//       // });
    
//       // flightPath.setMap(this.map);
//     });
//   }

//   //// Outside OnInit...
//   ////

//   // setRoutePolyline() {
//   //   let request = {
//   //     origin: this.source,
//   //     destination: this.destination
//   //   };

//   //   this.ds.route(request, (res, status) => {
//   //     this.dr.setOptions({
//   //       suppressPolylines: false,
//   //       map: this.map
//   //     });

//   //     if (status == google.maps.DirectionsStatus.OK) {
//   //       this.dr.setDirections(res);
//   //       console.log(res);
//   //     }
//   //   });
//   // }

//   // Adds a marker to the map and push to the array.
//   addMarker(position: google.maps.LatLng | google.maps.LatLngLiteral) {
//     var marker = new google.maps.Marker({
//       position: position,
//       map: this.map
//     });

//     this.markers.push(marker);
//     console.log(this.markers.length);
//   }

//   // Sets the map on all markers in the array.
//   setMapOnAll() {
//     console.log(this.markers.length);
//     for (let i = 0; i < this.markers.length; i++) {
//       this.markers[i].setMap(null);
//     }
//   }

//   // Deletes all markers in the array by removing references to them.
//   deleteMarkers(): void {
//     //this.setMapOnAll(null);
//     //this.markers = [];
//     // this.myObservable = new Observable((observer) => {
//     //   console.log("Observable starts..");
//     //   for(let i = 0; i < this.markers.length; i++) {
//     //     setTimeout(()=>{observer.next(this.markers[i])}, 1000);
//     //   }
//     // });
//   }

//   addLatLng(mrker: google.maps.Marker) {
//     //const path = this.poly.getPath();
//     // Because path is an MVCArray, we can simply append a new coordinate
//     // and it will automatically appear.
//     //path.push(mrker.getPosition() as google.maps.LatLng);

//     // Add a new marker at the new plotted point on the polyline.
//     var newMarker = new google.maps.Marker({
//       position: mrker.getPosition(),
//       //title: "#" + path.getLength(),
//       icon: {
//             url: './assets/imgs/drone-animated.svg',
//             anchor: new google.maps.Point(30, 30),
//             scaledSize: new google.maps.Size(60, 60)
//           },
//       map: this.map
//     });

//     this.newMarkers.push(newMarker);
  
//   }

//   pausePlay(state: string) {
//     switch(state) {
//       case 'PLAY': this.interval = setInterval(() => {
//         this.myObservable.subscribe((val) => {
//           this.addLatLng(val);
//           if(this.newMarkers.length>1) {
//             console.log(this.newMarkers);
//             this.newMarkers[this.newMarkers.length-2].setMap(null);
//           }
//         })
//       }, this.time); break;

//       case 'PAUSE': clearInterval(this.interval); break;


//     }
//   }

// }
