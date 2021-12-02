import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Alert } from 'react-bootstrap';
import * as Yup from 'yup';
import { api, handleError } from "../../utils";
import FormDevices from './form-devices';

const DeviceForm = ({ id }) => {
    const isAddMode = !id;
    const navigate = useNavigate();
    const formikRef = useRef();
    const [sErrors, setSerrors] = useState(null);

    const validationSchema = Yup.object({
        serialNumber: Yup.number().integer('Must be a number')
            .required('Serial number is required'),
        ipv4: Yup.string().test('ipv4', 'IPV4 is invalid', (value, context) => /^(((1?[1-9]?|10|2[0-4])\d|25[0-5])($|\.(?!$))){4}$/.test(value)).required('IPv4 is required'),
        otherDevices: Yup.array().of(
            Yup.object().shape({
                uid: Yup.number().integer('Must be a number')
                    .required('UID is required'),
                status: Yup.string().required('Status is required'),
                createdAt: Yup.date().default(function () {
                    return new Date();
                })
            })
        )
    })

    useEffect(() => {
        if (!isAddMode) {
            api.get('gateways/' + id).then(gateway => {
                const fields = ['serialNumber', 'name', 'ipv4', 'devices'];
                fields.forEach(field => formikRef.current?.setFieldValue(field, gateway[field]));
            });
        } else {
            api.get('devices').then(devs => formikRef.current?.setFieldValue('devices', devs));
        }
        return () => {

        }
    }, [id, isAddMode]);

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (isAddMode) {
            createGateway(fields, setSubmitting);
        } else {
            updateGateway(id, fields, setSubmitting);
        }
    }

    function createGateway(fields, setSubmitting) {
        const { serialNumber, name, ipv4, tempDevices, otherDevices } = fields;        
        const devs = tempDevices ? tempDevices.concat(otherDevices) : [].concat(otherDevices)
        api.post('gateways', { serialNumber, name, ipv4, devices: devs })
            .then((data) => {
                setSubmitting(false);
                navigate('/gateways?r=1')
            })
            .catch((error) => {
                setSubmitting(false);
                setSerrors(handleError(error));
            });
    }

    function updateGateway(id, fields, setSubmitting) {
        const { serialNumber, name, ipv4, tempDevices, otherDevices } = fields;       
        const devs = tempDevices ? tempDevices.concat(otherDevices) : [].concat(otherDevices)
        api.put('gateways/' + id, { serialNumber, name, ipv4, devices: devs })
            .then((data) => {
                setSubmitting(false);
                navigate('/gateways?r=1')
            })
            .catch(error => {
                setSubmitting(false);
                setSerrors(handleError(error));
            });
    }

    return (
        <Formik initialValues={{ serialNumber: '', ipv4: '', name: '', devices: [], otherDevices: [] }} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formikRef}>
            {({ values, errors, touched, isSubmitting, setFieldValue }) => {
                const limit = values.devices?.length ? values.devices?.length : 10;
                return (
                    <Form noValidate className="form form-label-right">
                        <h1>{isAddMode ? 'Add Device' : 'Edit Device'}</h1>
                        <div className="row justify-content-center">
                            {sErrors && <Alert variant='warning'>{sErrors}</Alert>}
                            <div className="col-9">
                                <div className="form-group row">
                                    <label htmlFor="serialNumber" className="col-form-label col-3">Serial number</label>
                                    <div className="col-9">
                                        <Field name="serialNumber" className={'form-control' + (errors.serialNumber && touched.serialNumber ? ' is-invalid' : '')} type="text" />
                                        <ErrorMessage name="serialNumber" component="div" className="invalid-feedback" />
                                    </div>
                                </div>

                                <div className="form-group row mt-5">
                                    <label htmlFor="name" className="col-form-label col-3">Name</label>
                                    <div className="col-9">
                                        <Field name="name" className="form-control" type="text" />
                                    </div>
                                </div>

                                <div className="form-group row mt-5">
                                    <label htmlFor="ipv4" className="col-form-label col-3">IPv4</label>
                                    <div className="col-9">
                                        <Field name="ipv4" className={'form-control' + (errors.ipv4 && touched.ipv4 ? ' is-invalid' : '')} type="text" />
                                        <ErrorMessage name="ipv4" component="div" className="invalid-feedback" />
                                    </div>
                                </div>

                                <div className="form-group row mt-5">
                                    <label htmlFor="devices" className="col-form-label col-3">Devices</label>
                                    <div className="col-9">
                                        <input type="hidden" name="tempDevices" />
                                        <select name="devices" className="form-control" multiple={true} onChange={evt =>
                                            setFieldValue(
                                                "tempDevices",
                                                [].slice
                                                    .call(evt.target.selectedOptions)
                                                    .map(option => option.value)
                                            )
                                        }>
                                            {values.devices?.map((device, i) =>
                                                <option value={device._id} key={i} selected={!isAddMode}>{device.uid}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <FormDevices devices={values.otherDevices} errors={errors} touched={touched} limit={limit} />

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