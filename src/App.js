import React, { useEffect, useState } from "react";
import { Cartesian3, Color } from "cesium";
import { Viewer, Entity, PolygonGraphics , CameraFlyTo} from "resium";
import axios from "axios";
import { xml2json } from "xml-js";
function App() {
  const [position,setPosition] = useState([]);
  const  coorGenerate = (start, end ,info) => {
      var coorArray = [];
      for (var i = start; i < end; i++) {
          for (var j = 0; j < 3; j++) {
              var point = parseFloat((info.elements[0].elements[0].elements[2].elements[i].attributes.data.split(", ")[j]))
              coorArray.push(point);               
          }
      }    
      console.log(coorArray);
      return coorArray;      
  }
  useEffect(() => {
    var url =
    "https://s3.amazonaws.com/CMSTest/squaw_creek_container_info.xml" 
  axios.get(url).then(response => {
    var src = JSON.parse(
      xml2json(response.data,{} ) 
    );return src;
    }).then(src =>{
          var plgCoor0 = Cartesian3.fromDegreesArrayHeights(coorGenerate(0,7,src));
          var plgCoor1 = Cartesian3.fromDegreesArrayHeights(coorGenerate(7,14,src));
          var plgCoor2 = Cartesian3.fromDegreesArrayHeights(coorGenerate(14,18,src));
          var plgCoor3 = Cartesian3.fromDegreesArrayHeights(coorGenerate(18,22,src));
          var plgCoor4 = Cartesian3.fromDegreesArrayHeights(coorGenerate(22,25,src));
          var plgCoor5 = Cartesian3.fromDegreesArrayHeights(coorGenerate(25,28,src));
          var plgCoor6 = Cartesian3.fromDegreesArrayHeights(coorGenerate(28,31,src));
          var plgCoor7 = Cartesian3.fromDegreesArrayHeights(coorGenerate(31,34,src));    
          setPosition( [plgCoor0,plgCoor1,plgCoor2,plgCoor3,plgCoor4,plgCoor5,plgCoor6,plgCoor7])
        })
        .catch(err => console.log(err));
  },[])
	const renderPolygon = () =>{
		let plgs = null
			plgs = (	
				position.map((coor) =>{	
					return (
						<Entity description="Polygons" >
							<PolygonGraphics
								hierarchy={coor}
								perPositionHeight={true}
								material={Color.BLUE.withAlpha(0.4)}
								outline = {true}
								outlineColor = {Color.BLACK}
							/>
						</Entity>
						)
					})
				)
		return plgs;
	}
  return (
    <div>
      <Viewer full>
        {renderPolygon()}
        (<CameraFlyTo  duration={2} 
        destination={Cartesian3.fromDegrees(-93.62033081054688, 42.01864242553711, 330.75982666015625)}/> )
      </Viewer>
    </div>   
  );
}
export default App;