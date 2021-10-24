const express = require("express");
const fs = require("fs");
const app = express();
const http = require("http");
const server = http.createServer(app);
const bodyParser = require("body-parser");
const { model } = require("mongoose");
const path = require('path');
const dotenv = require("dotenv");
dotenv.config(); 
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/', express.static('client/React/build'));
app.use('/', express.static('client/Angular/dist'));

const MovieSchema = new mongoose.Schema({
  name: String,
  category: String,
  grade: Number,
  imgurl: String,
},{collection:'movies'});

const Movie= mongoose.model("Movie",MovieSchema);

const connectDb = () => {    
  const db_address=process.env.DB_ADDRESS;
  // const db_address=process.env.LOCAL_DB;
    return mongoose.connect(
      db_address,
      { useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,}
    ).catch(err => console.log(err));
  };

  connectDb().then(() => {
    const port = process.env.PORT || 8000;
    server.listen(port, () => {
      console.log(`Top10 app listening on port ${port}!`);
    });
  }); 


//   app.get("/Movies/angular", async (req, res) => {
//     let movies = await Movie.find().sort({ grade: 1 }).exec();
//     res.send(movies);      
// })


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/React/build/index.html'));
// });


app.get("/Movies/angular/Search", async (req, res) => {
  const search = req.query.search;
  let movies = [];
  if (search) {
    movies = await Movie.find({
      category: search
    }).sort({ grade: 1 }).exec();
  } else {
    movies = await Movie.find().sort({ grade: 1 }).exec();
  }
  res.send(movies);      
})


app.post("/Movies/angular/Add", async (req, res) => {
  let movie=req.body.data;
  console.log(movie);
  movie.grade=parseInt(movie.grade);

  let movies = await Movie.find().sort({ grade: 1 }).exec();
  await Movie.findOneAndDelete({grade:movies[movies.length-1].grade}).exec();

  let sameGrade=await Movie.findOne({grade:movie.grade}).exec();
  console.log(sameGrade);
  let newSame={name:sameGrade.name,category:sameGrade.category,grade:sameGrade.grade,imgurl:sameGrade.imgurl};
  await Movie.findOneAndDelete({grade:movie.grade}).exec(); 

  const newMovie= await new Movie(movie);
  await newMovie.save();

  const returnMovie=await new Movie(newSame);
  await returnMovie.save();   

  movies = await Movie.find().sort({ grade: 1 }).exec();
  for (i=0;i<movies.length;i++){
    for (j=i+1;j<movies.length;j++){
      if (movies[i].grade===movies[j].grade){
        movies[j].grade++
      }
    }
  }
  await Movie.deleteMany({}).exec();
  await Movie.collection.insertMany(movies);
  console.log(movies)

  res.send(movies);
})

app.put("/Movies/angular/Update", async (req, res) => {
  let movie=req.body.data;
      movie.grade=parseInt(movie.grade);

      let initMovie=await Movie.findOne({name:movie.name}).exec();
      let movies = await Movie.find().sort({ grade: 1 }).exec();
      
      for (i=0;i<movies.length;i++){
       if(movie.grade>initMovie.grade)
        {
          if (movies[i].grade<=movie.grade && movies[i].grade>initMovie.grade){
          await Movie.findOneAndUpdate({grade:movies[i].grade},{grade:movies[i].grade-1})
        }       
        }
        else if (movie.grade<initMovie.grade) {
          if (movies[i].grade>=movie.grade && movies[i.grade<initMovie.grade]){
            await Movie.findOneAndUpdate({grade:movies[i].grade},{grade:movies[i].grade+1})
          }
        }
      }      
      await Movie.findOneAndUpdate({name:movie.name},{category:movie.category,grade:movie.grade,imgurl:movie.imgurl});
      movies = await Movie.find().sort({ grade: 1 }).exec();

      res.send(movies);
    })

    app.get("/Movies/Search", async (req, res) => {
        const search = req.query.search;
        console.log(search)
        let movies = [];
        if (search) {
          movies = await Movie.find({
            category: search
          }).sort({ grade: 1 }).exec();
        } else {
          movies = await Movie.find().sort({ grade: 1 }).exec();
        }
        
        res.send(movies);      
    })

    app.post("/Movies/Add", async (req, res) => {
      let movie=req.body;
      movie.grade=parseInt(movie.grade);

      let movies = await Movie.find().sort({ grade: 1 }).exec();
      await Movie.findOneAndDelete({grade:movies[movies.length-1].grade}).exec();

      let sameGrade=await Movie.findOne({grade:movie.grade}).exec();
      let newSame={name:sameGrade.name,category:sameGrade.category,grade:sameGrade.grade,imgurl:sameGrade.imgurl};
      await Movie.findOneAndDelete({grade:movie.grade}).exec(); 

      const newMovie= await new Movie(req.body);
      await newMovie.save();

      const returnMovie=await new Movie(newSame);
      await returnMovie.save();   

      movies = await Movie.find().sort({ grade: 1 }).exec();
      for (i=0;i<movies.length;i++){
        for (j=i+1;j<movies.length;j++){
          if (movies[i].grade===movies[j].grade){
            movies[j].grade++
          }
        }
      }
      await Movie.deleteMany({}).exec();
      await Movie.collection.insertMany(movies);

      console.log(movies)
      res.send(movies);
    })

    app.put("/Movies/Update", async (req, res) => {
      let movie=req.body;
      movie.grade=parseInt(movie.grade);

      let initMovie=await Movie.findOne({name:movie.name}).exec();
      let movies = await Movie.find().sort({ grade: 1 }).exec();
      
      for (i=0;i<movies.length;i++){
       if(movie.grade>initMovie.grade)
        {
          if (movies[i].grade<=movie.grade && movies[i].grade>initMovie.grade){
          await Movie.findOneAndUpdate({grade:movies[i].grade},{grade:movies[i].grade-1})
        }
        }
        else if (movie.grade<initMovie.grade) {
          if (movies[i].grade>=movie.grade && movies[i.grade<initMovie.grade]){
            await Movie.findOneAndUpdate({grade:movies[i].grade},{grade:movies[i].grade+1})
          }
        }
      }      
      
      await Movie.findOneAndUpdate({name:movie.name},{category:movie.category,grade:movie.grade,imgurl:movie.imgurl})
      movies = await Movie.find().sort({ grade: 1 }).exec();

      res.send(movies);
    })
    
   
        




  // movies =[
  //   {
  //       "name": "Joker",
  //       "category": "Suspense",
  //       "grade": 10,
  //       "imgurl": "https://upload.wikimedia.org/wikipedia/he/thumb/8/89/Joker-2019-Heb-Poster.jpg/330px-Joker-2019-Heb-Poster.jpg"
  //     },
  //     {
  //       "name": "Lion king",
  //       "category": "Drama",
  //       "grade": 9,
  //       "imgurl": "https://upload.wikimedia.org/wikipedia/he/thumb/b/b5/%D7%9E%D7%9C%D7%9A_%D7%94%D7%90%D7%A8%D7%99%D7%95%D7%AA_%D7%9B%D7%A8%D7%96%D7%94_%D7%A2%D7%91%D7%A8%D7%99%D7%AA_%D7%9E%D7%A7%D7%95%D7%A8%D7%99%D7%AA.png/375px-%D7%9E%D7%9C%D7%9A_%D7%94%D7%90%D7%A8%D7%99%D7%95%D7%AA_%D7%9B%D7%A8%D7%96%D7%94_%D7%A2%D7%91%D7%A8%D7%99%D7%AA_%D7%9E%D7%A7%D7%95%D7%A8%D7%99%D7%AA.png"
  //     },
  //     {
  //       "name": "Rabbi Jacob",
  //       "category": "Comedy",
  //       "grade": 8,
  //       "imgurl": "https://upload.wikimedia.org/wikipedia/he/thumb/2/2b/Rabbi_Jacob.jpg/330px-Rabbi_Jacob.jpg"
  //     },
  //     {
  //       "name": "The Good, the Bad and the Ugly",
  //       "category": "Drama",
  //       "grade": 7,
  //       "imgurl": "https://upload.wikimedia.org/wikipedia/he/c/c8/El_bueno_elfeo01.jpg"
  //     },
  //     {
  //       "name": "Snooker celebration",
  //       "category": "Comedy",
  //       "grade": 6,
  //       "imgurl": "https://upload.wikimedia.org/wikipedia/he/b/b3/Snuker_kraza.jpg"
  //     },
  //     {
  //       "name": "Olympus Has Fallen",
  //       "category": "Action",
  //       "grade": 5,
  //       "imgurl": "https://upload.wikimedia.org/wikipedia/he/thumb/5/54/Olympus_Has_Fallen.jpg/300px-Olympus_Has_Fallen.jpg"
  //     },
  //     {
  //       "name": "resistance",
  //       "category": "Action",
  //       "grade": 4,
  //       "imgurl": "https://upload.wikimedia.org/wikipedia/he/thumb/5/5e/Defianceposter08.jpg/300px-Defianceposter08.jpg"
  //     },
  //     {
  //       "name": "The Godfather",
  //       "category": "Drama",
  //       "grade": 3,
  //       "imgurl": "https://upload.wikimedia.org/wikipedia/he/thumb/7/7b/TheGodfather.jpg/300px-TheGodfather.jpg"
  //     },
  //     {
  //       "name": "Back to the Future",
  //       "category": "Science Fiction",
  //       "grade": 2,
  //       "imgurl": "https://upload.wikimedia.org/wikipedia/he/thumb/8/80/Back_to_the_Future_-_The_Musical.jpg/250px-Back_to_the_Future_-_The_Musical.jpg"
  //     },
  //     {
  //       "name": "The culprits",
  //       "category": "Suspense",
  //       "grade": 1,
  //       "imgurl": "https://upload.wikimedia.org/wikipedia/he/9/90/TheGuilty1.jpg"
  //     }]

      
  // Movie.deleteMany({}).exec().then(()=>{
  //   Movie.collection.insertMany(movies, function (err, docs) {
  //       if (err){ 
  //           return console.error(err);
  //       } else {
  //         console.log("Multiple documents inserted to Collection");
  //       }
  //             });
  // })
  

