import React from 'react';
import { Form, withFormik, Field } from 'formik';
import axios from 'axios';
import * as Yup from "yup";

function OnboardForm({errors, touched, values}){

    return(
     <div clasName="onboardForm">
        <Form>
            <Field type="text" name="name" placeholder="Name" />
            {touched.name && errors.name && (
          <p className="error">{errors.name}</p>
        )}
            <Field type="email" name="email" placeholder="Email" />
            {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
            <Field type="password" name="password" placeholder="password" />
            {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}

            <label className="Checkbox-container">
                Terms of Service
                <Field 
                type="checkbox"
                name="termsOfService"
                checked={values.termsOfService}
                />
                <span className="checkmark" />
            </label>

            <button>Submit</button>
        </Form>
    </div>
    );
};

const FormikOnboardForm = withFormik({
    mapPropsToValues({ name, email, password, termsOfService }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            termsOfService: termsOfService || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please enter your name"),
        email: Yup.string().required("Please enter your email"),
        password: Yup.string().required("Please enter your password"),
    }),
    handleSubmit( values, { setStatus} ){
        axios.post("https://reqres.in/api/users")
    }
})(OnboardForm);



export default FormikOnboardForm;