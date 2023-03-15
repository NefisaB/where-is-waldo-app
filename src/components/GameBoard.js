import { useState } from "react";

const GameBoard = ({image, characters, gameOver }) => {
    
    const [isPhotoClicked, setIsPhotoClicked] = useState(false);
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
    const [xCoord, setXCoord] = useState(0);
    const [yCoord, setYCoord] = useState(0);
    const [imageClickStatus, setImageClickStatus] = useState("Where could he be ....");

    const handleOnImageClick = (e) => {
        setIsPhotoClicked(true);
        const rect = e.target.getBoundingClientRect();
        console.log(e.clientX - rect.left)
        console.log(e.clientY - rect.top)
        setClickPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setXCoord((e.clientX - rect.left) / rect.width);
        setYCoord((e.clientY - rect.top) / rect.height);

        console.log(`x: ${xCoord}, y: ${yCoord}`)
    }

    const isGameOver = () => {
        if (characters.every(item => item.found === true)) {
            gameOver();
        }
    }


    const handleListItemClick = (e, characterName) => {
        e.stopPropagation();

        characters.forEach(element => {
            if (element.name === characterName) {
                if (Math.abs(xCoord.toFixed(2) - element.xPosition) < 0.015 &&
                    Math.abs(yCoord.toFixed(2) - element.yPosition) < 0.015) {
                    setImageClickStatus(`You've found ${element.name}!`);
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
                <img src={`${image.src}`}
                    className="image"
                    alt="find waldo" />
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