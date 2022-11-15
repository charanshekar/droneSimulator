import { DroneServiceService } from './../drone-service.service';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild("fileInput", {static: false})
  fileInputVar: ElementRef;

  hide:boolean = false;

  addMarker = this.droneService.addHandler;
  markers = this.droneService.markers;
  index = this.droneService.index;
  droneObservable = this.droneService.myObservable;

  constructor(public droneService:DroneServiceService) {}

  ngOnInit(): void {  }

  onClickedLocation($event:any) {
    const timestamp = new Date();
    this.addMarker($event.coords.lat, $event.coords.lng, timestamp);
  }

  /////// BUTTON LOGIC
  onClear(){
        this.markers=[];
        this.hide=false;
        this.index=0;
        this.fileInputVar.nativeElement.value = "";
        this.droneService.drone = {
          lat: -111,
          lng: -111,
          timestamp: null
        };  
        if(this.droneService.interval) clearInterval(this.droneService.interval);
  }

  onSimulate() {
    this.markers = this.markers.sort(function(a, b) { return a.timestamp - b.timestamp; });
    this.hide = true;
    this.onPlay();
  }

  onPlay() {
      this.droneService.interval = setInterval(() => {
          this.droneObservable.next(this.markers[this.index]);
          if(this.index < this.markers.length) this.index++;;
        }, this.droneService.time);
  }

  onPause() {
    clearInterval(this.droneService.interval);
  }


  ngOnDestroy(){
    if(this.droneService.interval) clearInterval(this.droneService.interval);
    this.droneObservable.unsubscribe();
  }

}

