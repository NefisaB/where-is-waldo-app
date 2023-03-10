import { useState } from "react";
import data from "../data";

const GameBoard = () => {

    console.log(data[0])

    const [isPhotoClicked, setIsPhotoClicked] = useState(false);
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
    const [xCoord, setXCoord] = useState(0);
    const [yCoord, setYCoord] = useState(0);


    const handleOnImageClick = (e) => {
        setIsPhotoClicked(true);
        const rect = e.target.getBoundingClientRect();
        setClickPosition({x: e.clientX - rect.left, y: e.clientY - rect.top})
        setXCoord((e.clientX - rect.left) / rect.width);
        setYCoord((e.clientY - rect.top) / rect.height);

    }


    const handleListItemClick = (e) => {
        e.stopPropagation();
        if (xCoord.toFixed(2) - data[0].characters[0].xValue < 0.2 &&
            yCoord.toFixed(2) - data[0].characters[0].yValue < 0.2) {
            alert("You've found Waldo");
        }
        setIsPhotoClicked(false);        
    }


    return ( 
            <div className="gameboard" onClick={handleOnImageClick}>
                <img src={`${data[0].src}`}
                className="image"
                alt="find waldo"/>
            {
                isPhotoClicked && <div className='dropdown'
                    style={{
                        position: 'absolute',
                        top: `${clickPosition.y}px`,
                        left: `${clickPosition.x}px`
                    }}>
                    <ul>
                        <li onClick={handleListItemClick}>{data[0].characters[0].name}</li>
                    </ul>
                </div>
            }
            </div>
     );
}
 
export default GameBoard;