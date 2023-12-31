import { Suspense } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { publicRoutes } from "./routes"
import DefaultLayout from "./layouts/DefaultLayout"

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {publicRoutes.map((route) => {
            const Layout = route.layout || DefaultLayout
            const View = route.component
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <View />
                  </Layout>
                }
              />
            )
          })}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense >
    </BrowserRouter>
  )
}

export default App
