import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const CompanyInfomation = () => {
  return (
    <div className="contact flex items-center max-md:hidden">
      <ul className="flex text-sm h-fit gap-2">
        <li className="flex items-center mr-2 gap-1">
          <FontAwesomeIcon icon={faEnvelope} />
          <span className="text-main-grey-color font-semibold">Email</span>
        </li>
        <li className="divider border-l-[1px] h-[1rem] border-gray-500 opacity-40 relative top-[3px]"></li>
        <li className="flex items-center ml-2 gap-1 ">
          <FontAwesomeIcon icon={faPhone} />
          <span className="text-main-grey-color font-semibold">1900 2050</span>
        </li>
      </ul>
    </div>
  )
}

export default CompanyInfomation
