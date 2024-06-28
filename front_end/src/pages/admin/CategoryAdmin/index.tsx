import React, { useState } from 'react'
import { Button, Form, FormProps, Input, Modal, Space, Table, TableProps, Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import { EditOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/redux-toolkit/hook'
import { createCategory, ICategory } from '@/redux-toolkit/categorySlice'
import { useAlertDispatch } from '@/contexts/AlertContext'
import "./CategoryAdmin.scss"

export type CreateCategoryType = {
  name: string
  path: string
}

const CategoryAdmin = () => {
  const { categoryList } = useAppSelector((state) => state.category)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const dispatch = useAppDispatch()
  const dispatchAlert = useAlertDispatch()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const columns: TableProps<ICategory>['columns'] = [
    {
      title: "Id",
      key: "id",
      render: (_, record, index) => index
    },
    {
      title: "Tên danh mục",
      key: "name",
      render: (_, record) => record.name
    },
    {
      title: "Đường dẫn",
      key: "path",
      render: (_, record) => record.path
    },
  ]

  const onFinish: FormProps<CreateCategoryType>['onFinish'] = async (values) => {
    dispatchAlert({ loading: true })
    try {
      const resultAction = await dispatch(createCategory(values));
      console.log({ resultAction })
      if (createCategory.fulfilled.match(resultAction)) {
        dispatchAlert({ success: 'Category created successfully!' });
        setDisabled(true);
        setTimeout(() => {
          handleCancel();
          setDisabled(false);
        }, 2000);
      } else {
        dispatchAlert({ errors: resultAction.payload as string });
      }
    } catch (error: any) {
      dispatchAlert({ errors: error.message })
    }
  }

  const onFinishFailed: FormProps<CreateCategoryType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Helmet>
        <title>Danh mục sản phẩm</title>
        <meta name='description' content='Beginner friendly page for learning React Helmet.' />
      </Helmet>
      <Typography.Title level={4}>Danh mục sản phẩm</Typography.Title>
      <div className='mb-4 flex justify-end'>
        <Button type='primary' icon={<EditOutlined />} onClick={showModal}>
          Thêm mới danh mục
        </Button>
      </div>
      <Modal title="Tạo mới danh mục" open={isModalOpen} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 15 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className='mt-10'
        >
          <Form.Item<CreateCategoryType>
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }, { min: 3, message: "Độ dài tối thiểu 3 kí tự" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<CreateCategoryType>
            label="Đường dẫn URL"
            name="path"
            rules={[{ required: true, message: 'Vui lòng nhập đường dẫn danh mục!' }, { min: 3, message: "Độ dài tối thiểu 3 kí tự" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 24 }}>
            <Button type="primary" htmlType="submit" disabled={disabled}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Space direction="horizontal" className='w-full justify-center !block'>
        <Table
          columns={columns}
          dataSource={categoryList}
          pagination={false}
          rowKey={(record) => record.id}
        ></Table>
      </Space>
    </>
  )
}

export default CategoryAdmin