import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Aparcamiento } from '../models/aparcamiento';
import { Ubicacion } from '../models/ubicacion';
import { AparcamientoService } from '../services/aparcamiento.service';
declare var ol: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})

export class MapaComponent implements OnInit {

  //UNA CHINCHETA
  @Input() latitud = 36.72016;
  @Input() longitud = -4.42034;

  //MUCHAS CHINCHETAS
  //  /*@Input()*/ latitud = 36.72016;
  //  /*@Input()*/ longitud = -4.42034;
  // @Input() ubicaciones: Ubicacion[];

  map: any;
  iniciado: boolean;
  markers: any;

  aparcamientosList: Aparcamiento[] = [];
  ubicacion:Ubicacion = {
    lat: 20.4165000,
    lon: -2.7025600
  }

  constructor(private aparcamientosService: AparcamientoService) { }

  ngOnInit(): void {
    console.log("ngOnInit")

    this.aparcamientosService.getAparcamientos()
      .subscribe(data => {
        this.aparcamientosList = data;

        // this.aparcamientosList.forEach(aparcamiento => {
        //   this.ubicacion.lat = aparcamiento.latitud;
        //   this.ubicacion.lon = aparcamiento.longitud;
        //   this.ubicaciones.push(this.ubicacion);
        // });
      

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
    this.colocarChincheta(this.latitud,this.longitud);
    this.setCenter(this.latitud, this.longitud);


    //MUCHAS CHINCHETAS
    // console.log(this.ubicaciones);
    // if (this.ubicaciones.length > 0) {
    //   this.ubicaciones.forEach(u => {
    //     this.colocarChincheta(u.lat, u.lon);
    //   });
    //   this.setCenter(this.ubicaciones[0].lat, this.ubicaciones[0].lon);
    // }else{
    //   this.setCenter(this.latitud, this.longitud);
    // }




    this.setZoom(16);
    this.iniciado = true;
  });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.iniciado) {
      //UNA CHINCHETA
      this.colocarChincheta(this.latitud,this.longitud);
      this.setCenter(this.latitud, this.longitud);


      //MUCHAS CHINCHETA
      // console.log(this.ubicaciones);
      // if (this.ubicaciones.length > 0) {
      //   this.ubicaciones.forEach(u => {
      //     this.colocarChincheta(u.lat, u.lon);
      //   });
      //   this.setCenter(this.ubicaciones[0].lat, this.ubicaciones[0].lon);
      // }else{
      //   this.setCenter(this.latitud, this.longitud);
      // }


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
    this.markers.getSource().clear();

    this.markers.getSource().addFeature(marker);
  }

}
