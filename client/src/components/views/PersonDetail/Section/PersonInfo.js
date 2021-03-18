import React from 'react'
import { Descriptions, Badge } from "antd";

function PersonInfo(props) {
    const { person } = props
    
    return (
        <Descriptions title="Person Info">
            <Descriptions.Item label="이름">{person.name ? person.name : "없음"}</Descriptions.Item>
            <Descriptions.Item label="출생년도">{person.birthday ? person.birthday : "없음"}</Descriptions.Item>
            <Descriptions.Item label="출생지">{person.place_of_birth ? person.place_of_birth : "없음"}</Descriptions.Item>
            <Descriptions.Item label="약력" span={3}>{person.biography ? person.biography : "없음"}</Descriptions.Item>
        </Descriptions>
    )
}

export default PersonInfo
