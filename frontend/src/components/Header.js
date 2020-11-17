import React,{ useEffect} from 'react'
import "./Header.css"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { logout} from '../actions/userActions'
export const Header = ({history}) => {
  const dispatch= useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const userLogin = useSelector(state => state.userLogin)
  const{loading, error , userInfo} = userLogin
  useEffect(() => {
    let sum= 0
    cartItems.map((item) =>{
      sum= sum+ item.qty
    })
    console.log(sum)
    document.getElementById('lblCartCount').innerText= sum
  }, [])

  window.onclick = function(event) {
    if(document.getElementById("myForm").style.display == "block"){
      if (event.target === document.getElementById('search') || event.target === document.getElementById('mobile-search') || event.target == document.getElementById('tab-search')){
        if(event.target === document.getElementById('mobile-search') || event.target === document.getElementById('tab-search')){
          openForm() 
        }
      }else{    
        document.getElementById("myForm").style.display = "none";
    }      
    }
}
const logoutHandler =() =>{
  dispatch(logout())
 }
const openForm =() =>{
 document.getElementById("myForm").style.display= "block"
}
const burgerHandler= () => {
  document.getElementById("mySidenav").style.width = "70vw";
}

 
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  const sidemenumen =()=>{
   
   let men_inner=document.getElementById('men-inner');
 let men_icon_plus=document.getElementById('icon-inner-men-plus')
 let men_icon_minus=document.getElementById('icon-inner-men-minus')

  if(men_inner.classList.contains('none')){
    men_inner.classList.toggle('none');
    men_inner.classList.add('show');
    if(men_icon_plus.classList.contains('show') && men_icon_minus.classList.contains('none')){
      men_icon_plus.classList.toggle('show');
      men_icon_plus.classList.add('none');
      men_icon_minus.classList.toggle('none');
    men_icon_minus.classList.add('show');
    }
  }
  else{
    men_inner.classList.toggle('show');
    men_inner.classList.add('none')
    if(men_icon_plus.classList.contains('none') && men_icon_minus.classList.contains('show')){
      men_icon_minus.classList.toggle('show');
      men_icon_minus.classList.add('none');
      men_icon_plus.classList.toggle('none');
      men_icon_plus.classList.add('show');
    }
  }

  }
   const sideclicks=(click)=>{
     if(click==='cart'){
      window.location.href='/cart'
     }
     else if (click==='login'){
      window.location.href='/auth/login'
     }
     else if(click==='signup'){
      window.location.href='/signup'
     }else if (click==='blog'){
      window.location.href='/blog'
     }
     else if(click==='search'){
      openForm()
     }
    
   }
   const sidetopclicks=(click)=>{
    if(click==='men'){
      window.location.href='/collections/men'
    }else{
      window.location.href='/collections/women'
    }
   
  }
  const sidemenuwomen =()=>{
     var women_inner=document.getElementById('women-inner');
  var women_icon_plus=document.getElementById('icon-inner-women-plus')
  var women_icon_minus=document.getElementById('icon-inner-women-minus')

    if(women_inner.classList.contains('none')){
    women_inner.classList.toggle('none');
    women_inner.classList.add('show');
    if(women_icon_plus.classList.contains('show') && women_icon_minus.classList.contains('none')){
      women_icon_plus.classList.toggle('show');
      women_icon_plus.classList.add('none');
      women_icon_minus.classList.toggle('none');
    women_icon_minus.classList.add('show');
    }
  }
  else{
    women_inner.classList.toggle('show');
    women_inner.classList.add('none')
    if(women_icon_plus.classList.contains('none') && women_icon_minus.classList.contains('show')){
      women_icon_minus.classList.toggle('show');
      women_icon_minus.classList.add('none');
      women_icon_plus.classList.toggle('none');
      women_icon_plus.classList.add('show');
    }
  }

  }
  // var women= document.getElementById('menu-women');
  return (
    <header>
      <div className="top-nav flex">
        <h4 className="sm">Meet F-tops our latest new cool shoes!</h4>
        <a href="#" className="btn btn-top">Pre Order Here!</a>
      </div>
      <div className="navbar">
        <div id="mySidenav" className="sidenav">
          <a href="javascript:void(0)" className="closebtn" onClick={closeNav}  >&times;</a>
          <div className="menu-b">
            <div className="menu-top">
              <div >
                <div className="side-men" id="menu-men" onClick={sidemenumen} >
                  <h4>Men</h4>
                  <i className="fas fa-plus show"id='icon-inner-men-plus' ></i>
                  <i className="fas fa-minus none" id='icon-inner-men-minus' ></i>
                </div>
                <ul className="none inner-menu" id="men-inner">
                  <li onClick={()=>{
                sidetopclicks('men')
              }}> Shop All</li>
                  <li onClick={()=>{
                sidetopclicks('men')
              }}>Best Sellers</li>
                  <li onClick={()=>{
                sidetopclicks('men')
              }}>T shirts</li>
                  <li onClick={()=>{
                sidetopclicks('men')
              }}>Hats</li>
                  <li onClick={()=>{
                sidetopclicks('men')
              }}>Pants</li>
                  <li onClick={()=>{
                sidetopclicks('men')
              }}>Shoes</li>
                </ul> 
              </div>
              <div  >
                <div className="side-men" id="menu-women" onClick={sidemenuwomen}>
                  <h4>Women</h4>
                  <i className="fas fa-plus show" id='icon-inner-women-plus' ></i>
                  <i className="fas fa-minus none" id='icon-inner-women-minus'></i>
                </div>
                <ul className="none inner-menu"id="women-inner">
                  <li onClick={()=>{
                sidetopclicks('wommen')
              }}>Shop All</li>
                  <li  onClick={()=>{
                sidetopclicks('wommen')
              }}>Best Sellers</li>
                  <li  onClick={()=>{
                sidetopclicks('wommen')
              }}>Tees</li>
                  <li  onClick={()=>{
                sidetopclicks('wommen')
              }}>Round Necks</li>
                  <li  onClick={()=>{
                sidetopclicks('wommen')
              }}>Pants</li>
                  <li  onClick={()=>{
                sidetopclicks('wommen')
              }}>Shoes</li>
                </ul> 
              </div>
              <div className="side-men">
                <h4>Contact Us</h4>
                <i className="fas fa-plus show" ></i>
                <i className="fas fa-minus none" ></i>
              </div>
            </div>
            <div className="menu-below">
              {userInfo && userInfo.isAdmin && (
                <>
                <div className="side-men below" > Products</div>
                <div className="side-men below" > Users</div>
                <div className="side-men below" > Orders</div>
                <div className="side-men below" > My Orders</div>
                </>
              )}
              <div className="side-men below" onClick={()=>{
                sideclicks('cart')
              }}>
                <h4 >Cart</h4>
              </div>
              {userInfo ? (
                <div className="side-men below"  onClick={logoutHandler}>
                  <h4 >Logout </h4>
                </div>
              ):(
                  <>
                  <div className="side-men below"  onClick={()=>{
                     sideclicks('login')
                    }}>
                    <h4 >Login </h4>
                  </div>
                  <div className="side-men below"  onClick={()=>{
                    sideclicks('signup')
                    }}>
                    <h4  >Sign Up</h4>
                  </div>
                  </>
              )}
              
              <div className="side-men below" onClick={()=>{
                sideclicks('blog')
              }}>
                <h4>Blog</h4>
              </div>
              
            </div>
          </div>
          
        </div>
        <div className="container flex">
          <i className="fas fa-bars ham" id="nav-burger" onClick={burgerHandler}></i> 
          <h1 className="logo"><Link to="/">KOLO STORES.</Link></h1>
          <nav>
            <div className="ul">
              <li>
              <Link to="/collections/men">Men</Link>
               </li>
              <li><Link to="/collections/women">Women</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </div>
          </nav>
          <nav className="nav-right">
            <div className="ul ">
              <li><Link to="/blogs"><i className="fas fa-book-open"></i> Blogs</Link></li>
              {/* <li><a href="#" id="search" onClick={openForm}> <i className="fas fa-search"></i> Search</a></li> */}
              {userInfo ? (
                //  <li><Link to="/logout"><i className="fas fa-sign-in-alt"></i> 
              <li class="dropdown">
               <i class="fas fa-user"></i> {userInfo.name}
              <div class="dropdown-content">
                <li><Link to='/profile'>
                Profile
                </Link>
                  </li>
                  <li><Link to='/myorders'>
                orders
                </Link>
                  </li>
                <li onClick={logoutHandler}>
                Logout
                </li>
                { userInfo && userInfo.isAdmin && (
                <>
                <li>
                <Link to='/admin/productslist'>
                Products
                </Link>
                </li>
                <li>
                <Link to='/admin/userlist'>
                Users
                </Link>
                </li>
                <li>
                <Link to='/admin/orderlist'>
                Orders(Admin)
                </Link>
                </li>
                </>
              )}
              </div>
              
            </li>
            
                //</Link>
               // </li>
              ):(
                <li><Link to="/auth/login"><i className="fas fa-sign-in-alt"></i> Login</Link></li>
              )}
              <li><Link to="/cart"><i className="fas fa-shopping-cart"></i>
              <span class='badge badge-warning' id='lblCartCount'> 0 </span>
               Cart</Link></li>
            </div>
          </nav>
          <div className="nav-tab ul">
            {/* <li><Link to="/blogs"> Blogs</Link></li> */}
            {userInfo ? (
                //  <li><Link to="/logout"><i className="fas fa-sign-in-alt"></i> 
              <li class="dropdown">
               <i class="fas fa-user"></i> {userInfo.name}
              <div class="dropdown-content">
                <li><Link to='/profile'>
                Profile
                </Link>
                  </li>
                  <li><Link to='/myorders'>
                orders
                </Link>
                  </li>
                <li onClick={logoutHandler}>
                Logout
                </li>
              </div>
            </li>
                //</Link>
               // </li>
              ):(
                <li><Link to="/auth/login"><i className="fas fa-sign-in-alt"></i> Login</Link></li>
              )}
            <Link to="/cart"><i className="fas fa-shopping-cart"></i>
            <span class='badge badge-warning' id='lblCartCount'> 0 </span>
            </Link>
            {/* <i className="fas fa-search"  onClick={openForm} id="tab-search"></i> */}
          </div>
          <div className="nav-mobile">
            <Link to="/cart"><i className="fas fa-shopping-cart"></i>
            <span class='badge badge-warning' id='lblCartCount'> 0 </span>
            </Link>
            {/* <i className="fas fa-search"  onClick={openForm} id="mobile-search"></i> */}
          </div>
        </div>
        <div className="form-popup" id="myForm">
          <form action="#" className="form-container">
          <input type="text" placeholder="search for products  " />
          <input type="button" value="" className="btnnn"/>
          </form>
        </div>
        </div>
    </header>
  )
}
