import styled from "styled-components";

const AlertTemplateStyled = styled.div`
  background-color: #151515;
  margin: 10px;
  font-size: 1.2em;
  color: white;
  padding: 20px;
  text-transform: none;
  border-radius: 3px;
  border: ${({ alertOptions }) => {
    // console.log(alertOptions.type);
    if (alertOptions.type == "error") return "3px solid red";
    if (alertOptions.type == "success") return "3px solid green";
    if (alertOptions.type == "info") return "3px solid blue";
  }};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.03);
  width: 50vw;
  box-sizing: border-box;
`;

const ButtonStyle = styled.button`
  margin-left: 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #ffffff;
  :hover {
    transform: scale(1.5);
  }
`;

// the style contains only the margin given as offset
// options contains all alert given options
// message is the alert message
// close is a function that closes the alert
const AlertTemplate = ({ style, options, message, close }) => {
  return (
    <AlertTemplateStyled alertOptions={options} style={style}>
      {options.type === "info" && React.createElement(InfoIcon, null)}
      {options.type === "success" && React.createElement(SuccessIcon, null)}
      {options.type === "error" && React.createElement(ErrorIcon, null)}
      {message}
      <ButtonStyle onClick={close}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='#fff'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          style={{ marginRight: "0px", minWidth: "24px" }}
        >
          <line x1='18' y1='6' x2='6' y2='18'></line>
          <line x1='6' y1='6' x2='18' y2='18'></line>
        </svg>
      </ButtonStyle>   
    </AlertTemplateStyled>
  );
};

export default AlertTemplate;

var SuccessIcon = function SuccessIcon() {
  return React.createElement(
    BaseIcon,
    { color: "#31B404" },
    React.createElement("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }),
    React.createElement("polyline", { points: "22 4 12 14.01 9 11.01" })
  );
};

var ErrorIcon = function ErrorIcon() {
  return React.createElement(
    BaseIcon,
    { color: "#FF0040" },
    React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
    React.createElement("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
    React.createElement("line", { x1: "12", y1: "16", x2: "12", y2: "16" })
  );
};

var InfoIcon = function InfoIcon() {
  return React.createElement(
    BaseIcon,
    { color: "#2E9AFE" },
    React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
    React.createElement("line", { x1: "12", y1: "16", x2: "12", y2: "12" }),
    React.createElement("line", { x1: "12", y1: "8", x2: "12", y2: "8" })
  );
};

var CloseIcon = function CloseIcon() {
  return React.createElement(
    BaseIcon,
    { color: "#FFFFFF", pushRight: false },
    React.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
    React.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
  );
};

var BaseIcon = function BaseIcon(_ref) {
  var color = _ref.color,
    _ref$pushRight = _ref.pushRight,
    pushRight = _ref$pushRight === undefined ? true : _ref$pushRight,
    children = _ref.children;
  return React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: { marginRight: pushRight ? "20px" : "0", minWidth: 24 }
    },
    children
  );
};
