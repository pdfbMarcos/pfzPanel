import logo from "../assets/images/ICONEPDF-BRASIL-03.ico";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-2 p-2">
      <a className="navbar-brand" href="#">
        <img src={logo} width="45" height="45" alt="" />
      </a>
      <a className="navbar-brand" href="/">
        PDFB
      </a>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/home">
              Home
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/documents">
              Documentos
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/logs">
              Log
            </a>
          </li>
        </ul>
      </div>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/logout">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
