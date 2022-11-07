/* eslint-disable import/no-anonymous-default-export */
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm"
import "./Registration.scss"


export default () => {
    return (
        <div className="container">
            <section className="registration">
                <RegistrationForm/>
            </section>
        </div>
    )
}