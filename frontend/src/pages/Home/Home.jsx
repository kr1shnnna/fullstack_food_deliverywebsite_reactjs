import AppDownload from '../../components/AppDownload/AppDownload'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Header from '../../components/Header/Header'
import { useState, useContext } from 'react'
import { StoreContext } from '../../Context/StoreContextDefinition'

const Home = () => {

  const [category, setCategory] = useState('All')

  const { searchTerm } = useContext(StoreContext)
  const isSearchMode = Boolean(searchTerm.trim())

  return (
    <div id="home">

      {!isSearchMode && <Header />}

      {!isSearchMode && (
        <ExploreMenu
          category={category}
          setCategory={setCategory}
        />
      )}

      <FoodDisplay category={category} />

      {!isSearchMode && <AppDownload />}

    </div>
  )
}

export default Home