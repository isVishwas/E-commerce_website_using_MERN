import {Link} from 'react-router-dom';
const Footer = ()=> 
{
  return (
    <footer className="site-footer">
      {/* <div className="container">
        
          </div> */}

         

          
        <hr></hr>
     
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; 2021 All Rights Reserved by 
         <Link> ONLINE STORE</Link>.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li><Link className="facebook" ><i className="fab fa-facebook-f"></i></Link></li>
              <li><Link className="twitter" ><i className="fab fa-twitter"></i></Link></li>
              <li><Link className="dribbble" ><i className="fab fa-github"></i></Link></li>
              <li><Link className="linkedin" ><i className="fab fa-linkedin"></i></Link></li>   
            </ul>
          </div>
        </div>
      </div>
</footer>
  );
}

export default Footer;
