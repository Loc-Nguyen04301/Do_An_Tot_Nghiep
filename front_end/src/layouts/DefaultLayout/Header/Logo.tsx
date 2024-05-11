import logoImage from "@/assets/images/thol-logo.jpg"

const Logo = () => {
  return (
    <div className="logo">
      <a href="/">
        <img src={logoImage} alt="logo" className="max-h-[76px]" />
      </a>
    </div>
  )
}

export default Logo
