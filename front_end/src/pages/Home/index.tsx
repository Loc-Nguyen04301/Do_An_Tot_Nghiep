import homeImage1 from "@/assets/images/home_image1.jpg"
import homeImage2 from "@/assets/images/home_image2.jpg"
import bottomImage from "@/assets/images/bottom_image.jpg"
import { Helmet } from "react-helmet-async"
import ProductsByCategory from "./components/ProductsByCategory"
import { useAppSelector } from "@/redux-toolkit/hook"
import "./Home.scss"

const Home = () => {
  const { categoryList } = useAppSelector((state) => state.category)
  const { from_date, to_date } = useAppSelector((state) => state.saleCampaign)
  const nowMilliSeconds = new Date().getTime()

  return (
    <>
      <Helmet>
        <title>Trang chủ - THOL</title>
        <meta name='description' content='Beginner friendly page for learning React Helmet.' />
      </Helmet>
      <div className="mx-auto max-w-[1140px] py-8">
        <div className="max-xs:hidden grid grid-cols-2">
          <div className="px-4 pb-7">
            <img src={homeImage1} />
          </div>
          <div className="px-4 pb-7">
            <img src={homeImage2} />
          </div>
        </div>
        <div className="flex flex-col gap-14">
          {categoryList.length > 0 &&
            <>
              {
                from_date &&
                to_date &&
                new Date(from_date).getTime() <= nowMilliSeconds &&
                nowMilliSeconds <= new Date(to_date).getTime() &&
                <ProductsByCategory categoryPath={categoryList[8].path} categoryName={categoryList[8].name} from_date={from_date} to_date={to_date} />
              }
              <ProductsByCategory categoryPath={categoryList[7].path} categoryName={categoryList[7].name} />
              <ProductsByCategory categoryPath={categoryList[0].path} categoryName={categoryList[0].name} />
              <ProductsByCategory categoryPath={categoryList[1].path} categoryName={categoryList[1].name} />
              <ProductsByCategory categoryPath={categoryList[2].path} categoryName={categoryList[2].name} />
              <ProductsByCategory categoryPath={categoryList[3].path} categoryName={categoryList[3].name} />
            </>
          }
        </div>
      </div>
      <img src={bottomImage} className="w-full" />
    </>
  )
}

export default Home
