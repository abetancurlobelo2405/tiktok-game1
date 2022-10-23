import logo from "./logo.svg";
import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import basicKmUp from "./sounds/basicKmUp.mp4";
import mediumKmUp from "./sounds/mediumKmUp.mp4";
import topKmUP from "./sounds/topKmUp.mp4";
import superKmUp from "./sounds/superKmUp.mp4";
import hyperKmUp from "./sounds/hyperKmUp.mp4";
import universalKmUp from "./sounds/universalKmUp.mp4";

const socket = io.connect("https://tiktokgamesbackend.herokuapp.com/");
function App() {
  const [count, setCount] = useState(1);
  const basicKmAudio = useRef();
  const mediumKmAudio = useRef();
  const topKmAudio = useRef();
  const superKmAudio = useRef();
  const hyperKmAudio = useRef();
  const universalKmAudio = useRef();

  const [kmDisplayTotal, setKmDisplayTotal] = useState({
    km: 0,
    user: "",
    image: "",
    repeat: 0,
  });

  const disconnectUser = () => {
    socket.emit("disconnectClient");
  };

  const submitUser = (event) => {
    event.preventDefault();
    socket.emit("setUniqueId", event.target.text.value);
  };

  useEffect(() => {
    setTimeout(() => {
      setCount((prevCount) => prevCount + 1);
    }, 50);
  }, [count]);

  useEffect(() => {
    socket.on("gift", (data) => {
      if (data.repeatEnd) {
        // Streak ended or non-streakable gift => process the gift with final repeat_count
        console.log(
          `${data.uniqueId} has sent gift ${data.giftName} x${data.repeatCount}`
        );

        if (data.diamondCount === 1) {
          const audio = basicKmAudio?.current;
          audio.volume = 0.1;
          audio.play();

          const oneCoinTotalKm = data.repeatCount * 10000;
          setCount((newCount) => newCount + 10000 * data.repeatCount);
          setKmDisplayTotal({
            ...kmDisplayTotal,
            km: oneCoinTotalKm,
            user: data.uniqueId,
            image: data.giftPictureUrl,
            repeat: data.repeatCount,
          });
        }

        if (data.diamondCount >= 5 && data.diamondCount <= 10) {
          const audio = basicKmAudio?.current;
          audio.volume = 0.1;
          audio.play();

          const oneCoinTotalKm = data.repeatCount * 60000;
          setCount((newCount) => newCount + 60000 * data.repeatCount);
          setKmDisplayTotal({
            ...kmDisplayTotal,
            km: oneCoinTotalKm,
            user: data.uniqueId,
            image: data.giftPictureUrl,
            repeat: data.repeatCount,
          });
        }

        if (data.diamondCount >= 20 && data.diamondCount <= 49) {
          const audio = mediumKmAudio?.current;
          audio.volume = 0.15;
          audio.play();

          const oneCoinTotalKm = data.repeatCount * 320000;
          setCount((newCount) => newCount + 320000 * data.repeatCount);
          setKmDisplayTotal({
            ...kmDisplayTotal,
            km: oneCoinTotalKm,
            user: data.uniqueId,
            image: data.giftPictureUrl,
            repeat: data.repeatCount,
          });
        }

        if (data.diamondCount >= 99 && data.diamondCount <= 100) {
          const audio = topKmAudio?.current;
          audio.volume = 0.2;
          audio.play();

          const oneCoinTotalKm = data.repeatCount * 7500000;
          setCount((newCount) => newCount + 7500000 * data.repeatCount);
          setKmDisplayTotal({
            ...kmDisplayTotal,
            km: oneCoinTotalKm,
            user: data.uniqueId,
            image: data.giftPictureUrl,
            repeat: data.repeatCount,
          });
        }

        if (data.diamondCount >= 150 && data.diamondCount <= 499) {
          const audio = topKmAudio?.current;
          audio.volume = 0.2;
          audio.play();

          const oneCoinTotalKm = data.repeatCount * 45000000;
          setCount((newCount) => newCount + 45000000 * data.repeatCount);
          setKmDisplayTotal({
            ...kmDisplayTotal,
            km: oneCoinTotalKm,
            user: data.uniqueId,
            image: data.giftPictureUrl,
            repeat: data.repeatCount,
          });
        }

        if (data.diamondCount >= 699 && data.diamondCount <= 1500) {
          const audio = superKmAudio?.current;
          audio.volume = 0.4;
          audio.play();

          const oneCoinTotalKm = data.repeatCount * 650000000;
          setCount((newCount) => newCount + 650000000 * data.repeatCount);
          setKmDisplayTotal({
            ...kmDisplayTotal,
            km: oneCoinTotalKm,
            user: data.uniqueId,
            image: data.giftPictureUrl,
            repeat: data.repeatCount,
          });
        }

        if (data.diamondCount >= 3000 && data.diamondCount <= 7000) {
          const audio = superKmAudio?.current;
          audio.volume = 0.4;
          audio.play();

          const oneCoinTotalKm = data.repeatCount * 1300000000;
          setCount((newCount) => newCount + 1300000000 * data.repeatCount);
          setKmDisplayTotal({
            ...kmDisplayTotal,
            km: oneCoinTotalKm,
            user: data.uniqueId,
            image: data.giftPictureUrl,
            repeat: data.repeatCount,
          });
        }

        if (data.diamondCount >= 10000 && data.diamondCount <= 29999) {
          const audio = hyperKmAudio?.current;
          audio.volume = 0.6;
          audio.play();

          const oneCoinTotalKm = data.repeatCount * 5000000000;
          setCount((newCount) => newCount + 5000000000 * data.repeatCount);
          setKmDisplayTotal({
            ...kmDisplayTotal,
            km: oneCoinTotalKm,
            user: data.uniqueId,
            image: data.giftPictureUrl,
            repeat: data.repeatCount,
          });
        }

        if (data.diamondCount >= 34999) {
          const audio = universalKmAudio?.current;
          audio.volume = 1;
          audio.play();

          const oneCoinTotalKm = data.repeatCount * 35000000000;
          setCount((newCount) => newCount + 35000000000 * data.repeatCount);
          setKmDisplayTotal({
            ...kmDisplayTotal,
            km: oneCoinTotalKm,
            user: data.uniqueId,
            image: data.giftPictureUrl,
            repeat: data.repeatCount,
          });
        }
      }
    });

    socket.on("tiktokDisconnected", () => {
      window.localStorage.setItem("savedKm", count);
    });

    socket.on("tiktokConnected", (data) => {
      console.log(data);
    });
  }, [socket]);

  useEffect(() => {
    setTimeout(() => {
      kmDisplayTotal.km = undefined;
    }, 1000);
  }, [kmDisplayTotal]);

  window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    window.localStorage.setItem("savedKm", count);
  });

  return (
    <div className="App">
      <main>
        <audio src={basicKmUp} ref={basicKmAudio}></audio>
        <audio src={mediumKmUp} ref={mediumKmAudio}></audio>
        <audio src={topKmUP} ref={topKmAudio}></audio>
        <audio src={superKmUp} ref={superKmAudio}></audio>
        <audio src={hyperKmUp} ref={hyperKmAudio}></audio>
        <audio src={universalKmUp} ref={universalKmAudio}></audio>

        <section className="allowedGifts">
          <img className="giftSection" src="./topheader.jpg"></img>
        </section>
        <img className="spaceBackground" src="./space-background.webp"></img>

        <div className="countContainer">
          <span>current distance: </span>
          <span>{count.toLocaleString()} KM</span>
          {kmDisplayTotal.km ? (
            <div className="oneCoinTotalKmText">
              <span className="kilometers">
                +{kmDisplayTotal.km.toLocaleString()} KM
              </span>
              <span className="usernameGift">{kmDisplayTotal.user}</span>
              <span className="repeatGift">x{kmDisplayTotal.repeat}</span>
              <img className="giftImage" src={kmDisplayTotal.image}></img>
            </div>
          ) : undefined}
        </div>
        <img className="cohete" src="./cohete.png"></img>

        <div className="snow"></div>

        <div className="distanceContainer">
          <span className="distanceNeeded">
            Distance needed: 900.460.730.472.581 KM
          </span>
        </div>
        <div>
          <img className="galaxyIcon" src="./galaxy-meta.png"></img>
          <input
            className="input-range"
            orient="vertical"
            type="range"
            min="0"
            max="900460730472581"
            value={count}
            step="1"
          />
          <img className="coheteIcon" src="./cohete.png"></img>
          <div className="infoContainer">
            <button
              onClick={disconnectUser}
              style={{ position: "relative", zIndex: "9999" }}
            >
              DESCONECTARSE
            </button>
            <form
              onSubmit={submitUser}
              style={{ position: "relative", zIndex: "9999" }}
            >
              <input type="text" name="text" placeholder="@usuario"></input>
              <button>Enviar</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
