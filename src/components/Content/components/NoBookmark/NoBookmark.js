/* eslint-disable import/no-anonymous-default-export */
import { StopOutlined } from "@ant-design/icons"
import DropDownPost from "../DropdownPost/DropDownPost"
import "./NoBookmark.scss"

export default ({ record }) => {
    return (
        <div className="post">
            <div className="no-bookmark">
                <DropDownPost bookmark={record}/>
                <div className="no-bookmark__wrapper">
                    <StopOutlined className="no-bookmark__icon"/>
                    <div className="no-bookmark__message">Запись удалена</div>
                </div>
            </div>
        </div>
    )
}