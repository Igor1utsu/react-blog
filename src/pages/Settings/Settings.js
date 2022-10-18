/* eslint-disable import/no-anonymous-default-export */
import "./Settings.css"

export default () => {

    return (
                <>
                    <h2 className="title">Settings</h2>
                    <form className="settings-form">
                        <div className="settings-form-group">
                            <label>Color 1: </label>
                            <input className="settings-input-color" type="color"></input>
                        </div>
                        <div className="settings-form-group">
                            <label>Color 2: </label>
                            <input className="settings-input-color" type="color"></input>
                        </div>
                    </form>
                </>
    )
}