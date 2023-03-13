import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const GameBoard = () => {

    const [images, setImages] = useState([]);
    const [isPhotoClicked, setIsPhotoClicked] = useState(false);
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
    const [xCoord, setXCoord] = useState(0);
    const [yCoord, setYCoord] = useState(0);
    const [imageClickStatus, setImageClickStatus] = useState("");
    const [characters, setCharacters] = useState([]);

    const imagesRef = collection(db, "images");

    const getImages = async () => {
        try {
            const dbData = await getDocs(imagesRef);
            const filteredData = dbData.docs.map(doc => ({ ...doc.data() }));
            setImages(filteredData);
            setCharacters(filteredData[0].characters.map(item => {
                return {...item, found: false}
            }));
        } catch (error) {
            console.log(error);
        }    
    }

    useEffect(() => {
        getImages();
    }, []);

    const handleOnImageClick = (e) => {
        setIsPhotoClicked(true);
        const rect = e.target.getBoundingClientRect();
        console.log(e.clientX - rect.left)
        console.log(e.clientY - rect.top)
        setClickPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setXCoord((e.clientX - rect.left) / rect.width);
        setYCoord((e.clientY - rect.top) / rect.height);
        console.log(images);
    }

    const isGameOver = () => {
        if (characters.every(item => item.found === true)) {
            alert("Game Over");
        }
    }


    const handleListItemClick = (e, characterName) => {
        e.stopPropagation();

        characters.forEach(element => {
            if (element.name === characterName) {
                if (Math.abs(xCoord.toFixed(2) - element.xPosition) < 0.01 &&
                    Math.abs(yCoord.toFixed(2) - element.yPosition) < 0.01) {
                    setImageClickStatus(`You've found ${element.name}`);
                    element.found = true;
                    isGameOver();
                } else {
                    setImageClickStatus(`That's not ${element.name}. Keep looking...`);
                }
            }
        });

        setIsPhotoClicked(false);
    }


    return ( 
        <div className="gameboard" onClick={handleOnImageClick}>
            <span className="status">{imageClickStatus}</span>
            {images.length > 0 &&
                <img src={`${images[0].src}`}
                    className="image"
                    alt="find waldo" />}
            {
                isPhotoClicked && <div className='dropdown'
                    style={{
                        position: 'absolute',
                        top: `${clickPosition.y}px`,
                        left: `${clickPosition.x}px`
                    }}>
                    <ul className="characters-list">
                        {
                            characters && characters.map(item => {
                                return (
                                    <li key={item.name}
                                        className={item.found ? "found" : "missing"}
                                        onClick={(e) => handleListItemClick(e, item.name)}>{item.name}</li>
                                );
                            })
                        }
                    </ul>
                </div>
            }
            </div>
     );
}
 
export default GameBoard;