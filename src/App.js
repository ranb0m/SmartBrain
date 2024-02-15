import './App.css';
import { useState } from 'react';
import Authentication from './components/Authentication/Authenticaton'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import NavBar from './components/NavBar/NavBar';
import tachyons from 'tachyons';

const initializeClarifaiRequestOptions = (detectUrl) => {
      // Your PAT (Personal Access Token) can be found in the portal under Authentification
      const PAT = '1ee20e56315b4a268cbbf3580e3829a7';
      // Specify the correct user_id/app_id pairings
      // Since you're making inferences outside your app's scope
      const USER_ID = 'ranbom';       
      const APP_ID = 'my-first-application-sc6qdt';
      // Change these to whatever model and image URL you want to use
      const MODEL_ID = 'face-detection';
      const IMAGE_URL = detectUrl;

      const raw = JSON.stringify({
          "user_app_id": {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          "inputs": [
              {
                  "data": {
                      "image": {
                          "url": IMAGE_URL
                      }
                  }
              }
          ]
      });
  
      const requestOptions = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' + PAT
          },
          body: raw
      };
      
      return requestOptions
};


        

function App() {
  const [detectUrl, setDetectUrl] = useState('')
  const [boxes, setBoxes] = useState([])
  const [route, setRoute] = useState('sign-in')
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  })

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined
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
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", initializeClarifaiRequestOptions(detectUrl))
        .then(response => response.json())
        .then(resp => {
          if (resp) {
            fetch("http://localhost:3000/image", {
              method: "put",
              headers: {'Content-Type': "application/json"},
              body: JSON.stringify({
                id: user.id
              })
            })
            .then(response => response.json())
            .then(data => {
              if (data) {
                loadUser(data)
              }
            }).catch(console.error)
            displayFaceboxes(faceDetection(resp))
          }
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
    <NavBar route={route} onRouteChange={onRouteChange} />
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

// logic
// submit onclick (for register) => send to server,
// server checks database to see if userinfo is there, 
// if yes, display user already registered element
// if no, add to database and change to route screen

//submit onclick (for route) => send to server,
// server checks database to see if username is there
//    if yes, check to see if passwords match
//       if passwords match, display next screen 
//    if no, display error user not found


