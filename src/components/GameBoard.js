import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import data from "../data";
import { db } from "../firebase/config";

const GameBoard = () => {

    const [images, setImages] = useState([]);
    const [isPhotoClicked, setIsPhotoClicked] = useState(false);
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
    const [xCoord, setXCoord] = useState(0);
    const [yCoord, setYCoord] = useState(0);

    const imagesRef = collection(db, "images");

    const getImages = async () => {
        try {
            const dbData = await getDocs(imagesRef);
            const filteredData = dbData.docs.map(doc => ({ ...doc.data() }));
            setImages(filteredData);
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


    const handleListItemClick = (e, characterName) => {
        e.stopPropagation();
        console.log(characterName);
        if (Math.abs(xCoord.toFixed(2) - data[0].characters[0].xValue) < 0.01 &&
            Math.abs(yCoord.toFixed(2) - data[0].characters[0].yValue) < 0.01){
            alert("You've found Waldo");
        }
        setIsPhotoClicked(false);
    }


    return ( 
        <div className="gameboard" onClick={handleOnImageClick}>
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
                    <ul>
                        {
                            images[0].characters.map(item => {
                                return (
                                    <li onClick={(e) => handleListItemClick(e, item.name)}>{item.name}</li>
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