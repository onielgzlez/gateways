import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Alert } from 'react-bootstrap';
import * as Yup from 'yup';
import { api, handleError } from "../../utils";

const DeviceForm = ({ id }) => {
    const isAddMode = !id;
    const navigate = useNavigate();
    const formikRef = useRef();
    const [sErrors, setSerrors] = useState(null);

    const validationSchema = Yup.object({
        uid: Yup.number().integer('Must be a number')
            .required('UID is required'),
        status: Yup.string().required('Status is required'),
        createdAt: Yup.date().default(function () {
            return new Date();
        })
    })

    useEffect(() => {

        if (!isAddMode) {
            api.get('devices/' + id).then(device => {
                const fields = ['uid', 'vendor', 'createdAt', 'status'];
                fields.forEach(field => formikRef.current?.setFieldValue(field, field === "createdAt" ? toDate(device[field]) : device[field]));
            });
        }
        return () => { };
    }, [id, isAddMode]);

    const toDate = s => {
        return s.split('T').length ? s.split('T')[0] : s
    }

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (isAddMode) {
            createDevice(fields, setSubmitting);
        } else {
            updateDevice(id, fields, setSubmitting);
        }
    }

    function createDevice(fields, setSubmitting) {
        api.post('devices', fields)
            .then((data) => {
                setSubmitting(false);
                navigate('/devices?r=1')
            })
            .catch((error) => {
                setSubmitting(false);
                setSerrors(handleError(error));
            });
    }

    function updateDevice(id, fields, setSubmitting) {
        api.put('devices/' + id, fields)
            .then((data) => {
                setSubmitting(false);
                navigate('/devices?r=1')
            })
            .catch(error => {
                setSubmitting(false);
                setSerrors(handleError(error));
            });
    }

    return (
        <Formik initialValues={{ uid: '', vendor: '', createdAt: '', status: '' }} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formikRef}>
            {({ errors, touched, isSubmitting }) => {

                return (
                    <Form noValidate className="form form-label-right">
                        <h1>{isAddMode ? 'Add Device' : 'Edit Device'}</h1>
                        <div className="row justify-content-center">
                            {sErrors && <Alert variant='warning'>{sErrors}</Alert>}
                            <div className="col-9">
                                <div className="form-group row">
                                    <label htmlFor="uid" className="col-form-label col-3">UID</label>
                                    <div className="col-9">
                                        <Field name="uid" className={'form-control' + (errors.uid && touched.uid ? ' is-invalid' : '')} type="text" />
                                        <ErrorMessage name="uid" component="div" className="invalid-feedback" />
                                    </div>
                                </div>

                                <div className="form-group row mt-5">
                                    <label htmlFor="vendor" className="col-form-label col-3">Vendor</label>
                                    <div className="col-9">
                                        <Field name="vendor" className="form-control" type="text" />
                                    </div>
                                </div>

                                <div className="form-group row mt-5">
                                    <label htmlFor="createdAt" className="col-form-label col-3">Date created</label>
                                    <div className="col-9">
                                        <Field name="createdAt" className="form-control" type="date" />
                                    </div>
                                </div>

                                <div className="form-group row mt-5">
                                    <label htmlFor="status" className="col-form-label col-3">Status</label>
                                    <div className="col-9">
                                        <Field name="status" as="select" className={'form-control' + (errors.status && touched.status ? ' is-invalid' : '')}>
                                            <option value="">Select</option>
                                            <option value="online">Online</option>
                                            <option value="offline">Offline</option>
                                        </Field>
                                        <ErrorMessage name="status" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-group mt-5">
                                    <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ marginRight: 5 }}>
                                        {isSubmitting && <span className="spinner-border spinner-border-sm"></span>}
                                        Save
                                    </button>
                                    <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default DeviceForm;