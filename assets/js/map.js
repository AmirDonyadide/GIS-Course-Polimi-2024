import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import { Map, View, Overlay } from 'ol';
import { Tile, Image, Group, Vector } from 'ol/layer';
import { OSM, ImageWMS, BingMaps, StadiaMaps } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { fromLonLat } from 'ol/proj';
import { ScaleLine, FullScreen, MousePosition } from 'ol/control';
import LayerSwitcher from 'ol-layerswitcher';
import { createStringXY } from 'ol/coordinate';
import { Style, Stroke } from 'ol/style';

let osm = new Tile({
    title: "Open Street Map",
    type: "base",
    visible: true,
    source: new OSM()
});

var Landslide_Susceptibility = new Image({
    title: "Landslide Susceptibility",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_13/wms',
        params: { 'LAYERS': 'gisgeoserver_13:LandslideSusceptibilityMap' }
    }),
    opacity: 0.7
});

var population = new Image({
    title: "population",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_13/wms',
        params: { 'LAYERS':'gisgeoserver_13:POPULATION' }
    }),
    opacity: 0.7
});

var aspect = new Image({
    title: "aspect",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_13/wms',
        params: { 'LAYERS':'gisgeoserver_13:aspect' }
    }),
    opacity: 0.7
});

var slope = new Image({
    title: "slope",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_13/wms',
        params: { 'LAYERS':'gisgeoserver_13:slope' }
    }),
    opacity: 0.7
});

var road = new Image({
    title: "roads",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_13/wms',
        params: { 'LAYERS':'gisgeoserver_13:road' }
    }),
    opacity: 0.7
});

var river = new Image({
    title: "rivers",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_13/wms',
        params: { 'LAYERS':'gisgeoserver_13:river' }
    }),
    opacity: 0.7
});

var reclassified_susceptibility = new Image({
    title: "reclassified_susceptibility",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_13/wms',
        params: { 'LAYERS':'gisgeoserver_13:classified' }
    }),
    opacity: 0.7
});

var confidence = new Image({
    title: "confidence",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_13/wms',
        params: { 'LAYERS':'gisgeoserver_13:confidence' }
    }),
    opacity: 0.7
});

var dtm = new Image({
    title: "dtm",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_13/wms',
        params: { 'LAYERS':'gisgeoserver_13:dtm' }
    }),
    opacity: 0.7
});

var dusaf = new Image({
    title: "dusaf",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_13/wms',
        params: { 'LAYERS':'gisgeoserver_13:dusaf' }
    }),
    opacity: 0.7
});

var faults = new Image({
    title: "faults",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_13/wms',
        params: { 'LAYERS':'gisgeoserver_13:faults' }
    }),
    opacity: 0.7
});

var ndvi = new Image({
    title: "ndvi",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_13/wms',
        params: { 'LAYERS':'gisgeoserver_13:ndvi' }
    }),
    opacity: 0.7
});

var plan = new Image({
    title: "plan",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_13/wms',
        params: { 'LAYERS':'gisgeoserver_13:plan' }
    }),
    opacity: 0.7
});

var profile = new Image({
    title: "profile",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_13/wms',
        params: { 'LAYERS':'gisgeoserver_13:profile' }
    }),
    opacity: 0.7
});

var susceptibility_reclassified_resampled = new Image({
    title: "susceptibility_reclassified_resampled",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_13/wms',
        params: { 'LAYERS':'gisgeoserver_13:susceptibility_reclassified_resampled' }
    }),
    opacity: 0.7
});
var Testing_points = new Image({
    title: "Testing Points",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_13/wms',
        params: { 'LAYERS': 'gisgeoserver_13:testing_points_sample' }
    }),
    opacity: 1
});

var Training_points = new Image({
    title: "Training Points",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_13/wms',
        params: { 'LAYERS': 'gisgeoserver_13:training_points_sample' }
    }),
    opacity: 1
});

//Create the layer groups and add the layers to them
let basemapLayers = new Group({
    title: "Base Maps",
    layers: [osm]
});

let overlayLayers = new Group({
    title: "Overlay Layers",
    layers: [Landslide_Susceptibility,population,aspect,slope,road,river,reclassified_susceptibility,confidence,dtm,dusaf,faults,ndvi,plan,profile,susceptibility_reclassified_resampled,Testing_points,Training_points]

})

var initialVisibleLayers = [Testing_points, Training_points];
overlayLayers.getLayers().forEach(layer => {
    if (initialVisibleLayers.includes(layer)) {
        layer.setVisible(true);
    } else {
        layer.setVisible(false);
    }
});

// Map Initialization
let map = new Map({
    target: document.getElementById('map'),
    layers: [basemapLayers, overlayLayers],
    view: new View({
        center: fromLonLat([10, 45.86]),
        zoom: 12
    })
});

// Add the map controls:
map.addControl(new ScaleLine()); //Controls can be added using the addControl() map function
map.addControl(new FullScreen());
map.addControl(
    new MousePosition({
        coordinateFormat: createStringXY(4),
        projection: 'EPSG:4326',
        className: 'custom-control',
        placeholder: '0.0000, 0.0000'
    })
);

var layerSwitcher = new LayerSwitcher({});
map.addControl(layerSwitcher);

//Add the Bing Maps layers
var BING_MAPS_KEY = "AqbDxABFot3cmpxfshRqLmg8UTuPv_bg69Ej3d5AkGmjaJy_w5eFSSbOzoHeN2_H";
var bingRoads = new Tile({
    title: 'Bing Maps—Roads',
    type: 'base',
    visible: false,
    source: new BingMaps({
        key: BING_MAPS_KEY,
        imagerySet: 'Road'
    })
});
var bingAerial = new Tile({
    title: 'Bing Maps—Aerial',
    type: 'base',
    visible: false,
    source: new BingMaps({
        key: BING_MAPS_KEY,
        imagerySet: 'Aerial'
    })
});
basemapLayers.getLayers().extend([bingRoads, bingAerial]);