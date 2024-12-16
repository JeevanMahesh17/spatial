// import React from 'react';  
// import MapContainer from './components/MapContainer';  

// const App = () => {  
//   return (  
//     // <div className="App">  
//     //   <header className="App-header">  
//     //     <h1>Spatial Data Map</h1>  
//     //   </header>  
//     //   <MapContainer />  
//     // </div>  
//     <div className="App">
//     <header className="App-header" style={{ textAlign: 'center', backgroundColor: 'grey' }}>
//         <h1>Spatial Data Map</h1>
//     </header>
//     <MapContainer />
// </div>
//   );  
// };  

// export default App;  

import React from "react";
import MapComponent from "./components/MapContainer";

function App() {
  return (
    <div>
      <h1>Spatial Data Platform</h1>
      <MapComponent />
    </div>
  );
}

export default App;
