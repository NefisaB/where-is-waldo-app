const Modale = ({ levels, closeModal, time }) => {
    
    
    const levelsList = levels.map(level => {
        return <button key={level}
            className="level-btn"
            onClick={() => closeModal(level)}>{level}</button>
    });

    const convertMS = (ms) => {
        let m, s;
        s = Math.floor(ms / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        return `${m > 9 ? m : "0" + m}:${s> 9 ? s : "0" + s} (m:s)`
    }

    const interval = convertMS(time.end - time.start);
    

    return ( 
        <div className="modal">
            <div>
                {time.start !== 0 && 
                <span>Your time is: {interval}</span>}
                <h2>{levels.length > 0 ? "Please choose level" : "Thank you for playing"}</h2>
                {levelsList}
            </div>
        </div>
     );
}
 
export default Modale;