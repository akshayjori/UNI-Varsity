import React from "react";
import "../css/deleteAlert.css";

const DeleteAlert = (props) => {
  return (
    <>
      <div className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  props.confirmDelete(false);
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{props.deleteAlert.message}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger w-25"
                onClick={() => {
                  props.confirmDelete(true);
                }}
              >
                Yes Delete!
              </button>
              <button
                type="button"
                className="btn btn-secondary w-25"
                data-dismiss="modal"
                onClick={() => {
                  props.confirmDelete(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAlert;
