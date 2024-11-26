import React, {useEffect, useState} from "react";
import {Nav, Avatar, Descriptions, Table, Button, Toast} from '@douyinfe/semi-ui';
import { IconSemiLogo, IconFeishuLogo, IconHelpCircle, IconBell, IconUserCircle, IconMore, IconSort } from '@douyinfe/semi-icons';
import styles from '../index.module.scss';

const Component = () => {
    //交易数，上链食品数，登记物流数
    const[tx,setTx]=useState();
    const[foodCount,setFoodCount]=useState();
    const[logNumber,setLogNumer]=useState();

    const [selectedKey, setSelectedKey] = useState('Home');
    const handleMenuClick = (itemKey) => {
        setSelectedKey(itemKey);
    };
    const getClientNumber = async () => {
        try{
            const response = await fetch('http://127.0.0.1:8080/txnumber',{
                method:'POST',
            });
            const data = await response.json()
            const value = parseInt(data.txnumber,16)
            setTx(value)

            console.log("tx",tx)

        }catch(error){
            Toast.error(error.message)
        }
    }
    const getFoodNumber = async () => {
        try{
            const response = await fetch('http://127.0.0.1:8080/GetFoodCount',{
                method:'POST',
            });
            const data = await response.json()
            const count = data.count
            setFoodCount(count)

        }catch(error){
            Toast.error(error.message)
        }
    }
    const getLogNumber = async () => {
        try{
            const response = await fetch('http://127.0.0.1:8080/GetLogNumber',{
                method:'POST',
            });
            const data = await response.json()
            const count = data.logNumber
            setLogNumer(count)

        }catch(error){
            Toast.error(error.message)
        }
    }
    useEffect(() => {
        getClientNumber()
        getFoodNumber()
        getLogNumber()
    }, []);
    return (
        <div className={styles.frame}>
            <div className={styles.customers}>
                <p className={styles.item}>基于FISCO BCOS的食品溯源平台</p>
                <Table
                    columns={[
                        {
                            title: "食品名称",
                            render: (text, record) => {
                                return (
                                    <div className={styles.tD}>
                                        <img
                                            src="https://lf9-static.semi.design/obj/semi-tos/template/95c73b19-d0b2-41fb-a5a2-36ed9a9136a3.png"
                                            className={styles.rectangle3}
                                        />
                                        <p className={styles.text}>Abstergo Ltd.</p>
                                    </div>
                                );
                            },
                            dataIndex: "title",
                        },
                        {
                            title: "创建日期",
                            width: 180,
                            render: (text, record) => {
                                return <p className={styles.text2}>12/06/2020</p>;
                            },
                            sorter: (a, b) => (a?.size - b?.size > 0 ? 1 : -1),
                            dataIndex: "createDate",
                        },
                        {
                            title: "创建人",
                            width: 176,
                            render: (text, record) => {
                                return (
                                    <div className={styles.tD2}>
                                        <Avatar
                                            size="small"
                                            src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg"
                                            color="blue"
                                            className={styles.avatar}
                                        >
                                            示例
                                        </Avatar>
                                        <p className={styles.text3}>Theresa Webb</p>
                                    </div>
                                );
                            },
                            dataIndex: "creator",
                        },
                        {
                            title: "登记哈希",
                            width: 161,
                            render: (text, record) => {
                                return <p className={styles.text4}>San Juan</p>;
                            },
                            dataIndex: "description",
                        },
                        {
                            title: "操作",
                            width: 149,
                            render: (text, record) => {
                                return (
                                    <Button
                                        theme="borderless"
                                        icon={<IconMore />}
                                        className={styles.button}
                                    />
                                );
                            },
                            dataIndex: "operate",
                        },
                    ]}
                    dataSource={[
                        { key: "0" },
                        { key: "1" },
                        { key: "2" },
                        { key: "3" },
                        { key: "4" },
                        { key: "5" },
                        { key: "6" },
                        { key: "7" },
                        { key: "8" },
                        { key: "9" },
                    ]}
                    pagination={{ showSizeChanger: true, pageSize: 10, showTotal: true }}
                    className={styles.table}
                />
            </div>
        </div>
    );
}

export default Component;
