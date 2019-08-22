import React from 'react';
import { Form, withFormik, Field } from 'formik';

function OnboardForm(){

    return(
        <Form>
            <Field type="text" name="name" placeholder="Name" />
            <Field type="email" name="email" placeholder="Email" />
            <Field type="password" name="password" placeholder="password" />

            <button>Submit</button>
        </Form>
    );
};



export default OnboardForm;