/* eslint-disable no-mixed-operators */
import React from "react";
import { Button } from "react-bootstrap";
import { FieldArray, Field, ErrorMessage } from "formik";

function FormDevices({ devices, errors, touched, limit }) {
  const res = 10 - limit;
  const ok = res + devices.length <= 10;

  return (

    <FieldArray name="otherDevices">
      {({ insert, remove, push }) => (
        <div>
          {(devices.length > 0 && ok) &&
            devices.map((device, index) => {
              const ticketErrors = errors.otherDevices?.length && errors.otherDevices[index] || {};
              const ticketTouched = touched.otherDevices?.length && touched.otherDevices[index] || {};
              return (<div key={index} className="list-group list-group-flush">
                <div className="list-group-item">
                  <h5 className="card-title">Device {index + 1}</h5>
                  <div className="form-group row">
                    <label htmlFor={`otherDevices.${index}.uid`} className="col-form-label col-3">UID</label>
                    <div className="col-9">
                      <Field name={`otherDevices.${index}.uid`} className={'form-control' + (ticketErrors.uid && ticketTouched.uid ? ' is-invalid' : '')} type="text" />
                      <ErrorMessage name={`otherDevices.${index}.uid`} component="div" className="invalid-feedback" />
                    </div>
                  </div>

                  <div className="form-group row mt-5">
                    <label htmlFor={`otherDevices.${index}.vendor`} className="col-form-label col-3">Vendor</label>
                    <div className="col-9">
                      <Field name={`otherDevices.${index}.vendor`} className="form-control" type="text" />
                    </div>
                  </div>

                  <div className="form-group row mt-5">
                    <label htmlFor="createdAt" className="col-form-label col-3">Date created</label>
                    <div className="col-9">
                      <Field name={`otherDevices.${index}.createdAt`} className={'form-control' + (ticketErrors.createdAt && ticketTouched.createdAt ? ' is-invalid' : '')} type="date" />
                      <ErrorMessage name={`otherDevices.${index}.createdAt`} component="div" className="invalid-feedback" />
                    </div>
                  </div>

                  <div className="form-group row mt-5">
                    <label htmlFor={`otherDevices.${index}.status`} className="col-form-label col-3">Status</label>
                    <div className="col-9">
                      <Field name={`otherDevices.${index}.status`} as="select" className={'form-control' + (ticketErrors.status && ticketTouched.status ? ' is-invalid' : '')} >
                        <option value="">Select</option>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                      </Field>
                      <ErrorMessage name={`otherDevices.${index}.status`} component="div" className="invalid-feedback" />
                    </div>
                  </div>
                  <div className="col">
                    <Button className="warning mt-2" onClick={() => remove(index)}>
                      X
                    </Button>
                  </div>
                </div>
              </div>
              )

            })}
          {res + devices.length < 10 && <Button className="secondary mt-5" onClick={() => push({ uid: '', vendor: '', createdAt: '', status: '' })}>
            Add Device
          </Button>}
        </div>
      )}
    </FieldArray>

  );
}

export default FormDevices;
