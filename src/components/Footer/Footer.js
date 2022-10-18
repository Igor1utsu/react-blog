import "./Footer.scss"

const currentYear = new Date().getFullYear()

const Footer = () => {
    return (
      <footer className="footer">
        <div className="container">
          <div className="footer__row">Footer - {currentYear}</div>
        </div>
      </footer>
    )
}

export default Footer