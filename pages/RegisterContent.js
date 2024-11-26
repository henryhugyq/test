import React, {useEffect, useState} from 'react';
import {
    Layout,
    Form,
    Select, DatePicker, Button, TextArea,
} from '@douyinfe/semi-ui';
import {
    IconHelpCircle,
    IconBytedanceLogo,
    IconHome,
    IconHistogram,
    IconLive,
    IconSetting,
    IconLock, IconUnlock, IconCalendar, IconUpload,
} from '@douyinfe/semi-icons';
import { ethers } from 'ethers';

import "@douyinfe/semi-ui/dist/css/semi.css";
import {IllustrationSuccess, IllustrationSuccessDark} from "@douyinfe/semi-illustrations";
import Head from "next/head";
import Section from "@douyinfe/semi-ui/lib/es/form/section";

const RegisterContent = () => {
    const { Header, Footer, Sider, Content } = Layout;
    return (
        <Form style={{ padding: '10px', width: 600 }}>
            <Section text={'基本信息'}>
                <Form.Input field="input" label="食品名称" trigger='blur' style={{ width: 200 }} rules={[{ required: true }]}/>
                <Form.InputNumber field='price' label='价格' style={{ width: 200 }} rules={[{ required: true }]}/>
            </Section>
            <Section text={'出仓信息'}>
                <Form.Select label="发货仓库" field='name' style={{ width: 200 }} rules={[{ required: true }]}>
                    <Form.Select.Option value="beijing">北京1号仓</Form.Select.Option>
                    <Form.Select.Option value="jiangsu">江苏1号仓</Form.Select.Option>
                    <Form.Select.Option value="shenzhen">深圳1号仓</Form.Select.Option>
                    <Form.Select.Option value="chongqing">重庆1号仓</Form.Select.Option>
                    <Form.Select.Option value="hongkong">香港1号仓</Form.Select.Option>
                </Form.Select>
                <Form.DatePicker field='date1' label='出仓日期' style={{ width: '250px' }} rules={[{ required: true }]}/>
                <Form.Input field="code" label="出仓编码" trigger='blur' style={{ width: 200 }} rules={[{ required: true }]}/>
            </Section>
            <Section text={'补充信息'}>
                <TextArea
                    title='haha'
                    style={{height: 120 }}
                    field='description'
                    label='7777'
                    placeholder='请填写申请资源理由'
                />
            </Section>
            <Button type="primary" htmlType="submit" className="btn-margin-right">提交(submit)</Button>
            <br/>
        </Form>
    );
};

export default RegisterContent;
