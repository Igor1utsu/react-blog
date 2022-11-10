/* eslint-disable import/no-anonymous-default-export */

export default () => {
    return (
        <form className="form">
                <input 
                    className="input" 
                    type="email" 
                    placeholder="email"
                    required
                ></input>
                <input 
                    className="input" 
                    type="password" 
                    placeholder="password"
                    required
                ></input>
                <button className="btn" type="submit" value="Submit">Отправить</button>
        </form>
    )
}