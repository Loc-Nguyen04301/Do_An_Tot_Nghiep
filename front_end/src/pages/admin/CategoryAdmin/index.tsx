import React from 'react'
import { Button, Space, Table, Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import { EditOutlined } from '@ant-design/icons';

const CategoryAdmin = () => {
  const handleCreateCategory = () => {

  }

  return (
    <>
      <Helmet>
        <title>Danh mục sản phẩm</title>
        <meta name='description' content='Beginner friendly page for learning React Helmet.' />
      </Helmet>
      <Typography.Title level={4}>Danh mục sản phẩm</Typography.Title>
      <div className='mb-4 flex justify-end'>
        <Button type='primary' icon={<EditOutlined />} onClick={handleCreateCategory}>
          Thêm mới sản phẩm
        </Button>
      </div>
      <Space direction="horizontal" className='w-full justify-center !block'>
        <Table
          columns={columns}
          dataSource={products}
          pagination={{ position: ['bottomCenter'] }}
          rowKey={(record) => record.id}
        ></Table>
      </Space>
    </>
  )
}

export default CategoryAdmin