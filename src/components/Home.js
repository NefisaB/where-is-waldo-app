import Navbar from "./Navbar";
import GameBoard from "./GameBoard";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const Home = () => {

    const [images, setImages] = useState([]);
    const [image, setImage] = useState({});
    const [characters, setCharacters] = useState([]);
    const [showModal, setShowModal] = useState(true);

    const imagesRef = collection(db, "images");

    const getImages = async () => {
        try {
            const dbData = await getDocs(imagesRef);
            const filteredData = dbData.docs.map(doc => ({ ...doc.data() }));
            setImages(filteredData);
            setCharacters(images[0].characters.map(item => {
                return {...item, found: false}
            }));
        } catch (error) {
            console.log(error);
        }    
    }

    useEffect(() => {
        getImages();
    }, []);


    const closeModal = (level) => {
        const temp = images.filter(item => item.level === level);
        setImage(temp[0]);
        setCharacters(temp[0].characters);
        setShowModal(false);
    }

    return (
        <div>
            {showModal &&
                <Modal closeModal={closeModal} />}
            {!showModal && <div>
            <Navbar characters={characters}/>
                <GameBoard image={image} characters={characters} />
            </div>}
        </div>);
}
 
export default Home;