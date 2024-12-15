import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { displayMessage } from "../../redux/message/message-actions";

const DisplayMessage = ({ type, message }) => {
  const [onDisplay, setOnDisplay] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(displayMessage({ type: null, message: null }));
      setOnDisplay(false);
    }, 5000);
  }, []);

  return (
    <React.Fragment>
      {onDisplay ? (
        <div role="alert" className="display-message">
          <div className={`display-message__${type}`}>
            <h2 className="display-message__type">{`${type}!`}</h2>
            <h2>{message}</h2>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default DisplayMessage;
