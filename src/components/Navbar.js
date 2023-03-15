const Navbar = ({characters}) => {
    return ( 
        <nav>
            <h2>Where Is Waldo?</h2>
            <div>
                {characters.map(item => {
                    return (<img
                        src={item.src}
                        alt={item.name} key={item.name} />);
                })}
            </div>
        </nav>
     );
}
 
export default Navbar;