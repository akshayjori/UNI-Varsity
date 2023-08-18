import "../css/intropage.css";
import { useNavigate } from "react-router-dom";
import introimg from "../img/intro_img_3.jpg";

const IntroPage = () => {
  const navigate = useNavigate();

  return (
    <div className="intropage">
      <div className="right-div">
        <img className="intro-img" src={introimg} alt="" />
      </div>
      <div className="left-div text-left">
        <i>
          <h3>
            Welcome <small>to</small>
          </h3>
          <h1 className="brand-name">UNI Varsity</h1>
          <h4>What do we provide?</h4>
          <h5 className="ml-3">
            <ul>
              <li>Online learning courses.</li>
              <li>Top-class teachers from all over the world.</li>
              <li>Leading online learning platform.</li>
              <li>Lifetime access to all the courses.</li>
              <li>Industry recognized Certificates.</li>
              <li>Up-to-date course content.</li>
            </ul>
          </h5>
        </i>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Go to Login Page
        </button>
      </div>
    </div>
  );
};

export default IntroPage;
