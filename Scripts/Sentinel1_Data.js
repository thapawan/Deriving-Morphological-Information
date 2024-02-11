// Define the coordinates for the M3 Tombigbee River near Demopolis.
var M3 = ee.Geometry.Polygon([[-87.836, 32.517], [-87.834, 32.509], [-87.819, 32.509], [-87.817, 32.517]]);

// Define the coordinates for the M8 Mobile River.
var M8 = ee.Geometry.Polygon([[-88.043, 31.018], [-88.041, 31.010], [-88.026, 31.010], [-88.024, 31.018]]);

//To get Sentinel 1 images for M3
var M3Site = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterDate('2023-01-01', '2023-12-31')
    .filterBounds(M3)
    .median();

//To get Sentinel 1 images for M8
var M8Site = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterDate('2023-01-01', '2023-12-31')
    .filterBounds(M8)
    .median();

//Display the images    
Map.addLayer(M3Site, {bands: ['VH', 'VV'], max: 0.3}, 'M3Site');
Map.addLayer(M8Site, {bands: ['VH', 'VV'], max: 0.3}, 'M8Site');

// Set a threshold value
var threshold = -18;

// Apply the threshold to the VH band
var M3_water = M3Site.select('VH').lt(threshold);
var M8_water = M8Site.select('VH').lt(threshold);

// Display the water bodies
Map.addLayer(M3_water, {min: 0, max: 1, palette: ['white', 'blue']}, 'M3 Water');
Map.addLayer(M8_water, {min: 0, max: 1, palette: ['white', 'blue']}, 'M8 Water');

