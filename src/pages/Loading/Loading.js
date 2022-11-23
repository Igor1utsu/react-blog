/* eslint-disable import/no-anonymous-default-export */
import { Loading3QuartersOutlined } from "@ant-design/icons"
import "./Loading.scss"

export default () => {
    return (
        <div className="loading">
            <Loading3QuartersOutlined className="loading__icon" spin/>
        </div>
    )
}