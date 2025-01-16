import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";

const ContactForm = () => {
    
    const FeedbackSchema = Yup.object().shape({
        name: Yup.string().min(1, "Too Short!").max(50, "Too Long!").required("Required"),
        number: Yup.string().matches(/^\d{3}-\d{3}-\d{4}$/, "number number must be in the format 123-45-67").required("Required"),
    });
    
    const dispatch = useDispatch();

    const handleSubmit = (formData, { resetForm }) => {
        dispatch(addContact({
            name: formData.name,  
            number: formData.number 
        }));
        resetForm();  
    };
    
    
    return (
        <Formik
        initialValues={{ name: "", number: "" }}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
        >
            <Form>
                <div>
                    <label htmlFor="name">Name</label>
                    <Field type="text" name="name" id="name" />
                    <ErrorMessage name="name" component="span" />
                </div>
                <div>
                    <label htmlFor="number">Number</label>
                    <Field type="phone" name="number" id="number" />
                    <ErrorMessage name="number" component="span" />
                </div>
                <button type="submit">Add contact</button>
            </Form>
        </Formik>
  );
};
   
export default ContactForm;