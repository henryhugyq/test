import React, { useEffect, useState } from "react";
import { Nav, Avatar, Descriptions, Table, Button, Toast } from '@douyinfe/semi-ui';
import { IconFeishuLogo, IconHelpCircle, IconBell, IconUserCircle, IconMore } from '@douyinfe/semi-icons';
import styles from '../index.module.scss';
import HomeContent from "./HomeContent"; // 主页组件
import RegisterContent from "./RegisterContent"; // 食品登记组件
import LogisticsContent from "./LogisticsContent"; // 物流溯源组件
import SettingsContent from "./SettingContent"; // 设置组件


const Component = () => {
    const [tx, setTx] = useState();
    const [foodCount, setFoodCount] = useState();
    const [logNumber, setLogNumber] = useState();
    const [selectedKey, setSelectedKey] = useState('Home'); // 用于跟踪当前选中的导航项

    const handleMenuClick = (itemKey) => {
        setSelectedKey(itemKey); // 切换选中项
    };

    const getClientNumber = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/txnumber', {
                method: 'POST',
            });
            const data = await response.json();
            const value = parseInt(data.txnumber, 16);
            setTx(value);
        } catch (error) {
            Toast.error(error.message);
        }
    };

    const getFoodNumber = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/GetFoodCount', {
                method: 'POST',
            });
            const data = await response.json();
            setFoodCount(data.count);
        } catch (error) {
            Toast.error(error.message);
        }
    };

    const getLogNumber = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/GetLogNumber', {
                method: 'POST',
            });
            const data = await response.json();
            setLogNumber(data.logNumber);
        } catch (error) {
            Toast.error(error.message);
        }
    };

    useEffect(() => {
        getClientNumber();
        getFoodNumber();
        getLogNumber();
    }, []);

    // 根据选中的导航项条件渲染内容
    const renderContent = () => {
        switch (selectedKey) {
            case 'Home':
                return <HomeContent />;
            case 'Register':
                return <RegisterContent />;
            case 'Logistics':
                return <LogisticsContent />;
            case 'Settings':
                return <SettingsContent />;
            default:
                return <HomeContent />;
        }
    };

    return (
        <div className={styles.frame}>
            <Nav
                mode="horizontal"
                header={{
                    logo: <img src="../static/logo_transparent.png" style={{ height: "70px", width: "70px" }} alt="Logo" />,
                    text: "Food Trace",
                }}
                footer={
                    <div className={styles.dIv}>
                        <IconFeishuLogo size="large" className={styles.semiIconsFeishuLogo} />
                        <IconHelpCircle size="large" className={styles.semiIconsFeishuLogo} />
                        <IconBell size="large" className={styles.semiIconsFeishuLogo} />
                        <Avatar
                            size="small"
                            src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg"
                            color="blue"
                            className={styles.avatar}
                        >
                            示例
                        </Avatar>
                    </div>
                }
                className={styles.nav}
            >
                <Nav.Item itemKey="Home" text="信息看板" onClick={() => handleMenuClick('Home')} />
                <Nav.Item itemKey="Register" text="食品登记" onClick={() => handleMenuClick('Register')} />
                <Nav.Item itemKey="Logistics" text="物流溯源" onClick={() => handleMenuClick('Logistics')} />
                <Nav.Item itemKey="Settings" text="资料设置" onClick={() => handleMenuClick('Settings')} />
            </Nav>

            <div className={styles.content}>
                <div className={styles.frame18637}>
                    <div className={styles.frame1321314182}>
                        <div className={styles.workitemIcon}>
                            <IconUserCircle className={styles.semiIconsUserCircle} />
                        </div>
                        <Descriptions
                            data={[{ key: "注册食品数", value: foodCount }]}
                            row={true}
                            className={styles.descriptions}
                        />
                    </div>

                    <div className={styles.frame1321314182}>
                        <div className={styles.buttonOnlyIconSecond}>
                            <IconUserCircle className={styles.semiIconsUserCircle} />
                        </div>
                        <Descriptions
                            data={[{ key: "当前交易数", value: tx }]}
                            row={true}
                            className={styles.descriptions}
                        />
                    </div>

                    <div className={styles.frame1321314182}>
                        <div className={styles.buttonOnlyIconSecond2}>
                            <IconUserCircle className={styles.semiIconsUserCircle} />
                        </div>
                        <Descriptions
                            data={[{ key: "溯源登记数", value: logNumber }]}
                            row={true}
                            className={styles.descriptions}
                        />
                    </div>
                </div>

                <div >
                    {renderContent()} {/* 根据选中的项渲染相应的组件内容 */}
                </div>
            </div>
        </div>
    );
}

export default Component;
