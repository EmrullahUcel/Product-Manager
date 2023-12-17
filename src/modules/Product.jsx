import Products from '../components/Products'
import Sales from '../components/Sales'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/SalesSlice'
import Scanner from '../components/Scanner'
import { account } from '../db/appwrite'
import './product.css'
import { setUser } from '../redux/auth'

const Product = () => {


  return (
    <div className="mainDiv">
      <div className="productWrapper">
        <Products />
      </div>
      <Sales />
      <Scanner />
    </div>
  )
}

export default Product
