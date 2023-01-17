import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Ubicacion } from '../models/ubicacion';
declare var ol: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})

export class MapaComponent implements OnInit {

  u1: Ubicacion = {
    lat: 40.4165000,
    lon: -7.7025600
  }

  u2: Ubicacion = {
    lat: 40.4165000,
    lon: -2.7025600
  }

  //UNA CHINCHETA
  // @Input() latitud = 40.4165000;
  // @Input() longitud = -3.7025600;

  //MUCHAS CHINCHETAS
   /*@Input()*/ latitud = 40.4165000;
   /*@Input()*/ longitud = -7.7025600;
  @Input() ubicaciones: Ubicacion[] = [/*this.u1, this.u2*/];

  map: any;
  iniciado: boolean;
  markers: any;
  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit")
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([0, 0]),
        zoom: 8
      })
    });
    this.iniciarMarkers();

    //UNA CHINCHETA
    // this.colocarChincheta(this.latitud,this.longitud);
    // this.setCenter(this.latitud, this.longitud);


    //MUCHAS CHINCHETAS
    if (this.ubicaciones.length > 0) {
      this.ubicaciones.forEach(u => {
        this.colocarChincheta(u.lat, u.lon);
      });
      this.setCenter(this.ubicaciones[0].lat, this.ubicaciones[0].lon);
    }else{
      this.setCenter(this.latitud, this.longitud);
    }




    this.setZoom(16);
    this.iniciado = true
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.iniciado) {
      //UNA CHINCHETA
      // this.colocarChincheta(this.latitud,this.longitud);
      // this.setCenter(this.latitud, this.longitud);


      //MUCHAS CHINCHETA
      if (this.ubicaciones.length > 0) {
        this.ubicaciones.forEach(u => {
          this.colocarChincheta(u.lat, u.lon);
        });
        this.setCenter(this.ubicaciones[0].lat, this.ubicaciones[0].lon);
      }else{
        this.setCenter(this.latitud, this.longitud);
      }


      this.setZoom(15);
    }

  }

  setCenter(latitud: number, longitud: number) {
    console.log("setCenter", latitud, longitud)
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([longitud, latitud]));
    //view.setZoom(15);
  }

  setZoom(zoom: number) {
    var view = this.map.getView();
    view.setZoom(zoom);
  }

  iniciarMarkers() {
    console.log("markers");
    this.markers = new ol.layer.Vector({
      source: new ol.source.Vector(),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 1],
          scale: 0.05,
          src: 'https://cdn-icons-png.flaticon.com/512/25/25613.png'
        })
      })
    });
    this.map.addLayer(this.markers);
  }

  colocarChincheta(latitud: number, longitud: number) {
    console.log("colocarChincheta", latitud, longitud);
    var marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([longitud, latitud])));

    //COMENTAR PARA AÑADIR MAS DE UNO
    // this.markers.getSource().clear();

    this.markers.getSource().addFeature(marker);
  }

}
