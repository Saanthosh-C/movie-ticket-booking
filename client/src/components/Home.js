import React from "react";
import "../styles.css";

const movies = [
  {
    name: "Pushpa 2",
    screen: 1,
    image:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@like_202006280402.png,lx-24,ly-617,w-29,l-end:l-text,ie-MS45TSBMaWtlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00356724-cyrbaqmhav-portrait.jpg",
  },
  {
    name: "Sorgavaasal",
    screen: 2,
    image:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC4xLzEwICAxLjRLIFZvdGVz,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00420051-jpqvjrpsba-portrait.jpg",
  },
  {
    name: "Kanguva",
    screen: 3,
    image:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-Ni41LzEwICAxMTkuNEsgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00357490-rbnbbvkdlp-portrait.jpg",
  },
];

const showtimes = ["9:00 AM", "1:00 PM", "5:00 PM", "9:00 PM"];

const Home = ({ onBook }) => {
  return (
    <div className="home">
      <h1 className="heading">My Show</h1>
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {movies.map((movie) => (
          <div key={movie.screen}>
            <h2 className="title">{movie.name}</h2>
            <p className="title">Screen: {movie.screen}</p>

            <div className="movie-card">
              <img className="image" src={movie.image} />
            </div>
            <ul className="showtimes-grid">
              {showtimes.map((time) => (
                <li key={time} className="time">
                  <button
                    className="btn"
                    onClick={() => onBook(movie.name, movie.screen, time)}
                  >
                    Book {time}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
