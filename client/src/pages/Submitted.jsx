import { FcCheckmark } from "react-icons/fc";
import RTLogo from "../images/RTLogo.png";

const Submitted = () => {
  return (
    <div
      className="centered"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        justifySelf: "center",
        height: "100vh",
        width: "100vw",
        textAlign: "center",
        background: "#f4f6ff",
      }}
    >
      <img
        src={RTLogo}
        style={{ alignSelf: "flex-start", width: "6rem", margin: "10px 0 0 10px" }}
        alt="Real Time Group logo"
      ></img>
      <h2 style={{ fontSize: "3.5rem" }}>Thank you!</h2>
      <FcCheckmark style={{ fontSize: "12rem" }} />
      <p style={{ fontSize: "1.7rem", lineHeight: "3rem" }}>
        We appreciate your time to help improving our company.
        <br />
        Your feedback is important for us.
      </p>
      <p style={{ fontSize: "1.7rem" }}></p>
    </div>
  );
};

export default Submitted;
