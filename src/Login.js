import React, { useState } from 'react'
import { Button, Card, Input } from 'antd';
import Axios from "axios"
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Typography, Space } from 'antd';
import { List } from 'rc-field-form';
function Login() {
    const [state, setstate] = useState({password:"",username:""})
        const [authData, setauthData] = useState({})

        const { Text, Link } = Typography;

    const onChange=(e)=>{
        console.log()
        setstate({...state,[e.target.name]:e.target.value})

    }
    const handleSubmit=()=>{
        console.log(state, "state")
        Axios.post("https://xfoil-technical-interview.herokuapp.com/login",{
            username:state.username,
            password:parseInt(state.password)
        }).then(res=>{
            if(res.status===200){
                setauthData(res)
            }
            console.log(res,"ReSPONSE")
        }).catch(e=>{
            console.log(e,"ERROR")
        })

    }

    const {data}=authData
    // const {firstNameAdmin,lastNameadmin,comapnyId,locationObjects}=data
    return (
        <>
        <Card title="Default size card"  style={{ width: 300 }}>
            <div>
       <Input placeholder="Basic usage" name="username" onChange={onChange} />

            </div>
       <div>
       <Input placeholder="Basic usage" name='password' onChange={onChange} />

            </div>

            <Button onClick={handleSubmit}>
                submit
            </Button>
      </Card>

      {data?<div>
      <Text type="success">{`Scucessfully Loggedin Mr ${data.firstNameAdmin}  ${data.lastNameadmin}`} </Text>
      <Text type="secondary">{`${data.comapnyId}`} </Text>
      {
        data.locationObjects&&  <List
          size="small"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={data.locationObjects}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      }
      


      </div>:""}

</>
    )
}

export default Login
