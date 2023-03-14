const Modale = ({ show, closeModal }) => {
    
    const levels = ["easy", "medium", "hard"];

    const levelsList = levels.map(level => {
        return <button key={level}
            className="level-btn"
            onClick={() => closeModal(level)}>{level}</button>
    })

    return ( 
        <div className="modal">
            <div>
                <h2>Please choose level</h2>
                {levelsList}
            </div>
        </div>
     );
}
 
export default Modale;