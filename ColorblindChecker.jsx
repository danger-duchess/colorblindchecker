#target photoshop

var srcDoc = app.activeDocument;

var layerNum = srcDoc.layers.length;
var doccolor = app.foregroundColor;
app.preferences.rulerUnits = Units.PIXELS;  
app.preferences.typeUnits = TypeUnits.PIXELS;  
var borderColor = new SolidColor();
borderColor.rgb.hexValue= "000000";

for (var i = layerNum -1; i >= 0; i--)
{
  var currentLayer = srcDoc.layers[i];
  
  // Select the layers as you go 
  srcDoc.activeLayer = srcDoc.artLayers[i];

  if(srcDoc.activeLayer.kind == LayerKind.TEXT){
    textcolor = srcDoc.activeLayer.textItem.color;
    size = srcDoc.activeLayer.textItem.font.size;
   
    var contrastRatio = contrast(textcolor.rgb, doccolor.rgb);
  
    if(contrastRatio < 3 && size >= 19 && size >= 24){
      
      strokeLayer(borderColor, 7);
    }
    else if (contrastRatio < 4.5 && size < 19 ){
      strokeLayer(borderColor, 7);
    }
  }

}




// function from https://stackoverflow.com/a/9733420/3695983                     
function luminance(r, g, b) {
  var colorArray = [r, g, b];
    var colorFactor;
    var i;
    for (i = 0; i < colorArray.length - 1; i++) {
        colorFactor = colorArray[i] / 255;
        if (colorFactor <= 0.03928) {
            colorFactor = colorFactor / 12.92;
        } else {
            colorFactor = Math.pow(((colorFactor + 0.055) / 1.055), 2.4);
        }
        colorArray[i] = colorFactor;
    }
    return (colorArray[0] * 0.2126 + colorArray[1] * 0.7152 + colorArray[2] * 0.0722);
}

function contrast(color1, color2) {
  var lum1 = luminance(color1.red, color1.green, color1.blue);
  var lum2 = luminance(color2.red,color2.green, color2.blue);
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}
function strokeLayer(colour,size){  

  try{  
  
  var d=new ActionDescriptor();  
  
  var r=new ActionReference();  
  
  r.putProperty(stringIDToTypeID("property"), stringIDToTypeID("layerEffects"));  
  
  r.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));  
  
  d.putReference(stringIDToTypeID("null"), r);  
  
  var d1=new ActionDescriptor();  
  
  d1.putUnitDouble(stringIDToTypeID("scale"), stringIDToTypeID("percentUnit"), 416.666666666667);  
  
  var d2=new ActionDescriptor();  
  
  d2.putBoolean(stringIDToTypeID("enabled"), true);  
  
  d2.putBoolean(stringIDToTypeID("present"), true);  
  
  d2.putBoolean(stringIDToTypeID("showInDialog"), true);  
  
  d2.putEnumerated(stringIDToTypeID("style"), stringIDToTypeID("frameStyle"), stringIDToTypeID("outsetFrame"));  
  
  d2.putEnumerated(stringIDToTypeID("paintType"), stringIDToTypeID("frameFill"), stringIDToTypeID("solidColor"));  
  
  d2.putEnumerated(stringIDToTypeID("mode"), stringIDToTypeID("blendMode"), stringIDToTypeID("normal"));  
  
  d2.putUnitDouble(stringIDToTypeID("opacity"), stringIDToTypeID("percentUnit"), 100);  
  
  d2.putUnitDouble(stringIDToTypeID("size"), stringIDToTypeID("pixelsUnit"), size);  
  
  var d3=new ActionDescriptor();  
  
  d3.putDouble(stringIDToTypeID("red"), colour.rgb.red);  
  
  d3.putDouble(stringIDToTypeID("green"), colour.rgb.green);  
  
  d3.putDouble(stringIDToTypeID("blue"), colour.rgb.blue);  
  
  d2.putObject(stringIDToTypeID("color"), stringIDToTypeID("RGBColor"), d3);  
  
  d2.putBoolean(stringIDToTypeID("overprint"), false);  
  
  d1.putObject(stringIDToTypeID("frameFX"), stringIDToTypeID("frameFX"), d2);  
  
  d.putObject(stringIDToTypeID("to"), stringIDToTypeID("layerEffects"), d1);  
  
  executeAction(stringIDToTypeID("set"), d, DialogModes.NO);  
  
  }catch(e){}  
  
  }; 