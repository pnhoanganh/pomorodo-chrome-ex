import logo from '../../../public/img/logo.png'

export const Header = () => (
  <>
    <a
      href="../../options.html"
      className="fs-3 d-flex justify-content-end pe-3 pb-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="bi bi-gear-fill"></i>
    </a>
    <h3 className="fs-5 mt-2 fw-medium title mb-4 lh-sm text-uppercase">Pomodoro Timer</h3>
    <div>
      <img src={logo} alt="Pomodoro logo" />
    </div>
  </>
)

export default Header
