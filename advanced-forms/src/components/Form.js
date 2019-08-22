import React, { useState, useEffect } from 'react';
import { Form, withFormik, Field } from 'formik';
import axios from 'axios';
import * as Yup from "yup";

const OnboardForm = ({errors, touched, values, status}) => {
    const [users, setUsers] = useState([]);

    console.log("this is touched", touched);
    useEffect(() => {
        if (status) {
            setUsers([...users,status])
        }
    },[status]);


    return(
     <div className="onboardForm">
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

                <label className="checkbox-container">
                    Terms of Service
                    <Field 
                    type="checkbox"
                    name="termsOfService"
                    checked={values.termsOfService}
                    />
                    <span className="checkmark" />
                </label>

                <button type="submit">Submit</button>
            </Form>

            {users.map(user =>(
                <div key={user.id}>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Password: {user.password}</p>
                </div>
            ))}
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
    handleSubmit( values, { setStatus } ){
        axios
            .post("https://reqres.in/api/users/", values)
            .then(response => {
                setStatus(response.data)      })
            .catch(err => console.log("Api Error: ", err.response));
    }
})(OnboardForm);



export default FormikOnboardForm;