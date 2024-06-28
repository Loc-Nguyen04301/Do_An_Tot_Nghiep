import React, { useState } from 'react'
import { Button, Modal, Space, Table, TableProps, Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import { EditOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/redux-toolkit/hook';
import { ICategory } from '@/redux-toolkit/categorySlice';
import "../Inventory/Inventory.scss"
const CategoryAdmin = () => {
  const { categoryList } = useAppSelector((state) => state.category)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: TableProps<ICategory>['columns'] = [
    {
      title: "Id",
      key: "id",
      render: (_, record) => record.id
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
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Space direction="horizontal" className='w-full justify-center !block'>
        <Table
          columns={columns}
          dataSource={categoryList}
          pagination={{ position: ['bottomCenter'] }}
          rowKey={(record) => record.id}
        ></Table>
      </Space>
    </>
  )
}

export default CategoryAdmin