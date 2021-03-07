import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../../context/store'
import { addToCart } from '../../context/actions'
import { ACTIONS } from '../../context/constants'

const ProductItem = ({ product, handleCheck }) => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state

    const userLink = () => {
        return (
            <>
                <Link href={`product/${product._id}`}>
                    <a
                        className="btn btn-info"
                        style={{ marginRight: '5px', flex: 1 }}
                    >
                      <i className="fas fa-eye"></i> View
                    </a>
                </Link>
                <button
                    className="btn btn-success"
                    style={{ marginLeft: '5px', flex: 1 }}
                    disabled={product.inStock === 0 ? true : false}
                    onClick={() => dispatch(addToCart(product, cart))}
                >
                    <i className="fas fa-shopping-cart"></i> Buy
                </button>
            </>
        )
    }

    const adminLink = () => {
        return (
            <>
                <Link href={`create/${product._id}`}>
                    <a
                        className="btn btn-info"
                        style={{ marginRight: '5px', flex: 1 }}
                    >
                        <i className="fas fa-pen"></i> Edit
                    </a>
                </Link>
                <button
                    className="btn btn-danger"
                    style={{ marginLeft: '5px', flex: 1 }}
                    data-toggle="modal" data-target="#exampleModal"
                    onClick={() => dispatch({
                        type: ACTIONS.ADD_MODAL,
                        payload: [{
                            data: '',
                            id: product._id,
                            title: product.title,
                            type: ACTIONS.DELETE_PRODUCT
                        }]
                    })}
                >
                    <i className="far fa-trash-alt"></i> Delete
                </button>
            </>
        )
    }

    return (
        <div className="card" style={{ width: '18rem' }}>
            {
                auth.user && auth.user.role === 'admin' &&
                <input 
                    type="checkbox" 
                    checked={product.checked}
                    className="position-absolute"
                    style={{ height: '20px', width: '20px' }}
                    onChange={() => handleCheck(product._id)} 
                />
            }

            <img 
                className="card-img-top" 
                src={product.images[0].url} 
                alt={product.images[0].url} 
            />
            <div className="card-body">
                <h5 className="card-title text-capitalize" title={product.title}>
                    {product.title}
                </h5>

                <div className="row justify-content-between mx-0">
                    <h3 className="text-danger">${product.price}</h3>
                </div>

                <p className="card-text" title={product.restaurant}>
                    <i className="fas fa-map-marker-alt	"></i> {product.restaurant}
                </p>

                <div className="card-footer text-center">
                    {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()}
                </div>
            </div>
        </div>
    )
}

export default ProductItem