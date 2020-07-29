import mapboxgl from 'mapbox-gl';
import * as THREE from 'three';

export class THREELayer {
    constructor() {
        this.id = 'three-mapbox-layer';
		this.type = 'custom';
		this.renderingMode = '3d';
    }

    onAdd(map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();
		this.map = map;
        // use the Mapbox GL JS map canvas for three.js
        this.renderer = new THREE.WebGLRenderer({
            canvas: map.getCanvas(),
            context: gl,
            antialias: true
        });
		this.getMapLocation();
        this.renderer.autoClear = false;
    }

    render(gl, matrix) {
        var m = new THREE.Matrix4().fromArray(matrix);
        this.camera.projectionMatrix = m;
        this.renderer.state.reset();
        this.renderer.render(this.scene, this.camera);
    }

	convertFromLngLat(lng,lat,z){
		const position =  mapboxgl.MercatorCoordinate.fromLngLat({
			lat: parseFloat(lat),
			lng: parseFloat(lng)
		});
		const scaleZ = position.meterInMercatorCoordinateUnits();
		return new THREE.Vector3(position.x,position.y,scaleZ)
	}

}
