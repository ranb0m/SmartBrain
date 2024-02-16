import './App.css';
import { useState } from 'react';
import Authentication from './components/Authentication/Authenticaton'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import NavBar from './components/NavBar/NavBar';
import tachyons from 'tachyons';
        

function App() {
  const [detectUrl, setDetectUrl] = useState('')
  const [boxes, setBoxes] = useState([])
  const [route, setRoute] = useState('sign-in')
  const [user, setUser] = useState({
    name: '',
    email: '',
    entries: 0,
    joined: ''
  })

  const loadUser = (data) => {
    setUser({
      name: data.name,
      email: data.email,
      entries: data.entries,
      rank: data.rank
    });
  }


  const faceDetection = (data) => {
    const regions = data.outputs[0].data.regions;
    const boxesContainer = [];
    const image = document.getElementById('fimage');
    const width = image.clientWidth;
    const height = image.clientHeight;
    
    for (const region of regions) {
        const boxobj = region.region_info.bounding_box;
        boxesContainer.push({
            id: regions.indexOf(region),
            leftCol: boxobj.left_col * width,
            topRow: boxobj.top_row * height,
            rightCol: width - (boxobj.right_col * width),
            bottomRow: height - (boxobj.bottom_row * height)
        }) 
    }
    return boxesContainer;
  }

  const displayFaceboxes = (boxes) => {
    setBoxes([...boxes]);
  }

  const handleOnChange = (event) => {
    setDetectUrl(event.target.value)
  };
  
  const onButtonSubmit = () => {
      fetch("http://localhost:3000/imageurl", {
        method: "post",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify({
          detectUrl: detectUrl
        })
      })
        .then(response => response.json())
        .then(resp => {
          console.log(resp)
          if (resp) {
            fetch("http://localhost:3000/image", {
              method: "put",
              headers: {'Content-Type': "application/json"},
              body: JSON.stringify({
                email: user.email
              })
            })
            .then(response => response.json())
            .then(data => {
              if (data) {
                loadUser(data)
              }
            }).catch(console.error)
          }
          displayFaceboxes(faceDetection(resp))
        })
        .catch(err => console.log(err))
  }

  const onRouteChange = (input) => {
    setRoute(input);
  }

  return (
    <>
    <div className="full-page-container">
    <div className='content-container content'>
    <NavBar route={route} onRouteChange={onRouteChange} setBoxes={setBoxes} setDetectUrl={setDetectUrl} setUser={setUser} />
    {(route === 'sign-in' || route === 'registration') ? <Authentication  onRouteChange={onRouteChange} route={route} loadUser={loadUser} user={user} /> :
    <>
    <Rank user={user} />
    <ImageLinkForm detectUrl={detectUrl} handleOnChange={handleOnChange} onButtonSubmit={onButtonSubmit}/>
    <FaceRecognition boxes={boxes} imageSrc={detectUrl} />
    </>
    }
    </div>
    </div>
    </>
    
  );
}

export default App;



