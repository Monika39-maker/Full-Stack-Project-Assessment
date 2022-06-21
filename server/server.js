const express = require("express");
const app = express();
const uuid = require('uuid');
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [
  {
    "id": 523523,
    "title": "Never Gonna Give You Up",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "rating": 23
  },
  {
    "id": 523427,
    "title": "The Coding Train",
    "url": "https://www.youtube.com/watch?v=HerCR8bw_GE",
    "rating": 230
  },
  {
    "id": 82653,
    "title": "Mac & Cheese | Basics with Babish",
    "url": "https://www.youtube.com/watch?v=FUeyrEN14Rk",
    "rating": 2111
  },
  {
    "id": 858566,
    "title": "Videos for Cats to Watch - 8 Hour Bird Bonanza",
    "url": "https://www.youtube.com/watch?v=xbs7FT7dXYc",
    "rating": 11
  },
  {
    "id": 453538,
    "title": "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
    "url": "https://www.youtube.com/watch?v=4As0e4de-rI",
    "rating": 3211
  },
  {
    "id": 283634,
    "title": "Learn Unity - Beginner's Game Development Course",
    "url": "https://www.youtube.com/watch?v=gB1F9G0JXOo",
    "rating": 211
  },
  {
    "id": 562824,
    "title": "Cracking Enigma in 2021 - Computerphile",
    "url": "https://www.youtube.com/watch?v=RzWB5jL5RX0",
    "rating": 111
  },
  {
    "id": 442452,
    "title": "Coding Adventure: Chess AI",
    "url": "https://www.youtube.com/watch?v=U4ogK0MIzqk",
    "rating": 671
  },
  {
    "id": 536363,
    "title": "Coding Adventure: Ant and Slime Simulations",
    "url": "https://www.youtube.com/watch?v=X-iSQQgOd1A",
    "rating": 76
  },
  {
    "id": 323445,
    "title": "Why the Tour de France is so brutal",
    "url": "https://www.youtube.com/watch?v=ZacOS8NBK6U",
    "rating": 73
  }
];



app.get("/", (req, res) => {
  res.send(videos);
});

// add videos 
app.post("/", (req, res) => {
  const title = req.body.title;
  const url = req.body.url;
  const id = uuid.v4()
  if(!req.body.title === undefined || req.body.url === undefined || req.body.title === "" || req.body.url === "") {
    res.status(400)
    return res.json({"result": "failure", "message": "Video could not be saved"});
  }
  console.log(req.body.title)
  videos.push({
    id:id,
    title:title,
    url:url
  })
  res.send(id);
});

//filter video by id
app.get('/:id', (req, res) => {
  const filteredData = videos.filter(vid => vid.id == req.params.id)
  res.send(filteredData)
});

//delete a video by id
app.delete('/:id', (req, res) => {
  if (!req.params.id) {
    res.json({
  "result": "failure",
  "message": "Video could not be deleted"
})
  }
  const filteredData = videos.filter(vid => vid.id != req.params.id)
  res.send(filteredData)
});

