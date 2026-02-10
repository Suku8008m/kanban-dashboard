import "./index.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-left">
        <p>
          © {new Date().getFullYear()} <strong>Sukumar Kamapalli</strong>
        </p>
        <span>Kanban Task Manager</span>
      </div>

      <div className="footer-right">
        <span>Built with React • React DnD • Recharts</span>
      </div>
    </footer>
  );
};

export default Footer;
