import React, { useState, useEffect } from 'react';
import { Form, withFormik, Field } from 'formik';
import { Container, Row, Col } from 'react-bootstrap';
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
      <div className="innerBox">
          <div className="titleBox">
            <h1> ENROLL FOR REWARDS.</h1>
            <h2> Get more when you spend more.</h2>
         </div>
            <Form>
                {touched.name && errors.name && (
                <p className="error">{errors.name}</p>
                )}
                <Field className="formComponent" type="text" name="name" placeholder="Name" />

                {touched.email && errors.email && (
                <p className="error">{errors.email}</p>
                )}
                <Field className="formComponent" type="email" name="email" placeholder="Email" />

                {touched.password && errors.password && (
                <p className="error">{errors.password}</p>
                )}
                <Field className="formComponent" type="password" name="password" placeholder="Password" />


                <label className="checkbox-container">
                    Terms of Service
                    <Field 
                    className="tos"
                    type="checkbox"
                    name="termsOfService"
                    checked={values.termsOfService}
                    />
                    <span className="checkmark" />
                </label>

                <button type="submit">Join Now</button>
            </Form>

         <Container>
            {users.map(user =>(
                <div key={user.id} className="userCard">
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            ))}
         </Container>
      </div>
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
        termsOfService: Yup.boolean().oneOf([false], "Please agree")
    }),
    handleSubmit( values, { setStatus } ){
        axios
            .post("https://reqres.in/api/users/", values)
            .then(response => {
                setStatus(response.data)      })
            .catch(err => console.log("Api Error: ", err.response));
    },
})(OnboardForm);



export default FormikOnboardForm;